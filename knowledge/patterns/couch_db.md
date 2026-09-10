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

## Nomenclatura de DBs por usuario

No hay un patrón único de nombre — depende de qué representa la DB.
Convenciones ya en uso en el ecosistema (no mezclarlas): `clave_{user_id}`
(sync offline de Clave10, un solo underscore, `user_id` numérico),
`user_inbox_{id}`, `catalog_records_{id}`, `account_properties_{id}`,
`client_{account_id}_catalog_model`.

## Crear una DB de usuario: dos caminos, NO son equivalentes

1. **Vía backend oficial** — `get_couch_user_db(db_name)` internamente llama
   `self.lkf_api.create_user_couch_db(user_id, db_name)` (endpoint del core
   de LinkaForm). Valida que el usuario exista y tenga **licencia activa**
   para el módulo antes de crear la DB. Este es el camino que debe usar
   cualquier flujo normal de la app.
2. **PUT directo a CouchDB (admin REST)** — sin pasar por el backend, sin
   ninguna validación. Solo como parche puntual documentado (ej. alta
   masiva desde un TSV para un batch de usuarios), nunca como práctica
   estándar — deja DBs "fantasma" fuera del control/registro de LinkaForm
   si se usa como flujo normal.

Si necesitas restringir quién puede leer/escribir una DB creada por la vía
directa, aplica `_security` explícito (patrón ya usado para
`account_properties_{id}`):

```python
db.security = {
    "admins":  {"names": ["linkaform"], "roles": []},
    "members": {"names": [username], "roles": [f"account_{user_id}"]},
}
```

## ⚠️ Parseo frágil de `db_name` en `db_type, user_id = db_name.split('_')`

Si en tu wrapper de `get_couch_user_db` derivas partes del nombre con
`.split('_')` esperando exactamente 2 tokens, un `db_name` con más de un
underscore (ej. `clave_test_10`) truena con
`ValueError: too many values to unpack`. Si necesitas extraer partes de un
nombre compuesto, usa `.split('_', 1)` o el separador explícito que
corresponda — no asumas que el nombre nunca tendrá underscores extra.
