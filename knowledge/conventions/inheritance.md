# Inheritance Patterns

> Cómo estructurar la herencia entre módulos del SDK

## Herencia simple (lo más común)

```python
from lkf_addons.addons.base.app import Base

class MiModulo(Base):
    def __init__(self, settings, **kwargs):
        super().__init__(settings, **kwargs)
```

## Herencia de otro módulo (cuando extiende funcionalidad)

```python
from lkf_addons.addons.employee.app import Employee

class HRModule(Employee):
    def __init__(self, settings, **kwargs):
        super().__init__(settings, **kwargs)
        # Ahora tiene todos los campos y métodos de Employee
        self.f.update({
            'campo_extra': 'OBJECTID...',
        })
```

**Cuándo usar**: cuando el nuevo módulo ES un tipo de otro módulo (HRModule ES un Employee).

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

**Cuándo usar**: cuando el módulo NECESITA otro módulo pero no ES ese módulo.

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
¿El nuevo módulo ES un subtipo del otro?  → Herencia directa
¿El nuevo módulo USA al otro?             → self.load()
¿Dependencia circular potencial?          → self.load() siempre
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
