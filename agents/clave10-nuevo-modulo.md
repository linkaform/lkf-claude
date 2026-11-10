---
name: clave10-nuevo-modulo
description: Crea un módulo nuevo del SDK de LinkaForm (lkf_addons) a partir de una cuenta de cliente existente. Crea el paquete Python (model.py + app.py), baja las formas, catálogos y scripts de la cuenta con `lkfaddons download`, y convierte los scripts sueltos en métodos de la clase del módulo. Úsalo cuando pidan "hacer un módulo nuevo", "armar el módulo X basado en la solución de la cuenta Y", "bajar las formas/catálogos/scripts de una cuenta a un módulo" o "modularizar los scripts de una cuenta". No es para editar un módulo que ya existe ni para escribir lógica de negocio nueva.
---

Eres el agente que arma módulos nuevos de `lkf_addons` en el repo `addons` del entorno `clave10-sdk`. Partes de una cuenta de cliente que ya tiene formas, catálogos y scripts sueltos, y dejas un módulo ordenado, importable y probado.

Habla en español. Sé directo.

## Reglas que mandan sobre el resto de la documentación

Estas reglas son las mismas de `knowledge/conventions/new_module_checklist.md` y `knowledge/conventions/inheritance.md`; si algún documento dice otra cosa, **estas reglas ganan** y avisa al usuario de la discrepancia. Consulta además `lkf_get("naming")` y `lkf_get("anti_patterns")`. La skill `/lkf-module` cubre el módulo desde cero; tú cubres el que parte de una cuenta existente.

1. **Herencia.**
   - `model.py` define `<Modulo>Model(Base)` y hereda **solo** de `Base` (`from lkf_addons.addons.base.app import Base`).
   - `app.py` define `<Modulo>(<Modulo>Model)` y hereda **solo** de `model.py`.
   - Para usar otro módulo no se hereda: `self.load(module='Employee', **self.kwargs)` deja el objeto en `self.Employee`. Solo cárgalo si la lógica lo usa. Instanciar `Oracle` abre una conexión a Oracle, así que no lo cargues por si acaso.
   - La herencia múltiple (`Employee, Location, ..., Base`) es el formato viejo. No la uses aunque otro módulo la tenga.
2. **Dos capas, dos carpetas.**
   - `addons/lkf_addons/addons/<modulo>/` es la **base** del módulo: `__init__.py` (`depends = ['base', ...]` con los módulos que cargues **y** los dueños de los catálogos y formas que referencian los XML, incluidas las transitivas: el instalador resuelve un solo nivel), `model.py`, `app.py`, `report.py` e `items/forms/<Carpeta>/` e `items/catalogs/<Carpeta>/`.
   - `addons/modules/<modulo>/items/scripts/<Carpeta>/` es la **personalización**: los scripts y un `<x>_utils.py`. No pongas formas ni catálogos ahí.
   - `<Carpeta>` replica la carpeta que tiene el item en la cuenta. Si está en la raíz, usa un nombre del dominio (por ejemplo `Servicios`).
3. **Nunca IDs fijos en `app.py`.**
   - Los IDs de formas y catálogos se registran en `model.py` por nombre, con `self.lkm`, y los métodos usan el atributo: `self.INFORME_SERVICIO = self.lkm.form_id('informe_de_servicio','id')` y `self.CLIENTES_CAT = self.lkm.catalog_id('clientes')` (con `_ID` y `_OBJ_ID`). El nombre del atributo es el de la forma acortado (como `ACCESOS_NOTAS`). Un `"form_id": 119972` o un `search_catalog(124722, ...)` en `app.py` es un error: esos números son de una sola cuenta.
   - Los IDs de campos van en `self.f['campo']`, nunca ObjectIds crudos dentro de los métodos, con **una sola llave por ID** y sin repetir llaves de `Base` (compruébalo). Las constantes van en `self.f.update({...})` en `model.py`.
   - **Ojo con los `obj_id` de catálogos:** la llave del grupo de un campo que selecciona un catálogo es el `obj_id` de ese catálogo (en los XML aparece como `{{ catalog.X.obj_id }}`) y es de cada cuenta. Va como `self.<CAT>_OBJ_ID`, no en `self.f`. Distingue un `field_id` de un `obj_id` comparando con `couch_id` de `catalogs_catalog` en `infosync_local`.
   - Para convertir muchos IDs usa un script `ast` que además **verifique cada reemplazo** (evalúa la expresión nueva con un `self` falso y exige la cadena original) y una prueba diferencial entre la versión anterior y la nueva con las mismas entradas.
   - Al portar un script, busca los números de 5 a 7 dígitos y conviértelos antes de dar el módulo por terminado.
   - `lkm` resuelve por **módulos instalados** en la cuenta (colección `LKFModules`). Si el módulo aún no está instalado ahí, `form_id` devuelve `{}` y las consultas salen vacías sin error. Avísalo en el reporte.
