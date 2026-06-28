# Load Module

> Cargar dinámicamente otro módulo del SDK dentro de un módulo

## Carga básica

```python
# Carga el módulo 'Product' y lo deja accesible como self.Product
self.load(module='Product', **self.kwargs)

# Uso posterior:
producto = self.Product.get_product(sku='ABC')
```

## Carga con alias

```python
# Carga la clase Warehouse del módulo Product como self.WH
self.load(module='Product', module_class='Warehouse', import_as='WH', **self.kwargs)

self.WH.get_warehouse(code='ALM-01')
```

## Cuándo usar self.load() vs herencia directa

| Situación | Usar |
|---|---|
| Siempre necesitas el módulo | Herencia directa (`class Expenses(Base)` + instanciar Employee en `__init__`) |
| Solo en algunos métodos | `self.load()` dentro del método |
| Dependencia circular potencial | `self.load()` lazy |

## En __init__ (carga siempre disponible)

```python
class MiModulo(Base):
    def __init__(self, settings, **kwargs):
        super().__init__(settings, **kwargs)
        self.load('Employee', **self.kwargs)   # self.Employee disponible siempre
```

## Notas
- `self.kwargs` debe pasarse para que el módulo cargado tenga el mismo contexto (account, user, etc.)
- El módulo cargado hereda el mismo `settings` y credenciales
- No abuses de `self.load()` en loops — es costoso; carga una vez en `__init__`
