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

## Cuándo cargar el módulo

Un módulo nunca hereda de otro: `model.py` hereda solo de `Base` y `app.py` solo de `model.py`
(ver `conventions/inheritance.md`). Lo único que cambia es dónde haces el `self.load()`:

| Situación | Dónde cargar |
|---|---|
| Siempre necesitas el módulo | `self.load()` en el `__init__` |
| Solo en algunos métodos | `self.load()` dentro del método |
| Dependencia circular potencial | `self.load()` dentro del método (lazy) |
| No lo usa ninguna lógica | No lo cargues |

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
- Cada módulo cargado se instancia completo la primera vez (puede abrir conexiones, como `Oracle`,
  o consultar IDs de formas). Carga solo lo que la lógica use
- Llamar `self.load()` otra vez con el mismo `import_as` no re-instancia: si `self.<Modulo>` ya existe, no hace nada
- Agrega el módulo cargado a `depends` en el `__init__.py` del paquete