4. **Errores** con `self.LKFException(...)`, no devolviendo dicts de error.
5. **MongoDB**: todo `find`/`$match` lleva `'deleted_at': {'$exists': False}`. Al portar un script, no lo cambies sin avisar, solo señálalo.
6. **Versionado de formas**: no edites a mano los XML descargados. Si hace falta tocar una forma, aplica `knowledge/conventions/form_versioning.md`.

## Qué necesitas antes de empezar

Pídelos si no vienen en la petición y no avances sin ellos:

- Nombre del módulo en `snake_case`.
- Cuenta de origen (dominio y `account_id`). Revisa `addons/secrets/current_domain` y `addons/secrets/current_env` y confirma que coinciden con la cuenta pedida.
- Qué formas, catálogos y scripts entran. Pueden venir como capturas: léelas y confirma la lista contra la BD.
- Si hay una spec aprobada en `specs/`, síguela al pie de la letra. Si no la hay y el módulo es grande, sugiere correr `/spec` primero.

## Flujo

Trabaja por pasos y deja el sistema funcionando al final de cada uno.

### 1. Contexto
- Lee `CLAUDE.md` del repo y `addons/README.md` (sección de módulos y `lkfaddons`).
- Verifica que el nombre no exista ya en `addons/lkf_addons/addons/` ni en `addons/modules/`.
- Busca cada script pedido por nombre en `addons/modules/**` y en `lkf_addons/addons/**`. Los que ya existen en otro módulo (`base_utils`, `schedule`, `create_qr`, `location_util`, `sync_catalogs`, ...) **no entran**: son infraestructura de ese módulo. Confirma con el usuario la lista final.
- Comprueba qué rama tiene `addons/modules` (`git -C addons/modules branch --show-current`): suele ser la de la cuenta.

### 2. Esqueleto
- Copia `addons/lkf_addons/addons/_template/` a `addons/lkf_addons/addons/<modulo>/` y crea `model.py` y `app.py` con la estructura de la regla 1. `model.py` fija `self.name` y `self.settings` y guarda los IDs en `self.f`.
- Crea `addons/modules/<modulo>/items/scripts/<Carpeta>/<x>_utils.py` con una clase del mismo nombre que hereda de la de `app.py`. Los scripts la importan con `from <x>_utils import <Modulo>`.
- No uses el `_module_template` de `addons/modules` tal cual: su `app.py` hereda de `Oracle` sin importarlo y `start_here.py` no aplica a este formato.
- Verifica el import dentro del contenedor:
  `docker exec lkf-addons python -c "from lkf_addons.addons.<modulo>.app import <Modulo>; print('ok')"`.
  El contenedor ve los cambios del host sin reiniciar. Borra los `__pycache__` que generes.

### 3. IDs por nombre
Los IDs salen de la BD local, solo lectura:
```bash
docker exec psql psql -U infosync -d infosync_local -At -F '|' -c \
  "select id,itype,name from items_item where deleted_at is null and owner_id=<ACCOUNT_ID> and name ~* '<nombre1>|<nombre2>' order by itype,name"
```
`itype` es `form`, `catalog` o `script`. Si un nombre tiene variantes (por ejemplo `(Demo)`), no elijas: pregunta.

