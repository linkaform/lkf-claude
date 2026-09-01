# airflow_script_params — Parámetros configurables de un script programado

> Cómo mandar parámetros desde la forma Programar Tareas hasta un script que corre por Airflow, y por qué se pierden en el camino

Un script programado (`LKFRunScript`) normalmente solo recibe su `script_id`. Para que el
usuario configure su comportamiento sin tocar código (ej. "cierra los rondines después de
X horas"), el parámetro tiene que atravesar **seis capas**. Cada una puede descartarlo.

## La cadena completa

```
Forma "Programar Tareas" (grupo Parametros del Script)
    ↓  self.answers
Schedule.get_script_map()            ← lkf_addons/addons/base/app.py
    ↓  task["params"].update(...)
POST /cron                           ← subscribe_cron()
    ↓
airflow_bob: CronModel → DagTasks → DagTaskParams   ← ⚠️ AQUÍ SE PIERDEN
    ↓  se persiste en Mongo y de ahí se genera el archivo
dag_builder() → pythonGenerator.DagTask
    ↓  params = {'script_id': 163256, 'horas': 2}
LKFRunScript.execute() → eval_answers(context['params']) → lkf_api.run_script(data)
    ↓  llega en sys.argv[2]
script: self.data.get('data', {})
```

## 1. Capturar el parámetro en la forma

En `programar_tareas.xml` conviene un **grupo repetible genérico** (Parámetro / Valor) en
vez de un campo fijo por cada script: así un script nuevo no obliga a tocar la forma.

```
abcde0001000000000030001  group  Parametros del Script
abcde0001000000000030002  text   Parametro   → 'horas'
abcde0001000000000030003  text   Valor       → '2'
```

Para agregar campos al XML, **clona un nodo `<item>` existente** con ElementTree
(`copy.deepcopy`) y cambia `field_id`/`label`/`help_text`/`group`. El bloque
`<properties>` trae ~40 llaves; escribirlo a mano es donde se rompe.
Verifica con `diff` que el resultado sean **solo altas, 0 bajas**.

## 2. Convertir el valor y mandarlo a la tarea

`get_script_map()` ya existía como `return {}` con un `#TODO` — es el hook correcto, ya se
llama dentro de `elif task_type == 'LKFRunScript'`.

```python
def get_script_map(self):
    params = {}
    for row in self.answers.get(self.SCRIPT_PARAMS_GROUP, []) or []:
        name = self.unlist(row.get(self.SCRIPT_PARAM_NAME))
        if not name:
            continue
        params[str(name).strip()] = self.parse_script_param(
            self.unlist(row.get(self.SCRIPT_PARAM_VALUE)))
    return params
```

Los campos de la forma son **texto**, el DAG necesita tipos reales. `parse_script_param()`
convierte con `simplejson.loads()` y cae a string si falla:

```
'24'                      → 24
'2.5'                     → 2.5
'si' / 'true'             → True
'{"Rondin Nocturno": 2}'  → {'Rondin Nocturno': 2}
'programado'              → 'programado'
```

Esto permite mandar configuración por llave sin campos nuevos, ej.
`horas_por_recorrido = {"Rondin Nocturno": 2, "Planta Norte::Rondin Perimetral": 5}`.

## 3. ⚠️ El whitelist de pydantic en airflow_bob

**Este es el punto que cuesta horas encontrar.** `airflow_bob/app/base_models.py`:

```python
class DagTaskParams(BaseModel):
    script_id:Optional[int]
    form_id:Optional[int]
    assigne_user_id:Optional[int]
    assigne_group_id:Optional[int]
    answers:Optional[dict]

    class Config:
        extra = 'allow'   # ← sin esto, cualquier llave nueva se descarta EN SILENCIO
```

`post_cron()` no escribe el DAG con el body recibido: primero lo valida con
`CronModel(...)` (`tasks: List[DagTasks]` → `params: Optional[DagTaskParams]`), lo persiste,
y **genera el archivo a partir del modelo ya validado**. Pydantic ignora las llaves
desconocidas por default: sin error, sin warning, sin nada en el log.

**Síntoma exacto:** el log del script muestra los params correctos
(`======log: parametros del script: {'horas': 2}`) pero el `.py` del DAG sale con
`params = {'script_id': 163256}`. Es lo mismo que hace que `description` y `summary` nunca
aparezcan en los DAGs generados: `DagTasks` tampoco los declara.

Usa `class Config: extra = 'allow'` (no `ConfigDict`): funciona igual en pydantic v1 y v2 y
no siempre sabes qué versión trae el contenedor desplegado.

## 4. Identificar QUÉ generador de DAGs está desplegado

Hay **cuatro copias** del generador en el repo (`lkf-ms`, `servido`, `servido_test`,
`airflow_bob`) y no son iguales. El `.py` generado trae la huella de cuál corrió:

| Señal en el DAG generado | Generador |
|---|---|
| `params = {...},` con coma final | airflow_bob |
| `LKFLogin` **sin** línea `params = params` | airflow_bob (deja `name`/`operator`/`operator_lib` en el dict y los skipea) |
| `dag_id` con sufijo ObjectId (`..._6a8ca052e13fe1ef00493150`) | airflow_bob |
| `params = params` en tareas sin params | lkf-ms / servido / servido_test |

Lee el DAG generado antes de suponer qué código se está ejecutando.

## 5. Leer los params dentro del script

Llegan en `sys.argv[2]`, normalmente bajo la llave `data` (mismo patrón que
`set_folio_oc_to_os.py` con `desde`/`hasta`):

```python
def get_script_params(self):
    data = getattr(self, 'data', {}) or {}
    params = data.get('data') or {}
    if not isinstance(params, dict):
        params = {}
    #por si el payload llega plano, sin la llave 'data'
    for key in ('horas', 'minutos_sin_check', 'horas_por_recorrido'):
        if key in data and key not in params:
            params[key] = data[key]
    return params
```

Firma el método del script con defaults, nunca requeridos: si el grupo va vacío el DAG sale
idéntico a como estaba y el script sigue corriendo con su comportamiento anterior.

## Notas

- **El DAG no se regenera solo.** El `CronModel` guardado en Mongo es la fuente del archivo;
  hay que volver a guardar el registro de Programar Tareas con acción `programar`.
- **Cambiar `base_models.py` exige redesplegar airflow_bob**, no la imagen de addons.
- `eval_answers()` (en `lkf_operator.py`) respeta diccionarios anidados: solo toca strings
  con `{% ... %}`. Las llaves con `::` u otros separadores pasan intactas.
- **Cuando un dato se pierde entre servicios y no hay error: busca un esquema que lo filtre**
  (pydantic, serializers, whitelists) antes de pedir logs. Un modelo que descarta llaves
  desconocidas no deja rastro en ningún log.
- El generador ya existente se puede correr en local para verificar la salida sin desplegar:
  carga `pythonGenerator.py` con `importlib.util.spec_from_file_location` (evita el
  `import flask` del paquete) y arma un `DagTask` a mano.
- `extra = 'allow'` tiene su costo: ya no hay validación de nombres. Un `oras` mal escrito
  viaja hasta el script y ahí se ignora. Es el precio de que el grupo de la forma sea
  genérico; la alternativa es declarar cada parámetro y redesplegar el servicio de crons
  cada vez.

Ver también: `airflow_linkaform_integration` para la arquitectura general del flujo.
