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
