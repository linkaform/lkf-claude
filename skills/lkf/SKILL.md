---
name: lkf
description: Activa el modo de desarrollo LinkaForm SDK — consulta el MCP server lkf-knowledge antes de escribir código y aplica las reglas fundamentales del SDK. Usar cuando el usuario quiera desarrollar, programar o trabajar con linkaform_sdk / lkf_addons.
---

Activa el modo de desarrollo LinkaForm SDK. A partir de ahora:

1. **Antes de escribir cualquier código**, consulta el MCP server `lkf-knowledge`:
   - `lkf_search("término")` para buscar patrones relevantes
   - `lkf_get("nombre_patron")` para obtener un patrón completo
   - `lkf_list()` para ver todo el conocimiento disponible

2. **Aplica siempre** estas reglas fundamentales:
   - IDs de campos: `self.f['campo']` o `self.mf['campo']`, nunca ObjectIds crudos
   - Herencia: siempre desde `Base` (`from lkf_addons.addons.base.app import Base`)
   - Errores: `self.LKFException({'msg': '...', 'status_code': 400})`, nunca `return {'error': ...}`
   - MongoDB: todo `find()`/`$match` incluye `'deleted_at': {'$exists': False}`
   - Catálogos: siempre los 3 atributos `_CAT`, `_CAT_ID`, `_CAT_OBJ_ID`

3. **Al revisar código**, usa `lkf_validate(código)` para detectar anti-patrones

4. **Al necesitar un patrón que no está en la knowledge base**, avisa al usuario para capturarlo con `/lkf-learn`

$ARGUMENTS
