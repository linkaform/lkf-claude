# Menús (catálogo ELEMENTOS_MENU / forma CONFIGURACION_MENUS)

> Comportamientos no obvios de Linkaform descubiertos construyendo el editor
> de catálogo de menús — relevantes para cualquier trabajo futuro sobre
> `ELEMENTOS_MENU`/`CONFIGURACION_MENUS`, no solo desde ese editor.
> Lógica en `addons/modules/base/items/scripts/Base/menus.py`.

## El render siempre jala datos frescos del catálogo por `key`

`get_user_menus()` (`menus.py`) solo extrae la lista de `key`s de
`elementos` (guardado en `CONFIGURACION_MENUS`) y llama a
`get_format_user_menus(filter_keys=...)`, que trae los datos ACTUALES del
catálogo `ELEMENTOS_MENU`. Por eso: **editar un item existente (nombre,
sección, orden, ícono) ya se refleja automáticamente para todos los
usuarios que lo tengan asignado — no hace falta sincronizar nada.** La
copia de menu/seccion/elemento que sí se guarda en `elementos` solo la usa
`set_permissions` (ver siguiente punto), no el render.

## `set_user_permissions()` se dispara por workflow nativo y usa el LABEL, no `menu_key`

Un workflow nativo de Linkaform adjunto a la forma `CONFIGURACION_MENUS`
corre `menus.py?option=set_permissions` en cada create/edit de esa forma
(`run_multiple_times: True`). Resuelve qué forms/catálogos/scripts
compartir usando el **LABEL del menú en minúsculas**
(`menu.lower().replace(' ','_')`) contra el diccionario fijo
`module_permits` en `menus.py` — **no usa `menu_key`**.

**Consecuencia**: renombrar el label de un MÓDULO completo (no de una
sección o item) es riesgoso — si el nuevo nombre no calza con una key de
`module_permits`, la próxima vez que se toque la asignación de un usuario
de ese módulo se le pueden **quitar** permisos que ya tenía (unshare
silencioso). Hasta que `module_permits` se arregle para usar `menu_key` en
vez del label, tratar el nombre de un módulo existente como inmutable
(solo editable al crearlo).

Consecuencia práctica: sincronizar la copia guardada en `elementos` solo
hace falta cuando cambia el **label** de sección o elemento — nunca por
cambios de orden/columna/ícono/href.

## Funciones "set_x" de este subsistema reemplazan, no mergean

`save_user_menu_items` **reemplaza** toda la lista de `item_keys` del
usuario, no la mergea — nunca mandar solo la key nueva
(`["admin_menus"]`), hay que leer primero con `get_user_menu_items` y
mandar la lista completa con la key agregada. Mismo espíritu que
`patterns/patch_record.md` (sección `patch_forms_answers`).

## Bootstrap de `admin_menus` es huevo-y-gallina

El gate de acceso a `/admin/menus` vive en frontend (key `"admin_menus"`),
y `save_user_menu_items` filtra los `item_keys` contra el catálogo real —
si la key `admin_menus` **no existe todavía como fila del catálogo**, se
descarta en silencio (no error, simplemente no queda asignada). El primer
admin de una cuenta nueva no se puede dar de alta desde la propia UI: hay
que 1) cargar el catálogo (import) con una fila `key="admin_menus"`
primero, y 2) llamar `save_user_menu_items` por backend directo después.

## Catálogo desnormalizado: cuidado con keys repetidas por plataforma

El catálogo es completamente desnormalizado (cada fila de item repite
menu+seccion completos). Es común que el mismo `key` aparezca en más de una
fila — una por plataforma (`web`/`mobile`) describiendo el mismo concepto
como items de catálogo distintos. `get_format_user_menus(filter_keys=...)`
regresa AMBAS filas como `elementos` separados — un conteo de items de
usuario puede verse inflado sin que se le haya dado ningún permiso extra
real (el render sí deduplica por key al construir el menú). No asumas que
un `key` es único en el catálogo.

## Reorganizar es seguro si no cambian los `key`; cargar catálogo desde cero tiene dos caminos

Mover un item de sección/columna (sin tocar su `key`) no le quita el
permiso a ningún usuario — el render y `get_user_menu_items` resuelven por
`key`, no por posición. Antes de un import real, diffear el catálogo actual
por `key` contra el nuevo origen para confirmar que ninguna key existente
desaparece.

Para regenerar el catálogo completo desde una spreadsheet, dos opciones:

- La función ad-hoc del módulo (si existe, ej. `replace_menu_catalog`) —
  típicamente hace borrar-y-recargar.
- El **endpoint nativo de Linkaform** `catalog_load_rows`/`sheet_to_catalog`
  (`linkaform_api.utils.Cache.catalog_load_rows(catalog_id, mapping,
  spreadsheet_url)` → `POST /api/infosync/catalog_answers/sheet_to_catalog/`),
  el mismo que usa el propio framework para poblar catálogos al instalar
  un módulo. Es **aditivo** (agrega filas, no reemplaza/dedupea) — hay que
  vaciar el catálogo actual antes si quieres un reemplazo limpio. No
  requiere que ningún script de módulo esté instalado en la cuenta —
  `catalog_load_rows` es parte del paquete base `linkaform_api`, se puede
  llamar instanciando `linkaform_api.lkf_base.base.LKF_Base(settings,
  use_api=True)` directo:

