# Crear Actualizar Area

> Cómo crear y actualizar un "área" (accesos) — dos formularios distintos, campos requeridos, y por qué la lógica NO vive en accesos/app.py.

## El error más común: `format_data_area`/`create_new_area` no están en `app.py`

A pesar de que casi toda la lógica de negocio del módulo `accesos` vive en
`lkf_addons/addons/accesos/app.py`, la de **áreas** es la excepción: vive
completa en el script standalone
`modules/accesos/items/scripts/Accesos/update_area.py`, en una subclase local:

```python
from accesos_utils import Accesos

class Accesos(Accesos):
    def __init__(self, settings, folio_solicitud=None, sys_argv=None, use_api=False, **kwargs):
        super().__init__(settings, sys_argv=sys_argv, use_api=use_api, **kwargs)
        self.load(module='Location', **self.kwargs)   # crea self.Location
        self.area_update = { ... }   # field-ids propios de este script

    def format_data_area(self, data): ...
    def create_new_area(self, data): ...
    def create_register(self, module, process, action, file, form_id, answers): ...
    def update_area(self, data): ...
    def exists_area(self, ubicacion, area): ...
    def get_record_ubicacion(self, ubicacion=None, area=None, tag_id_area=None): ...
    def get_contact_details(self, direccion): ...
```

`grep -n "format_data_area" accesos/app.py` da cero resultados. Si necesitas
estos métodos (para un front, un test, otro script), impórtalos de
`update_area.py`, NO asumas que están en la clase base:

```python
from update_area import Accesos as AreaAccesos   # bare import, mismo directorio
```

`update_qr.py` define un `format_data_area` homónimo pero **distinto** (para
otro formulario) — no confundir los dos.

## Dos formularios, no uno

1. **"Configuracion de Area"** (`self.CONFIGURACION_AREA_FORM`) — el formulario
   que se llena para *pedir* la creación/edición (tiene un workflow `before`
   que dispara `update_area.py`). Aquí viven `option` (¿existe el área?),
   `create_area`, `nombre_nueva_area`, `qr_area` (texto del tag), `foto_area`.
2. **`areas_de_las_ubicaciones`** (`self.AREAS_DE_LAS_UBICACIONES`, definido en
   `location/app.py`) — el catálogo real donde vive el área ya creada. Es lo
   que después selecciona un rondín (`configuracion_de_recorridos.xml`, por
   `catalog-select` sobre el field "Nombre de Area", no por `_id`).

## Crear un área nueva (`create_new_area`)

```python
area_obj = AreaAccesos(settings, use_api=True)
area_obj.user = {...}   # igual que cualquier fixture de Accesos

# La geolocalización NO va en el dict de datos — se lee de un atributo
# aparte, que en el script real solo se setea en el bloque __main__
# (viene de sys.argv[1]['geolocation'], un [lng, lat]).
area_obj.geolocation_area = {'latitude': lat, 'longitude': lng}

data = {
    'ubicacion': 'Planta Monterrey',        # debe existir en el catálogo de ubicaciones
    'nombre_nueva_area': 'Bodega Norte',
    'foto_area': [{'file_name': 'foto.png', 'file_url': '...'}],
    'qr_area': '',                          # string libre -> termina en el field "TagId" (texto), NO en el field "QR Area" (imágenes)
    'tipo_de_area': 'Bodega',               # REQUERIDO, ver abajo
}
response = area_obj.create_new_area(data)   # None si ya existía (ubicacion+nombre), o dict con status_code/json si se creó
```

`create_new_area` primero llama `exists_area(ubicacion, nombre)` — si ya
existe esa combinación, no crea nada y regresa `None` en silencio (no
excepción). Útil para hacer el helper idempotente, pero también significa
que un `response is None` no siempre es error — puede ser "ya existía".

### Campo requerido que rompe con 400 si se omite: `tipo_de_area`

```
{'663e5e68f5b8a7ce8211ed18': {'msg': ['Este campo es requerido'], 'label': 'Tipo de Area', 'error': []}}
```

Valores válidos vistos en catálogo: `"Bodega"`, `"Cuarto de Maquinas"` (hay
más, pero estos dos ya confirmados funcionando). Cualquier UI/script que
cree áreas debe forzar un valor aquí — no hay default server-side.

### Gotcha de nombres: `qr_area` (variable) ≠ "QR Area" (field del área)

El dict de entrada usa la key `'qr_area'` para el **texto libre** que
termina en el field **"TagId"** (`area_update['tag_id_area']` =
`6762f7b0922cc2a2f57d4044`, tipo texto). El field literal **"QR Area"** del
formulario destino (`663e5e4bf5b8a7ce8211ed13`) es de tipo **imágenes**, y
`create_new_area` no lo toca. Si en el futuro necesitas subir una imagen de
QR real, es un field distinto.

## Actualizar un área existente (`update_area`) — p. ej. asignar el tag_id después de crear

```python
data = {
    'ubicacion': 'Planta Monterrey',
    'area': 'Bodega Norte',     # nombre del área YA creada (no 'nombre_nueva_area')
    'qr_area': 'https://web.clave10.com/areas/<object_id>',   # nuevo valor de TagId
}
response = area_obj.update_area(data)
```

