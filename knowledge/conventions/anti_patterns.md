# Anti-patterns

> Lo que NO se debe hacer en el LinkaForm SDK

## 1. Hardcodear ObjectIds

```python
# MAL
answers = {'60a1b2c3d4e5f6a7b8c9d0e1': 'valor'}

# BIEN
answers = {self.f['nombre_campo']: 'valor'}
```

**Por qué**: Los IDs cambian entre ambientes (dev/prod) y entre cuentas. El código falla silenciosamente.

## 2. Importar LKF_Base directamente

```python
# MAL
from linkaform_api.base import LKF_Base
class MiModulo(LKF_Base): ...

# BIEN
from lkf_addons.addons.base.app import Base
class MiModulo(Base): ...
```

**Por qué**: `Base` agrega catálogos, métodos y contexto que `LKF_Base` no tiene.

## 3. Omitir el filtro de soft-delete

```python
# MAL — incluye registros borrados
self.cr.find({'form_id': self.MI_FORM})

# BIEN
self.cr.find({'form_id': self.MI_FORM, 'deleted_at': {'$exists': False}})
```

**Por qué**: LinkaForm usa soft-delete. Los registros "borrados" siguen en la colección.

## 4. Retornar dicts de error

```python
# MAL
def validar(self):
    if error:
        return {'error': 'Algo salió mal', 'status': 400}

# BIEN
def validar(self):
    if error:
        self.LKFException({'msg': 'Algo salió mal', 'status_code': 400})
```

**Por qué**: `LKFException` detiene el flujo correctamente y es capturado por el framework.

## 5. Modificar self.f antes de super().__init__()

```python
# MAL
class MiModulo(Base):
    def __init__(self, settings, **kwargs):
        self.f.update({'campo': '...'})   # self.f no existe todavía
        super().__init__(settings, **kwargs)

# BIEN
class MiModulo(Base):
    def __init__(self, settings, **kwargs):
        super().__init__(settings, **kwargs)
        self.f.update({'campo': '...'})   # ahora self.f ya existe
```

## 6. Omitir los 3 atributos de catálogo

```python
# MAL — solo el dict
self.MI_CAT = self.lkm.catalog_id('nombre')

# BIEN — los 3 siempre
self.MI_CAT        = self.lkm.catalog_id('nombre')
self.MI_CAT_ID     = self.MI_CAT.get('id')
self.MI_CAT_OBJ_ID = self.MI_CAT.get('obj_id')
```

**Por qué**: Diferentes operaciones necesitan el ID numérico vs el ObjectId.

## 7. Pisar un atributo compartido con un nombre genérico

```python
# MAL — self.PAQUETERIA ya es el form_id de "paqueteria" en el módulo,
# usado en varios métodos. Un __init__ posterior lo sobreescribe con un script_id:
self.PAQUETERIA = self.lkm.script_id('paqueteria', 'id')

# BIEN — nombre que no colisiona
self.SCRIPT_PAQUETERIA = self.lkm.script_id('paqueteria', 'id')
```

**Por qué**: en el repo legacy esto "funcionaba" porque cada script (`menus.py`, etc.) era
una instancia de un solo uso — pisar `self.PAQUETERIA` ahí no afectaba a nadie más. En
`lkf-sanic-apps` el objeto `service` del módulo es un **singleton** compartido por todas
las rutas durante toda la vida del proceso: pisar un atributo en `__init__` rompe
silenciosamente cualquier otro método que ya dependía de ese nombre. Antes de copiar una
asignación de un script legacy al `models.py`/`service.py` compartido, grep el nombre
completo en el archivo destino para confirmar que no está en uso con otro significado.

## 8. Pedir `create=True` en una colección que puede ya existir

```python
# MAL — truena con NamespaceExists si la colección ya existe
self.cr_cache = self.net.get_collections(collection='mi_cache', create=True)

# BIEN (ya corregido en linkaform_api/network.py:get_collections) — solo
# manda create=True si la colección todavía no existe
if create and collection in database['db'].list_collection_names():
    create = False
```

**Por qué**: `create=True` hace que pymongo mande el comando admin `create` explícito
(no es "crear si no existe" — MongoDB lo rechaza con `NamespaceExists` si la colección
ya está). Este bug tronaba el arranque completo de `lkf-sanic-apps` en cualquier
ambiente donde la colección ya se hubiera creado una vez.

## 9. Leer `self.user.get('id')` en vez de `self.user.get('user_id')`

```python
# MAL — 'id' solo existe si el decorador @reload_user ya corrió antes
user_id = self.user.get('id')

# BIEN — 'user_id' es la llave real que pone linkaform_api al decodificar el JWT
user_id = self.user.get('user_id')
```

**Por qué**: `self.user` se llena inicialmente vía `decode_jwt()` (en
`linkaform_api`), que solo pone `username`, `parent_id`, `user_id`, `exp`,
`timezone` — **nunca** una llave `'id'`. Esa llave `'id'` solo aparece si el
método pasó por el decorador `@reload_user` (`addons/base/tools.py`), que
hace `user_data['id'] = user_data.get('user_id')` explícitamente. Como
`@reload_user` solo está aplicado a un puñado de métodos, cualquier otro
método que use `self.user.get('id')` directamente obtiene `None` — sin
excepción, sin log — y cualquier `match_query` que dependa de ese `user_id`
termina filtrando por `None` (matchea registros con el campo vacío/inexistente
en vez del usuario real).

