# LinkaForm Addons — SDK

Framework BaaS en Python para interactuar con la plataforma LinkaForm vía módulos reutilizables.

## Stack
- Python 3.10+, 4 espacios de indentación
- MongoDB vía `self.cr` (colección `form_answer`)
- CouchDB vía `self.lkf_api.couch`
- `linkaform_api` — librería base

## Reglas fundamentales (nunca romper)
1. **IDs de campos**: siempre `self.f['campo']` o `self.mf['campo']`, nunca ObjectIds crudos
2. **Herencia**: siempre desde `lkf_addons.addons.base.app.Base`, nunca desde `LKF_Base` directamente
3. **Errores**: `self.LKFException({'msg': '...', 'status_code': 400})`, nunca `return {'error': ...}`
4. **MongoDB soft-delete**: todo `find()`/`$match` debe incluir `'deleted_at': {'$exists': False}`

## MCP server disponible: `lkf-knowledge`
Código en `lkf-claude/mcp/`, conocimiento en `lkf-claude/knowledge/`. Consultable con:
- `lkf_search(query)` — buscar patrones por término
- `lkf_get(name)` — obtener patrón completo
- `lkf_list()` — ver todo el conocimiento disponible
- `lkf_add(name, category, content)` — agregar nuevo aprendizaje
- `lkf_validate(code)` — verificar código contra convenciones

## Skills disponibles
- `/lkf` — referencia completa del SDK + activar modo linkaform
- `/lkf-module <nombre>` — scaffolding de módulo nuevo
- `/lkf-learn` — capturar y guardar un nuevo patrón
- `/lkf-review` — revisar código contra convenciones del SDK
- `/clave10-account-scripts-sync` — sync de scripts de módulos por cuenta de cliente (batch), incluye alta/refresco controlado de `accounts.json`
- `/clave10-prod-update` — actualiza el contenedor Docker de producción de una o varias cuentas (`./lkf update prod <id>`)

## Estructura
```
lkf_addons/addons/
  base/          ← Clase Base (todos heredan de aquí)
  _template/     ← Plantilla para módulos nuevos
  <modulo>/
    app.py
    model.py     ← (si existe) queries y lógica de negocio
    items/scripts|forms|catalogs|reports/
```