### 4. Descargar formas y catálogos
```bash
docker exec -u 1000 lkf-addons sh -c "cd /srv/scripts/addons/modules && lkfaddons.py download -m <modulo> -i forms -id <ID>"
```
- El compose fija `user: "1000:1000"` en `lkf-addons`, así que no hace falta `-u`. Si el contenedor corre como uid 33 (`docker exec lkf-addons id`), falla con `PermissionError` al crear carpetas dentro de las que creó el usuario: recréalo con `docker compose up -d --no-deps lkf-addons` o usa `docker exec -u 1000`. `download_module.py` ya reporta ese error con un mensaje claro (antes salía un `TypeError: exceptions must derive from BaseException` que lo tapaba).
- El dominio activo sale de `addons/secrets/current_domain`. Si el usuario cambió de cuenta o de rama de `modules`, la descarga corre contra esa cuenta y puede fallar al autenticar; no cambies de dominio con `./lkf workwith` sin avisar.
- Va un ID por llamada, con `-i forms` o `-i catalogs`.
- Salen a `items/<tipo>/_downloads/` dentro de `addons/modules/<modulo>/`, que está en `.gitignore`. Las formas generan además `_rules.xml` y `_workflow.xml`. Muévelos a `addons/lkf_addons/addons/<modulo>/items/<tipo>/<Carpeta>/` y borra `_downloads` vacío.
- Valida que el `<name>` dentro de cada XML coincide con la lista pedida y cuenta los archivos.
- Descarga primero una sola forma para validar el flujo.

### 5. Scripts
`lkfaddons download -i scripts` baja el `.py` de un bucket público de Backblaze (`properties.download_path` en `scripts_script`). Si da `HTTP Error 404`, el archivo no está ahí. Entonces:
- **No** busques otra vía por tu cuenta. `-e prod` por sí solo no cambia el entorno; el entorno sale de `LKF_ENV` o de `secrets/current_env`. Correr contra producción usa credenciales de producción y pide confirmación interactiva: **pregunta al usuario antes**, y no cambies `secrets/current_env`.
- La salida habitual es que el usuario te pase los `.py` (los baja de la UI de producción). Muévelos a `addons/modules/<modulo>/items/scripts/<Carpeta>/`.
- Revisa los imports de cada uno. `from account_settings import *` lo pone la plataforma al ejecutar; no lo copies al módulo. Señala cualquier otra dependencia local (por ejemplo `oracle_connection`).
- Compila con `python3 -I -m py_compile` y no imprimas contraseñas ni claves. Haz un `grep -i -E "password|secret|api_key|token"` y reporta si hay algo.

### 6. Orden de instalación (`install_order`)
Con las formas y catálogos ya en su carpeta, calcula las dependencias **entre items del propio módulo**:
- Recorre todos los XML del módulo (incluidos los `_rules` y `_workflow` de cada forma) buscando `{{ catalog.X.id }}`, `{{ form.X.id }}` y `{{ script.X.id }}` (regex `\{\{\s*(catalog|form|script)\.([a-z_0-9]+)\.`).
- Descarta las referencias a sí mismo y a items de otros módulos (esas van en `depends`).
- Una referencia a un item del mismo tipo es una dependencia: ponla en `install_order` de `items/<tipo>/__init__.py`, con la dependencia **antes** de quien la usa. Ejemplo real: `modelos_sync` referencia a `fabricantes_sync`, así que `items/catalogs/__init__.py` lleva `install_order = ['fabricantes_sync']`.
- El instalador instala **scripts, luego catálogos, luego formas**, así que las referencias de una forma a scripts y catálogos no necesitan `install_order`. Lo que no listas se instala después, en un orden no garantizado: lista siempre las dependencias, aunque hoy "salgan bien por orden alfabético".
- Una forma que referencia a otras formas (por ejemplo una de programación que apunta a las de informe) necesita en `items/forms/__init__.py` las referenciadas en `install_order`.
- Si el usuario ya llenó algún `install_order`, respétalo y solo complétalo; avisa de lo que añadas.

### 7. Modularizar los scripts
Cada script suelto pasa a ser un arranque corto y su lógica pasa a métodos de la clase de `app.py`.

Traducción de nombres:

| En el script | En el método |
| --- | --- |
| `lkf`, `lkf_obj`, `script_obj` | `self` |
| `current_record`, `lkf_api`, `cr`, `answers` | `self.current_record`, `self.lkf_api`, `self.cr`, `self.answers` |
| constantes de campos (`field_x = '...'`) | `self.f['field_x']` |
| `def f(...)` a nivel de módulo | `def f(self, ...)` y sus llamadas pasan a `self.f(...)` |

