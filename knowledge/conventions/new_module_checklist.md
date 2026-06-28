# New Module Checklist

> Checklist para crear un módulo nuevo en el SDK de LinkaForm

## Estructura de archivos

```
lkf_addons/addons/mi_modulo/
  __init__.py              ← vacío
  app.py                   ← clase principal
  items/
    scripts/
      __init__.py
    forms/
      __init__.py
    catalogs/
      __init__.py
    reports/
      __init__.py
```

## Checklist de implementación

- [ ] Copiar `_template/` como base: `cp -r lkf_addons/addons/_template/ lkf_addons/addons/mi_modulo/`
- [ ] Crear `__init__.py` vacío en la raíz del módulo
- [ ] En `app.py`:
  - [ ] Nombrar la clase en PascalCase heredando de `Base`
  - [ ] Llamar `super().__init__()` como primer statement del `__init__`
  - [ ] Registrar forms con `self.lkm.form_id()`
  - [ ] Registrar catálogos con `self.lkm.catalog_id()` (3 vars cada uno)
  - [ ] Mapear todos los campos en `self.f.update({...})`
  - [ ] Setear `self.name = __class__.__name__`
- [ ] Agregar `__init__.py` en cada subcarpeta de `items/`
- [ ] Agregar el módulo a `CLAUDE.md` → tabla de módulos disponibles

## Template de app.py

```python
from lkf_addons.addons.base.app import Base


class MiModulo(Base):

    def __init__(self, settings, folio_solicitud=None, sys_argv=None, use_api=False, **kwargs):
        super().__init__(settings, sys_argv=sys_argv, use_api=use_api, **kwargs)
        self.name = __class__.__name__
        self.settings = settings

        # Forms
        self.MI_FORM = self.lkm.form_id('nombre_del_form', 'id')

        # Catálogos (siempre los 3 atributos)
        self.MI_CAT        = self.lkm.catalog_id('nombre_catalogo')
        self.MI_CAT_ID     = self.MI_CAT.get('id')
        self.MI_CAT_OBJ_ID = self.MI_CAT.get('obj_id')

        # Campos
        self.f.update({
            'campo_uno': 'OBJECTID_24_CHARS_AQUI',
            'campo_dos': 'OBJECTID_24_CHARS_AQUI',
        })
```