`update_area` busca el registro por `ubicacion` + `area` (`get_record_ubicacion`),
y hace un **PATCH que re-guarda TODOS los campos actuales** del área,
sobreescribiendo solo `tag_id_area` (desde `data['qr_area']`) y `foto_area`
(desde `data['foto_area']`) si vienen en `data` — el resto se copia tal cual
del registro encontrado. Sirve para separar "crear" de "asignar tag_id" en
dos pasos (por ejemplo, generar el tag después de tener el `_id` real del
área para armar una URL tipo `.../areas/{id}`).

**Bug conocido**: las ramas de error de `update_area` referencian la
variable global `acceso_obj` en vez de `self` (`acceso_obj.LKFException(...)`)
— fuera del `if __name__ == "__main__":` del script original esto lanza
`NameError` en vez de la excepción esperada. Solo importa si `ubicacion` está
vacía o el área no se encuentra (rutas de error), no afecta el happy path.

## Mongo (`form_answer`) ≠ CouchDB (catálogo) — la sync NO es automática

`create_new_area`/`create_register` solo hace `self.lkf_api.post_forms_answers(...)`
(escribe en Mongo, colección `form_answer`). **Nada dispara automáticamente**
la sincronización hacia el catálogo de CouchDB (`areas_de_las_ubicaciones`,
el que respalda `/v2/catalog-records/{catalog_id}/record/{id}/` y el que
consulta `get_catalog_areas_formatted`/`catalog_view`). Si necesitas que el
área quede visible ahí (front que lee del catálogo directo, u otra
integración que dependa de CouchDB), hay que llamarlo explícito:

```python
area_obj.lkf_api.sync_catalogs_records({
    "catalogs_ids": [area_obj.AREAS_DE_LAS_UBICACIONES_CAT_ID],   # catalog_id CouchDB, distinto de AREAS_DE_LAS_UBICACIONES (form_id Mongo)
    "form_answers_ids": [area_id],                                # _id de Mongo del área recién creada
    "status": "created",
})
```

Para verificar directo (sin pasar por `search_catalog`/REST), la base de
CouchDB sigue el patrón `catalog_records_{catalog_id}`:

```python
db = area_obj.get_couch_user_db(f"catalog_records_{area_obj.AREAS_DE_LAS_UBICACIONES_CAT_ID}")
doc = db[area_id]   # lanza couchdb.http.ResourceNotFound si aún no está
```

Vale la pena reintentar unas cuantas veces con una pausa corta (~1s) antes
de asumir que falló — `sync_catalogs_records` espera a que el POST HTTP
termine, pero no hay garantía documentada de que el indexado del lado del
servidor sea inmediato.

**Importante para el front**: si el flujo de creación de áreas del front
llama a un endpoint equivalente a `create_new_area` sin este paso, el área
existirá en Mongo (y aparecerá en `get_catalog_areas`, que sí es Mongo-only)
pero **no** en ninguna pantalla/consumidor que lea del catálogo CouchDB
hasta que alguien dispare `sync_catalogs_records`.

## Campos clave y sus field-ids (formulario `areas_de_las_ubicaciones`)

| Campo | field_id | Notas |
|---|---|---|
| Nombre de Area | `663e5d44f5b8a7ce8211ed0f` | = `self.mf['nombre_area']` |
| Tipo de Area | `663e5e68f5b8a7ce8211ed18` | **requerido**, dentro de `TIPO_AREA_OBJ_ID` |
| Geolocalizacion de Area | `688bac1ecfdcf8b16eb209b5` | field nativo `geolocation`, no en grupo |
| TagId (texto) | `6762f7b0922cc2a2f57d4044` | lo que llena `data['qr_area']` |
| QR Area (imágenes) | `663e5e4bf5b8a7ce8211ed13` | field distinto, no lo toca `create_new_area` |
| Foto de la Ubicacion | `6763096aa99cee046ba766ad` | = `self.f['area_foto']` |
| Estatus (Activa/Inactiva) | `663e5e4bf5b8a7ce8211ed14` | `create_new_area` siempre pone `'activa'` |
| Estatus del Area (Disponible/Ocupada/...) | `663e5e4bf5b8a7ce8211ed15` | `create_new_area` siempre pone `'disponible'` |
| Ubicación (catalog-select) | `663e5c57f5b8a7ce8211ed0b` | dentro de `UBICACIONES_CAT_OBJ_ID` |

## Para el front de creación de áreas (uso futuro)

- El form que llena el usuario debe mapear 1:1 a las keys de `data` en
  `create_new_area` arriba: `ubicacion`, `nombre_nueva_area`, `foto_area`,
  `tipo_de_area` (select obligatorio), `qr_area` (opcional, texto).
- La geolocalización no es parte del payload de "answers" — es un
  parámetro aparte (`geolocation_area`/`self.geolocation_area`), pensado
  para venir de la ubicación GPS del dispositivo al momento de crear el área.
- Si el front permite escanear o generar un tag/QR después de crear el área
  (flujo en dos pasos: crear → asignar tag), usa `update_area` con
  `data['area']` (no `nombre_nueva_area`) — ver ejemplo arriba.
- Antes de crear, si quieres evitar el POST cuando ya existe, puedes
  replicar `exists_area(ubicacion, nombre)` en el front/back para dar
  feedback temprano, aunque `create_new_area` ya es seguro llamarlo dos
  veces (no duplica, solo no hace nada la segunda vez).

## Ver también
- `patterns/post_record.md` / `patterns/patch_record.md` — patrones genéricos de creación/actualización que `create_register`/`update_area` siguen por debajo.
- `patterns/self_f_label_collision.md` — mismo tipo de gotcha de field-ids compartidos entre `self.f`/`self.mf`.
