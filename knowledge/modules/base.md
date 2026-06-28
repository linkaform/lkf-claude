# Base Module

> Clase Base principal — todos los módulos del SDK heredan de aquí

## Cadena de herencia completa

```
linkaform_api.base.LKF_Base
    └── lkf_addons.addons.base.app.Base
            └── MiModulo (app.py del módulo)
```

**Nunca** heredar de `LKF_Base` directamente en módulos de negocio.

## Variables disponibles en self (heredadas)

| Variable | Tipo | Descripción |
|---|---|---|
| `self.cr` | pymongo.Collection | Colección MongoDB `form_answer` |
| `self.lkf_api` | utils.Cache | API LinkaForm (post, patch, get) |
| `self.lkm` | LKFModules | Resuelve IDs de forms y catálogos |
| `self.f` | dict | Mapeo `nombre_campo → ObjectId` |
| `self.mf` | dict | Mapeo campos de subforms/grupos |
| `self.answers` | dict | Respuestas del registro actual |
| `self.current_record` | dict | Registro completo en proceso |
| `self.record_id` | str | ID del registro actual |
| `self.account_id` | int | ID de la cuenta/tenant |
| `self.settings` | obj | Configuración del entorno |
| `self.kwargs` | dict | Kwargs del constructor |

## Catálogos base disponibles (ya en Base.__init__)

```python
self.CLIENTE_CAT, self.CLIENTE_CAT_ID, self.CLIENTE_CAT_OBJ_ID
self.COMPANY, self.COMPANY_ID, self.COMPANY_OBJ_ID
self.CONTACTO_CAT, self.CONTACTO_CAT_ID, self.CONTACTO_CAT_OBJ_ID
self.USUARIOS, self.USUARIOS_ID, self.USUARIOS_OBJ_ID
self.GROUP, self.GROUP_ID, self.GROUP_OBJ_ID
self.UOM, self.UOM_ID, self.UOM_OBJ_ID
self.ESTADO, self.ESTADO_ID, self.ESTADO_OBJ_ID
self.TIMEZONE, self.TIMEZONE_ID, self.TIMEZONE_OBJ_ID
```

## Métodos heredados clave

```python
self.update_status_record(status, record_ids=None, form_id=None, msg_comentarios='')
self.send_email_by_form(email_dict)
self.format_cr(cursor)           # cursor pymongo → lista de dicts
self._project_format(fields)     # construye $project para aggregate
self.get_couch_user_db(nombre)   # acceso a CouchDB
self.load(module, module_class=None, import_as=None, **kwargs)
self.LKFException(error_dict)    # lanza excepción del SDK
```

## Registrar forms y catálogos en __init__

```python
# Form
self.MI_FORM = self.lkm.form_id('nombre_del_form', 'id')

# Catálogo — siempre los 3 atributos
self.MI_CAT        = self.lkm.catalog_id('nombre_catalogo')
self.MI_CAT_ID     = self.MI_CAT.get('id')
self.MI_CAT_OBJ_ID = self.MI_CAT.get('obj_id')

# Campos — siempre vía self.f.update()
self.f.update({
    'mi_campo':   '60a1b2c3d4e5f6a7b8c9d0e1',
    'otro_campo': '60a1b2c3d4e5f6a7b8c9d0e2',
})
```
