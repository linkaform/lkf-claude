# CouchDB

> Acceder a bases de datos CouchDB para catálogos y configuraciones

## Obtener la base de datos

```python
db = self.get_couch_user_db('nombre_base_datos')
```

## Operaciones básicas

```python
# Leer un documento por ID
doc = db.get('mi_doc_id')

# Guardar (crear o actualizar)
db.save({'_id': 'mi_doc', 'campo': 'valor'})

# Actualizar doc existente (requiere _rev)
doc = db.get('mi_doc_id')
doc['campo'] = 'nuevo_valor'
db.save(doc)

# Eliminar
doc = db.get('mi_doc_id')
db.delete(doc)
```

## Uso típico: catálogos de configuración

```python
def get_config(self, key: str):
    db = self.get_couch_user_db('lkf_config')
    doc = db.get(key)
    return doc.get('value') if doc else None

def set_config(self, key: str, value):
    db = self.get_couch_user_db('lkf_config')
    try:
        doc = db.get(key) or {'_id': key}
    except Exception:
        doc = {'_id': key}
    doc['value'] = value
    db.save(doc)
```

## Notas
- CouchDB es para configuraciones, catálogos y datos no-transaccionales
- Los registros de formularios viven en MongoDB (`self.cr`), no en CouchDB
- `self.lkf_api.couch` también da acceso directo al cliente CouchDB si necesitas más control