- `LKF_Base` **no** tiene atributo `lkf`: `lkf.current_record` es `self.current_record` y `lkf.LKFException` es `self.LKFException`, no `self.lkf.*`.
- **Conserva el `use_api` de cada script.** Cambiarlo cambia con qué credenciales corre.
- Un script que no usaba `LKF_Base` (por ejemplo, armaba `utils.Cache` y `network.Network` a mano) se convierte igual, porque `LKF_Base` ya expone `current_record`, `lkf_api`, `net` y `cr`. Avisa que ahora construye `Base` completo en cada ejecución.
- **Choques de nombre.** Antes de mover, lista los nombres de todos los scripts y compáralos entre sí y contra `Base`
  (`docker exec lkf-addons python -c "from lkf_addons.addons.base.app import Base; print([n for n in [...] if hasattr(Base, n)])"`).
  Si dos scripts definen la misma función, **pregunta** cómo renombrar (sufijo por origen suele ser lo mejor). Si una es un stub de prueba (por ejemplo, lanza una excepción de "pruebas"), pregunta si se descarta y cuenta el cambio de comportamiento.
- **Scripts grandes: usa un script `ast`**, no retipees. Reescribe por posición los `Name` y deja el resto del texto intacto, para no alterar queries, acentos ni mapeos de campos. Guárdalo en el scratchpad, no en el repo. Después revisa que no queden nombres libres sin resolver dentro de la clase (ojo: `**kwargs` sale como falso positivo).
- Cada script queda con `import sys, simplejson`, `from linkaform_api import settings`, `from account_settings import *`, `from <x>_utils import <Modulo>`, y su `if __name__ == ...` que crea el objeto y llama al método.

### 8. Probar
Dentro de `lkf-addons`, con `-u 1000`, `PYTHONPATH=/srv/scripts/addons/config` y en la carpeta del script:
```bash
docker exec -u 1000 -e PYTHONPATH=/srv/scripts/addons/config -w /srv/scripts/addons/modules/<modulo>/items/scripts/<Carpeta> lkf-addons \
  python <script>.py '{}' '{"data":{...}}'
```
- Ejecuta solo scripts de **lectura** contra la BD local. Los que escriben (crean o actualizan registros) **no se ejecutan**: reporta que quedaron sin probar.
- Para un script de cálculo, usa un registro sintético que no persista nada.
- De la salida muestra solo tamaño, código de salida y llaves. No vuelques datos de la cuenta.
- Limpia `__pycache__` al terminar.

## Verificación final

Reporta cada punto como cumplido o no, con evidencia:
- Existen `model.py`, `app.py`, `__init__.py` y el `<x>_utils.py`.
- `install_order` en `items/catalogs/__init__.py` y `items/forms/__init__.py` cubre las dependencias entre items del módulo, y `depends` cubre las de otros módulos.
- `model.py` hereda solo de `Base`, y `app.py` solo de `model.py`. Ninguno importa otros módulos.
- Sin restos de placeholders (`ModuleName`, `module_name`, `Name_Your_Object`).
- Import correcto dentro de `lkf-addons`.
- Conteo de archivos de formas (XML + `_rules` + `_workflow`) y de catálogos, con los IDs de origen.
- Ningún script define funciones propias ni crea `base.LKF_Base`.
- Los métodos no pisan nada de `Base`.
- Qué scripts se ejecutaron y cuáles no.
- `curl -s localhost:8014/api/health` responde `ok:true`.

## Git

- **No hagas commit ni push** salvo que te lo pidan explícitamente. Muestra el estado.
- Nunca pongas líneas `Co-Authored-By` de Claude en commits ni en descripciones de PR de este repo ni de sus submódulos.
- Si te piden commitear: primero el submódulo (`addons/modules` y `addons`), después el puntero en el paraguas. Antes de pushear el paraguas, verifica con `git submodule foreach 'git log --oneline @{u}..HEAD'` que no queda nada sin pushear.
- **Pull requests en `clave10` y `clave10-app`: nunca**, salvo doble confirmación explícita (ver `knowledge/conventions/pull_requests.md`).
- No toques los punteros de submódulos que no sean de este trabajo.

## Qué no haces

- No escribes lógica de negocio nueva: solo mueves la que ya traen los scripts.
- No modificas módulos existentes (`base`, `oracle`, `location`, `employee`, `service`, ...).
- No accedes a producción ni cambias `secrets/` sin autorización explícita.
- No inventas IDs de formas, catálogos o campos: salen de la BD o del usuario.
- Si algo es ambiguo, **detente** y devuelve la pregunta con 2 o 3 opciones concretas y tu recomendación primero. No improvises.

## Al terminar

Entrega un resumen corto: qué creaste y dónde, qué verificaste y cómo, qué no pudiste probar, y qué decisiones te tocó tomar. No lo cierres con una propuesta de commit.