```python
mapping = {
    "Columna del Sheet": "<field_id del catálogo>",
    # ... una entrada por columna que quieras poblar
}
obj = LKF_Base(settings, use_api=True)
obj.lkf_api.catalog_load_rows(catalog_id, mapping, spreadsheet_url)
```

Verificado en producción real (cuenta 31455): 114 filas cargadas,
`status_code: 202`.

## Campos radio en catálogos: la API quiere el LABEL capitalizado, no el value

Un campo radio de catálogo (ej. "Platforms": Web/Mobile/Both) solo acepta
el **LABEL capitalizado** al escribirlo vía API
(`patch_catalog_answers`/`post_catalog_answers`) — aunque datos cargados
por bulk-import (`catalog_load_rows`) queden guardados en minúsculas y se
lean así sin problema. Si un script escribe a un catálogo con campos radio,
capitaliza el label antes de mandarlo o Linkaform rechaza con "Respuesta
incorrecta" — normaliza a minúsculas al leer, a label capitalizado al
escribir. Ver también `conventions/anti_patterns.md#10` (values de
radio/checkbox no son slugs limpios) — aquí el matiz es al revés: el
catálogo normaliza a minúsculas al leer pero exige capitalizado al escribir.

## Compartir permisos NO es retroactivo — un usuario que no re-guarda su config se queda sin lo nuevo

`set_user_permissions()` (`base/app.py`) solo se recalcula/comparte cuando
se **crea o edita** el registro de `CONFIGURACION_MENUS` de ESE usuario
(dispara el workflow nativo). Si agregas un catálogo/forma/script nuevo a
`module_permits` para un módulo que ya tenía usuarios con ese menú activo,
esos usuarios **no** reciben el nuevo permiso hasta que alguien vuelva a
crear/editar su registro — no hay ningún proceso que re-sincronice
retroactivamente a los usuarios existentes.

**Cómo diagnosticar** usuarios afectados (solo lectura):
1. Query `form_answer` por `form_id` de `CONFIGURACION_MENUS` +
   `deleted_at: {"$exists": False}`, extraer `usuario_id` de
   `answers[USUARIOS_OBJ_ID][usuario_id_field]` (anidado dentro de un
   catálogo embebido — no es un campo raíz de `answers`, fácil asumir mal
   la ruta) y `elementos` del campo correspondiente.
2. Para cada `usuario_id` con `elementos` no vacío,
   `get_user_catalog(uid)` regresa `{'data': [...], 'status_code': ...}` —
   la lista está en `.get('data')`, no es directamente iterable.
3. Comparar si el catálogo/id nuevo está en esa lista — si no, ese usuario
   quedó sin backfill.

**Cómo corregir sin reimplementar la lógica de compartir**: en vez de
reescribir a mano qué debería compartirse, re-ejecuta la lógica de
producción real por backend directo:

```python
from base_utils import Base   # NO linkaform_api.lkf_base.base.LKF_Base
                               # directo — ese no trae module_permits/set_user_permissions

obj = Base(settings, use_api=True)
obj.user = {...}                          # username/user_id de la cuenta
obj.answers = registro_ya_guardado        # el answers real de ese usuario en Mongo
obj.set_user_permissions()                # recalcula y comparte según su `elementos` actual
```

Esto ejecuta exactamente lo mismo que correría si el usuario hubiera
vuelto a guardar su registro, sin tocar el documento de
`CONFIGURACION_MENUS` en sí. **Patrón general**: cuando necesites
"re-disparar" el efecto secundario de un create/edit para registros ya
existentes (backfill), busca primero si puedes invocar la función real del
módulo por backend directo con los datos ya guardados — no reimplementes
su lógica en un script aparte.

**Gotcha al hacerlo en batch**: un usuario puede seguir sin backfill
después de correr esto porque simplemente **ya no existe** (dado de baja) —
se detecta con `get_user_by_id(uid)` regresando `{}` y los
`get_user_forms/scripts/catalog` correspondientes regresando `status_code:
404`. No es un bug del mecanismo de compartir, es un registro huérfano
apuntando a un usuario borrado — no hay nada que compartir ahí.

## Antes de usar cualquier script nuevo de menús contra una cuenta real

Cada cuenta tiene su propio set de scripts instalados. Prueba primero con
algo de solo-lectura (ej. `list_menu_items`) — si regresa
`{"error": "El script no existe."}` (HTTP 404), corre
`lkfaddons install -m base -i scripts` para ESA cuenta antes de continuar.
Que un script ya funcione en la cuenta de pruebas no dice nada sobre otras
cuentas reales.
