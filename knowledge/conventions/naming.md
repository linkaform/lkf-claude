# Naming Conventions

> Convenciones de nomenclatura del LinkaForm SDK

## Tabla de referencia

| Elemento | Convención | Ejemplo |
|---|---|---|
| Clase módulo | PascalCase | `class MiModulo(Base)` |
| Form ID | SCREAMING_SNAKE | `self.MI_FORM` |
| Catálogo (3 vars) | SCREAMING_SNAKE + sufijo | `self.MI_CAT`, `self.MI_CAT_ID`, `self.MI_CAT_OBJ_ID` |
| Campos en `self.f` | snake_case | `self.f['nombre_campo']` |
| Campos en `self.mf` | snake_case | `self.mf['campo_subform']` |
| Métodos | snake_case | `def get_datos(self)` |
| Archivos de módulo | snake_case | `mi_modulo/app.py` |

## Sufijos de catálogo (siempre los 3)

```python
self.PROVEEDOR_CAT        = self.lkm.catalog_id('proveedor')   # dict completo
self.PROVEEDOR_CAT_ID     = self.PROVEEDOR_CAT.get('id')       # ID numérico
self.PROVEEDOR_CAT_OBJ_ID = self.PROVEEDOR_CAT.get('obj_id')   # ObjectId MongoDB
```

## Form IDs

```python
# Sin sufijo _ID — el form solo tiene un ID
self.SOLICITUD_FORM = self.lkm.form_id('solicitud_gastos', 'id')
```

## Constantes de módulo

Para valores fijos (status, tipos), usar constantes de clase en SCREAMING_SNAKE:

```python
class Expenses(Base):
    STATUS_PENDIENTE  = 'pendiente'
    STATUS_APROBADO   = 'aprobado'
    TIPO_VIATICOS     = 'viáticos'
    TIPO_COMBUSTIBLE  = 'combustible'
```
