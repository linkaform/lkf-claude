# LinkaForm Addons — SDK

Framework BaaS en Python para interactuar con la plataforma LinkaForm vía módulos reutilizables.

## Stack
- Python 3.10+, 4 espacios de indentación
- MongoDB vía `self.cr` (colección `form_answer`)
- CouchDB vía `self.lkf_api.couch`
- `linkaform_api` — librería base

## Reglas fundamentales (nunca romper)
1. **IDs de campos**: siempre `self.f['campo']` o `self.mf['campo']`, nunca ObjectIds crudos
2. **Herencia**: `model.py` hereda solo de `lkf_addons.addons.base.app.Base` (nunca de `LKF_Base`) y `app.py` solo de `model.py`. Para usar otro módulo: `self.load(module='Employee', **self.kwargs)`, no herencia
3. **Errores**: `self.LKFException({'msg': '...', 'status_code': 400})`, nunca `return {'error': ...}`
4. **MongoDB soft-delete**: todo `find()`/`$match` debe incluir `'deleted_at': {'$exists': False}`
5. **Versionado de forms**: al editar un form, su `_workflow.xml` o `_rules.xml`, actualizar `updated_at` y `<description>version: N</description>` en el XML del form (ver `knowledge/conventions/form_versioning.md`); si no, la utilería no detecta el cambio
6. **Pull requests en `clave10` y `clave10-app`: NUNCA**, ni subir ramas para prepararlos. Solo con **doble confirmación** explícita del usuario (ver `knowledge/conventions/pull_requests.md`)

## MCP server disponible: `lkf-knowledge`
Código en `lkf-claude/mcp/`, conocimiento en `lkf-claude/knowledge/`. Consultable con:
- `lkf_search(query)` — buscar patrones por término
- `lkf_get(name)` — obtener patrón completo
- `lkf_list()` — ver todo el conocimiento disponible
- `lkf_add(name, category, content, shared=False)` — agregar aprendizaje. Default:
  tu knowledge local (`~/.config/lkf/knowledge/`, sobrevive updates). `shared=True`
  lo escribe en el repo para commitearlo, solo desde el checkout de git.
- `lkf_validate(code)` — verificar código contra convenciones

## Skills disponibles
- `/lkf` — referencia completa del SDK + activar modo linkaform
- `/lkf-module <nombre>` — scaffolding de módulo nuevo desde cero (model.py + app.py). Si parte de una cuenta existente, usar el agente `clave10-nuevo-modulo`
- `/lkf-learn` — capturar y guardar un nuevo patrón
- `/lkf-review` — revisar código contra convenciones del SDK
- `/clave10-account-scripts-sync` — sync de scripts/formas de módulos por cuenta de cliente (batch) vía `./lkf workwith`
- `/clave10-prod-update` — actualiza el contenedor Docker de producción de una o varias cuentas (`./lkf update prod <id>`)
- `/clave10-pdfs` — sistema de diseño de PDFs y reportes de Clave 10 (librería ReportLab: header, KPIs, tablas, footer "Operación segura.")
- `/buscar-tests` — dado un problema descrito en palabras, dice qué tests de sdk_testing lo cubren, su estado en Notion y cómo correrlos; si no hay cobertura, crea un Task para QA (Citlali)
- `/worktree <instrucciones>` — crea un worktree aislado en `.trees/<nombre>` y ejecuta ahí la tarea

## Agentes disponibles
- `clave10-nuevo-modulo` — arma un módulo nuevo a partir de una cuenta de cliente: paquete `model.py` + `app.py` (solo `Base`, otros módulos con `self.load`), baja formas, catálogos y scripts con `lkfaddons download` y convierte los scripts sueltos en métodos de la clase. Sigue `knowledge/conventions/new_module_checklist.md`.

## Rutas de repos
Nunca hardcodear `~/lkf/<repo>` en scripts de skills. Usar el resolver:
```python
sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "lib"))
from lkf_workspace import workspace
addons = workspace().path("addons")   # claves: addons, api, sanic, front, backend
```
Diagnóstico: `python3 lib/lkf_workspace.py`

## Estructura
```
lkf_addons/addons/
  base/          ← Clase Base (todos heredan de aquí)
  _template/     ← Plantilla para módulos nuevos
  <modulo>/
    __init__.py  ← depends = ['base', ...]
    model.py     ← <Modulo>Model(Base): IDs de forms, catálogos y campos (self.f)
    app.py       ← <Modulo>(<Modulo>Model): lógica de negocio
    items/forms|catalogs|reports|scripts/   ← formas y catálogos: base del módulo

modules/<modulo>/items/scripts/<Carpeta>/    ← personalización: scripts + <modulo>_utils.py
```
