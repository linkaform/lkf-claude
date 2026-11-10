# Inheritance Patterns

> Cómo estructurar la herencia entre módulos del SDK

## Regla

En un módulo con `model.py` y `app.py`:

- `model.py` hereda **solo** de `Base`.
- `app.py` hereda **solo** de `model.py`.
- Cuando necesitas algo de otro módulo, **no se hereda**: se carga con `self.load(...)` y el
  objeto queda en `self.<Modulo>`.

## Estructura del módulo (lo más común)

```python
# model.py
from lkf_addons.addons.base.app import Base

class MiModuloModel(Base):
    def __init__(self, settings, folio_solicitud=None, sys_argv=None, use_api=False, **kwargs):
        super().__init__(settings, sys_argv=sys_argv, use_api=use_api, **kwargs)
```

```python
# app.py
from .model import MiModuloModel

class MiModulo(MiModuloModel):
    def __init__(self, settings, folio_solicitud=None, sys_argv=None, use_api=False, **kwargs):
        super().__init__(settings, sys_argv=sys_argv, use_api=use_api, **kwargs)
```

## Herencia de otro módulo: formato anterior, no usar en módulos nuevos

```python
from lkf_addons.addons.employee.app import Employee

class HRModule(Employee):   # formato anterior
    def __init__(self, settings, **kwargs):
        super().__init__(settings, **kwargs)
```

Es el formato viejo (herencia múltiple tipo `class AccesosModel(Employee, Location, Vehiculo,
Base)`). Sigue existiendo en módulos que no se han migrado, pero un módulo nuevo no lo usa:
trae todos los atributos y métodos del otro módulo planos sobre `self`, mezcla sus
`__init__` y puede abrir efectos secundarios que no pediste. Por ejemplo, heredar de
`Oracle` abre una conexión a Oracle en cada ejecución, incluso en scripts que no la usan.
Si lo necesitas, usa `self.load()`.

## Carga dinámica con self.load() (dependencia lateral)

```python
from lkf_addons.addons.base.app import Base

class Expenses(Base):
    def __init__(self, settings, **kwargs):
        super().__init__(settings, **kwargs)
        # Carga Employee como dependencia, no hereda de él
        self.load('Employee', **self.kwargs)
        # self.Employee disponible desde aquí
```

**Cuándo usar**: siempre que el módulo necesite algo de otro módulo, sea o no "un tipo de" ese
módulo. `self.load()` importa `lkf_addons.addons.<modulo>.app` e instancia la clase con los
mismos `settings`, `sys_argv` y `use_api`, y la deja en `self.<Modulo>`.

Carga solo lo que la lógica use: cada módulo cargado se instancia completo. Si solo se
necesita en algunos métodos, cárgalo dentro del método (con `hasattr` ya evita duplicar la carga).
Agrega el módulo cargado a `depends` en el `__init__.py` del paquete.

## Múltiples dependencias

```python
class ComplexModule(Base):
    def __init__(self, settings, **kwargs):
        super().__init__(settings, **kwargs)
        self.load('Employee', **self.kwargs)
        self.load('Product', module_class='Warehouse', import_as='WH', **self.kwargs)
        # self.Employee y self.WH disponibles
```

## Regla de decisión

```
¿Necesito algo de otro módulo?            → self.load()
¿Dependencia circular potencial?          → self.load() siempre
¿Es el modelo (model.py) o la app?        → model.py hereda de Base; app.py de model.py
¿Quiero heredar de otro módulo?           → No. self.load()
```

## Gotcha: el repo legacy (`linkaform/addons`) todavía usa herencia múltiple

El SDK está migrando de herencia múltiple a `self.load()` (composición), pero no todos los
repos están en el mismo punto de esa migración:

- **`linkaform/addons`** (legacy, sigue activo en producción): módulos como Accesos usan
  `class AccesosModel(Employee, Location, Vehiculo, Base)` — herencia múltiple real. Los
  atributos/métodos de Employee/Location/Vehiculo quedan **planos** sobre `self`
  (`self.CONF_AREA_EMPLEADOS_CAT_OBJ_ID`, `self.get_areas_by_location(...)`).
- **`lkf-sanic-apps`** (rewrite sobre Sanic): el mismo módulo usa composición real
  (`self.load(module='Employee', **self.kwargs)` en `__init__`), así que esos mismos
  atributos/métodos viven en `self.Employee.CONF_AREA_EMPLEADOS_CAT_OBJ_ID`,
  `self.Location.get_areas_by_location(...)`.

**Al portar código de un repo a otro, esta es la fuente #1 de bugs silenciosos**
(`AttributeError` en producción, o peor, un atributo que "existe" pero es otra cosa).
No asumas que un `self.X` se traduce igual en todos lados — verifícalo:

```bash
# ¿A qué módulo pertenece X? Busca dónde se ASIGNA (no dónde se usa) en cada
# módulo cargado por composición (Employee, Location, Activo_Fijo/Vehiculo, etc.)
grep -n "self\.X\s*=" addons/employee/app.py addons/location/app.py addons/activo_fijo/app.py

# Si aparece ahí y NO aparece asignado también en el propio module.py del módulo
# que lo usa → necesita traducción a self.Employee.X / self.Location.X / self.AF.X
```

**Sub-gotcha**: algunos atributos están **duplicados a propósito** — definidos tanto en el
módulo cargado (p.ej. Location) como localmente en el módulo que lo usa (p.ej. Accesos
también hace `self.AREAS_DE_LAS_UBICACIONES_CAT = self.lkm.catalog_id(...)` en su propio
`models.py`). En esos casos el acceso plano `self.AREAS_DE_LAS_UBICACIONES_CAT_ID` SÍ
funciona sin traducir — no lo cambies a `self.Location.X` solo por consistencia, primero
confirma si existe la copia local antes de "corregirlo".

**Constantes de `Base` nunca necesitan traducción** (`self.ESTADO_ID`, `self.USUARIOS_ID`,
`self.ESTADO_OBJ_ID`, etc.) — `Base` se hereda directo en ambos repos, nunca por composición.
