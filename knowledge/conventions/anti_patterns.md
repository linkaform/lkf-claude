# Anti-patterns

> Lo que NO se debe hacer en el LinkaForm SDK

## 1. Hardcodear ObjectIds

```python
# MAL
answers = {'60a1b2c3d4e5f6a7b8c9d0e1': 'valor'}

# BIEN
answers = {self.f['nombre_campo']: 'valor'}
```

**Por qué**: Los IDs cambian entre ambientes (dev/prod) y entre cuentas. El código falla silenciosamente.

## 2. Importar LKF_Base directamente

```python
# MAL
from linkaform_api.base import LKF_Base
class MiModulo(LKF_Base): ...

# BIEN
from lkf_addons.addons.base.app import Base
class MiModulo(Base): ...
```

**Por qué**: `Base` agrega catálogos, métodos y contexto que `LKF_Base` no tiene.

## 3. Omitir el filtro de soft-delete

```python
# MAL — incluye registros borrados
self.cr.find({'form_id': self.MI_FORM})

# BIEN
self.cr.find({'form_id': self.MI_FORM, 'deleted_at': {'$exists': False}})
```

**Por qué**: LinkaForm usa soft-delete. Los registros "borrados" siguen en la colección.

## 4. Retornar dicts de error

```python
# MAL
def validar(self):
    if error:
        return {'error': 'Algo salió mal', 'status': 400}

# BIEN
def validar(self):
    if error:
        self.LKFException({'msg': 'Algo salió mal', 'status_code': 400})
```

**Por qué**: `LKFException` detiene el flujo correctamente y es capturado por el framework.

## 5. Modificar self.f antes de super().__init__()

```python
# MAL
class MiModulo(Base):
    def __init__(self, settings, **kwargs):
        self.f.update({'campo': '...'})   # self.f no existe todavía
        super().__init__(settings, **kwargs)

# BIEN
class MiModulo(Base):
    def __init__(self, settings, **kwargs):
        super().__init__(settings, **kwargs)
        self.f.update({'campo': '...'})   # ahora self.f ya existe
```

## 6. Omitir los 3 atributos de catálogo

```python
# MAL — solo el dict
self.MI_CAT = self.lkm.catalog_id('nombre')

# BIEN — los 3 siempre
self.MI_CAT        = self.lkm.catalog_id('nombre')
self.MI_CAT_ID     = self.MI_CAT.get('id')
self.MI_CAT_OBJ_ID = self.MI_CAT.get('obj_id')
```

**Por qué**: Diferentes operaciones necesitan el ID numérico vs el ObjectId.
