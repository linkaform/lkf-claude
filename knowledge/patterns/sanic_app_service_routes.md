# Sanic App Service Routes

> El problema concreto que nos costó horas migrando `location` a Sanic: `app.py` de un módulo ya migrado NO es la implementación — es un shim que importa `service.py`. Editar `app.py` pensando que ahí vive la lógica es el error más caro de esta migración.

## 0. La regla en una línea

En `lkf-sanic-apps/addons/<modulo>/`, cuando un módulo **ya está migrado**
a Sanic, `app.py` deja de tener lógica y se convierte en un simple
re-export:

```python
# addons/accesos/app.py — así se ve un módulo YA migrado
"""
Re-exporta la clase Accesos para que otros modulos puedan componerla via
self.load(module='Accesos', **self.kwargs)... La logica real vive en
service.py; este archivo es solo el punto de entrada esperado por load().
"""
from .service import Accesos
```

Toda la lógica de negocio real (métodos, field-ids, queries) vive en
`addons/<modulo>/service.py`. Si necesitas agregar o corregir un método de
un módulo ya migrado, **el archivo correcto casi siempre es `service.py`,
no `app.py`** — aunque `app.py` sea el nombre "obvio"/instintivo por
costumbre del lado legacy (donde `app.py` sí es la clase completa).

## 1. Cómo nos mordió esto exactamente

Migrando `location`: `location/app.py` (en `lkf-sanic-apps`) todavía era
una clase completa (`class Location(Base): ...`), NO un módulo ya
migrado — location nunca había pasado por esta migración, a diferencia de
`accesos`/`employee`. Le agregamos los métodos nuevos (`create_new_ubicacion`,
`get_ubicacion_by_id`, etc.) directamente a ese `app.py`... y sin embargo
las rutas seguían tronando con `AttributeError: 'Location' object has no
attribute 'get_catalog_ubicaciones_formatted'`.

La razón: `get_module_class('Location')` (`app/loader.py`) NO carga
`app.py` directo — sigue un orden de prioridad (ver sección 2) que, sin un
override instalado, cae en un `importlib.import_module('lkf_addons.location.app')`
que apunta al paquete **instalado (pip) dentro del contenedor**
(`/usr/local/lib/python3.12/site-packages/lkf_addons/location/app.py`),
horneado en la imagen — no al archivo del repo que acabábamos de editar.
Aunque hubiéramos editado el archivo correcto del repo, sin rebuild de
imagen el contenedor sigue viendo la versión vieja.

La solución fue calcar el patrón de `accesos`: crear `service.py` con la
clase completa (vieja + métodos nuevos) y convertir `app.py` en el
one-liner `from .service import Location`. Ahí sí, tras rebuild de imagen,
`get_module_class` (vía el fallback a `.app`, que ahora re-exporta
`service.py`) resolvió la clase correcta.

## 2. Orden de resolución de `get_module_class(class_name)`

(`app/loader.py` en `lkf-sanic-apps`) — en este orden, se queda con el
primero que encuentre:

1. **Override por cuenta** (`CUSTOM_MODULE_PATHS[0]`, la carpeta de
   scripts instalados de la cuenta activa): busca un archivo plano
   `<clase>_service.py` o `service.py` — ej. `accesos_service.py`. Este es
   el mecanismo real detrás de "personalizaciones por cliente" (lo mismo
   que usa `rondines_sdk.py`/`location_sdk.py` instalados vía
   `/clave10-scripts`).
2. **Gotcha: `CUSTOM_MODULE_PATHS[1]` tiene "accesos" hardcodeado**
   literalmente en el path (`/srv/lkf-sanic-app/app/modules/accesos/items/scripts/CLASS_NAME`)
   — el `CLASS_NAME` se reemplaza pero "accesos" NO. Para cualquier módulo
   que no sea Accesos, este paso nunca va a encontrar nada — no pierdas
   tiempo revisando esa ruta pensando que ahí debería instalarse el
   override de otro módulo.
3. **Fallback final**: `importlib.import_module(f"lkf_addons.{clase.lower()}.app")`
   — el paquete `lkf_addons` **instalado vía pip dentro de la imagen**
   (`site-packages/lkf_addons/...`), no el repo `lkf-sanic-apps` en tu
   checkout local. Si el módulo YA está migrado (app.py = shim a
   service.py), este fallback te da la clase completa gratis, sin
   necesitar override por cuenta. Si el módulo NO está migrado (app.py con
   lógica vieja/incompleta), este fallback te da exactamente eso: la
   versión vieja/incompleta.

## 3. Migrar un módulo que nunca tuvo rutas propias (no solo agregar un endpoint)

Si el módulo ya tenía blueprint (`accesos_bp`, `employee_bp`) y solo le
agregas una ruta más, basta con tocar `service.py`+`routes.py` de ese
módulo (ver `legacy_script_migration.md`). Pero si el módulo (como
`location`) **nunca había sido expuesto como su propio blueprint**, hace
falta además:

1. Crear `addons/<modulo>/routes.py` desde cero (Blueprint +
   `get_module_class('<Modulo>')` + rutas), calcando `addons/accesos/routes.py`.
2. Registrar el blueprint en `app/addons_routes.py` — **lista hardcodeada**:
   ```python
   from lkf_addons.location.routes import location_bp
   blueprints = ['Accesos', 'Employee', 'Location']  # agregar aquí
   ```
   Sin este paso, aunque `routes.py` exista y compile, la ruta da
   `404 Requested URL /location/... not found` — el archivo nunca se
   importa/registra.
3. **Todo `addons/` y `app/` vive horneado en la imagen** `linkaform/sanic-app`
   (no hay bind-mount del repo hacia el contenedor en este entorno) — cualquier
   cambio a estos 3 puntos (service.py, routes.py, addons_routes.py)
   requiere **rebuild de imagen + recrear el contenedor** para que el
   entorno de desarrollo lo vea. Confirmarlo antes de asumir "no funciona
   mi código" — puede que simplemente no se haya reconstruido la imagen.

## 4. Cómo confirmar rápido, sin adivinar

Dentro del contenedor corriendo (`docker exec <id> python3 -c "..."`):

```python
from lkf_addons.location.service import Location
print([m for m in dir(Location) if 'ubicacion' in m.lower()])
```

Si el método nuevo no aparece ahí, el problema es la imagen (no rebuildeada
o editaste el archivo equivocado) — no sigas buscando el bug en `routes.py`
o en el front hasta confirmar esto primero.

## Ver también
- `legacy_script_migration.md` — playbook general para migrar un script legacy a `service.py`+`routes.py`.
- `clave10_front_explorer_screen.md` — sección 13, menciona el patrón `<script>_sdk.py` que consume estas rutas desde el front.
