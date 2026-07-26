---
name: lkf-module
description: Scaffolding de un módulo nuevo del LinkaForm SDK con la estructura correcta. Usar cuando el usuario pida crear/scaffoldear un módulo nuevo de linkaform_sdk / lkf_addons.
---

Crea un nuevo módulo de LinkaForm SDK con la estructura correcta.

**Nombre del módulo**: $ARGUMENTS

Sigue estos pasos:

1. Consulta `lkf_get("new_module_checklist")` para el checklist completo
2. Consulta `lkf_get("new_module_template")` para ver el ejemplo completo
3. Consulta `lkf_get("naming")` para las convenciones de nomenclatura

Luego crea:
- `lkf_addons/addons/<nombre>/` con `__init__.py` vacío
- `lkf_addons/addons/<nombre>/app.py` con la clase en PascalCase
- `lkf_addons/addons/<nombre>/items/scripts/__init__.py`
- `lkf_addons/addons/<nombre>/items/forms/__init__.py`
- `lkf_addons/addons/<nombre>/items/catalogs/__init__.py`
- `lkf_addons/addons/<nombre>/items/reports/__init__.py`

En `app.py` deja comentarios `# TODO` donde se necesiten los ObjectIds reales.

Al terminar, muestra el checklist de `new_module_checklist` marcando lo que completaste.
