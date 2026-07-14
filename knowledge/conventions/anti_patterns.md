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

## 7. Pisar un atributo compartido con un nombre genérico

```python
# MAL — self.PAQUETERIA ya es el form_id de "paqueteria" en el módulo,
# usado en varios métodos. Un __init__ posterior lo sobreescribe con un script_id:
self.PAQUETERIA = self.lkm.script_id('paqueteria', 'id')

# BIEN — nombre que no colisiona
self.SCRIPT_PAQUETERIA = self.lkm.script_id('paqueteria', 'id')
```

**Por qué**: en el repo legacy esto "funcionaba" porque cada script (`menus.py`, etc.) era
una instancia de un solo uso — pisar `self.PAQUETERIA` ahí no afectaba a nadie más. En
`lkf-sanic-apps` el objeto `service` del módulo es un **singleton** compartido por todas
las rutas durante toda la vida del proceso: pisar un atributo en `__init__` rompe
silenciosamente cualquier otro método que ya dependía de ese nombre. Antes de copiar una
asignación de un script legacy al `models.py`/`service.py` compartido, grep el nombre
completo en el archivo destino para confirmar que no está en uso con otro significado.

## 8. Pedir `create=True` en una colección que puede ya existir

```python
# MAL — truena con NamespaceExists si la colección ya existe
self.cr_cache = self.net.get_collections(collection='mi_cache', create=True)

# BIEN (ya corregido en linkaform_api/network.py:get_collections) — solo
# manda create=True si la colección todavía no existe
if create and collection in database['db'].list_collection_names():
    create = False
```

**Por qué**: `create=True` hace que pymongo mande el comando admin `create` explícito
(no es "crear si no existe" — MongoDB lo rechaza con `NamespaceExists` si la colección
ya está). Este bug tronaba el arranque completo de `lkf-sanic-apps` en cualquier
ambiente donde la colección ya se hubiera creado una vez.

## 9. Leer `self.user.get('id')` en vez de `self.user.get('user_id')`

```python
# MAL — 'id' solo existe si el decorador @reload_user ya corrió antes
user_id = self.user.get('id')

# BIEN — 'user_id' es la llave real que pone linkaform_api al decodificar el JWT
user_id = self.user.get('user_id')
```

**Por qué**: `self.user` se llena inicialmente vía `decode_jwt()` (en
`linkaform_api`), que solo pone `username`, `parent_id`, `user_id`, `exp`,
`timezone` — **nunca** una llave `'id'`. Esa llave `'id'` solo aparece si el
método pasó por el decorador `@reload_user` (`addons/base/tools.py`), que
hace `user_data['id'] = user_data.get('user_id')` explícitamente. Como
`@reload_user` solo está aplicado a un puñado de métodos, cualquier otro
método que use `self.user.get('id')` directamente obtiene `None` — sin
excepción, sin log — y cualquier `match_query` que dependa de ese `user_id`
termina filtrando por `None` (matchea registros con el campo vacío/inexistente
en vez del usuario real).

**Cómo se manifiesta**: resultados completamente distintos a los esperados
(no solo campos faltantes) — porque la query SÍ regresa datos, solo que de
la persona equivocada (o de cualquier registro con el campo sin configurar).

**Grep de verificación** antes de portar un método que usa `self.user`:
```bash
grep -n "self\.user\.get(" addons/*/*.py
```
Si ves `.get('id')` fuera de un método decorado con `@reload_user`, es
sospechoso — casi siempre debería ser `.get('user_id')`.