**Cómo se manifiesta**: resultados completamente distintos a los esperados
(no solo campos faltantes) — porque la query SÍ regresa datos, solo que de
la persona equivocada (o de cualquier registro con el campo sin configurar).

**Grep de verificación** antes de portar un método que usa `self.user`:
```bash
grep -n "self\.user\.get(" addons/*/*.py
```
Si ves `.get('id')` fuera de un método decorado con `@reload_user`, es
sospechoso — casi siempre debería ser `.get('user_id')`.

## 10. Asumir que el `value` de una opción radio/checkbox es un slug limpio

```python
# MAL — asume que la opción "Carga/Descarga" tiene value 'carga_descarga'
if etapa == 'carga_descarga':
    ...

# BIEN — verificar el value real contra get_form_fields/el XML exportado
# antes de codificarlo (a veces es literal 'carga_/_descarga', tal cual se
# tecleó la etiqueta en la UI de Linkaform)
if etapa == 'carga_/_descarga':
    ...
```

**Por qué**: el `value` real de una opción de `radio`/`checkbox` en Linkaform
es **literal lo que se tecleó como etiqueta** al construir el campo en la
UI — no se autogenera como un slug normalizado. Esto pasó dos veces en el
mismo módulo (transportistas):

- Un checkbox de etapas con opciones "Inspección de Entrada" / "Carga /
  Descarga" / "Inspección Salida" generó los values
  `inspeccion_de_entrada` / `carga_/_descarga` / `inspeccion_salida` — no
  los slugs limpios (`inspeccion_entrada`, `carga_descarga`) que se habían
  asumido al diseñar el código antes de que la forma existiera.
- Un radio "Sí/No" **no garantiza** que el value de la opción "Sí" sea el
  string `"sí"` (con acento) — depende de cómo se escribió la etiqueta al
  construir ESE campo específico. Una forma con la etiqueta "Si" (sin
  acento) genera `value: "si"`. Un valor default que por casualidad
  coincidía (`"sí"` con acento) ocultó el bug hasta que se probó contra una
  forma distinta.

**Cómo evitarlo**: nunca hardcodear el `value` esperado de una opción antes
de que el campo exista en Linkaform. Una vez que existe, verifica el value
real con `get_form_fields` o el XML exportado (no lo adivines por la
etiqueta visible), y si el código necesita ser resiliente a cómo se
capturó la etiqueta (ej. "Sí" con/sin acento, mayúsculas), resuelve por
comparación normalizada (`options` real del campo → mapa `{valor
normalizado: value real}`), no por un literal fijo en el código. Si en el
futuro se agregan opciones nuevas al mismo campo, vuelve a verificar sus
values — no asumas que seguirán el mismo patrón que las anteriores.

## 11. Confiar en `unlist()` para degradar una lista vacía

```python
# MAL — asume que unlist() siempre desempaca a un escalar (o "" si está vacío)
telefono = self.unlist(answers.get(campo, []))
respuesta[self.f['telefono']] = [telefono]   # si unlist([]) regresó [], esto queda [[]]

# BIEN — degradar explícito con `or ""` después de unlist()
telefono = self.unlist(answers.get(campo, [])) or ""
respuesta[self.f['telefono']] = [telefono]
```

**Por qué**: `unlist()` (`linkaform_api/lkf_base/base.py`) espera desempacar
una lista de un elemento a ese elemento — pero si el argumento es una
lista **vacía** (`[]`, como LinkaForm guarda "sin capturar" en varios
campos de catálogo), regresa `[]` tal cual, sin degradar a `""`. Si el
código downstream vuelve a envolver ese resultado en una lista nueva
(patrón común al reconstruir `answers` para reenviar), el resultado final
queda `[[]]` — una lista de 1 elemento que es a su vez una lista vacía, en
vez de `[""]`. Esto rompe cualquier consumidor que espere un string en esa
posición (ej. generación de PDF, que puede fallar con "Estructura
incorrecta en answers" sin más detalle).

**Por qué el fix va en el call site y no en `unlist()` mismo**: es un
helper compartido usado por decenas de módulos — cambiar su comportamiento
global es alto riesgo/blast radius grande para un fix que solo hace falta
en los call sites que reenvuelven el resultado. Agrega `or ""` (o el
default correcto para tu caso) justo después de cada llamada a `unlist()`
cuyo resultado se vuelva a envolver en una estructura nueva.

## 12. Depurar con datos que pueden traer credenciales reales sin filtrar

```python
# MAL — cualquier valor de auth (JWT, APIKEY, token de sesión) impreso
# completo en un log/salida de herramienta compromete la cuenta si ese log
# queda expuesto (transcript, PR, canal compartido)
print(response)   # response incluye {'apikey': '...', 'jwt': '...'}

# BIEN — verifica solo lo necesario (existencia, longitud, prefijo) sin
# imprimir el valor completo
print(bool(response.get('apikey')), len(response.get('jwt', '')))
```

**Por qué**: un `get_jwt`/login exitoso, o leer `localStorage`/variables de
entorno con fines de depuración, puede traer APIKEY/JWT/tokens de sesión
reales en la respuesta — no importa que la intención sea solo inspeccionar
el flujo, el valor queda comprometido en cuanto aparece en una salida
visible (log, transcript, captura compartida). Si ya se expuso un secreto
así, rotar la APIKEY o cerrar la sesión afectada cuanto antes.
