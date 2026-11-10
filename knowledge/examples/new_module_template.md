# New Module Template

> Ejemplo completo y funcional de un módulo nuevo: "Proveedores"

Si un catálogo o una forma referencia a otro del mismo módulo (`{{ catalog.X.id }}`), la dependencia va en
`install_order` de `items/<tipo>/__init__.py` (por ejemplo `items/catalogs/__init__.py`:
`install_order = ['tipo_proveedor']`). Ver `conventions/new_module_checklist.md` → "Orden de instalación".

Se divide en dos archivos: `model.py` (IDs de forms, catálogos y campos; hereda **solo** de `Base`)
y `app.py` (lógica; hereda **solo** de `model.py`). Para usar otro módulo se usa `self.load()`,
no herencia. Ver `conventions/inheritance.md` y `conventions/new_module_checklist.md`.

## model.py

```python
from lkf_addons.addons.base.app import Base


class ProveedoresModel(Base):

    def __init__(self, settings, folio_solicitud=None, sys_argv=None, use_api=False, **kwargs):
        super().__init__(settings, sys_argv=sys_argv, use_api=use_api, **kwargs)
        self.name = __class__.__name__
        self.settings = settings

        # Forms
        self.PROVEEDOR_FORM    = self.lkm.form_id('proveedores', 'id')
        self.EVALUACION_FORM   = self.lkm.form_id('evaluacion_proveedor', 'id')

        # Catálogos
        self.TIPO_PROVEEDOR_CAT        = self.lkm.catalog_id('tipo_proveedor')
        self.TIPO_PROVEEDOR_CAT_ID     = self.TIPO_PROVEEDOR_CAT.get('id')
        self.TIPO_PROVEEDOR_CAT_OBJ_ID = self.TIPO_PROVEEDOR_CAT.get('obj_id')

        # Campos del form de proveedores
        self.f.update({
            'nombre':        '60a1b2c3d4e5f6a7b8c9d001',
            'rfc':           '60a1b2c3d4e5f6a7b8c9d002',
            'tipo':          '60a1b2c3d4e5f6a7b8c9d003',
            'estatus':       '60a1b2c3d4e5f6a7b8c9d004',
            'email':         '60a1b2c3d4e5f6a7b8c9d005',
            'telefono':      '60a1b2c3d4e5f6a7b8c9d006',
            'fecha_alta':    '60a1b2c3d4e5f6a7b8c9d007',
            'comentarios':   '60a1b2c3d4e5f6a7b8c9d008',
        })
```

## app.py

```python
from .model import ProveedoresModel


class Proveedores(ProveedoresModel):

    def __init__(self, settings, folio_solicitud=None, sys_argv=None, use_api=False, **kwargs):
        super().__init__(settings, sys_argv=sys_argv, use_api=use_api, **kwargs)
        # Otros módulos: self.load(module='Employee', **self.kwargs)  → self.Employee

    # ─── Queries ────────────────────────────────────────────────────────────

    def get_proveedor(self, rfc: str) -> dict:
        match_query = {
            'form_id':   self.PROVEEDOR_FORM,
            'deleted_at': {'$exists': False},
            f'answers.{self.f["rfc"]}': rfc,
        }
        pipeline = [
            {'$match': match_query},
            {'$limit': 1},
            {'$project': self._project_format({
                'nombre':   self.f['nombre'],
                'rfc':      self.f['rfc'],
                'tipo':     self.f['tipo'],
                'estatus':  self.f['estatus'],
            })},
        ]
        resultados = self.format_cr(self.cr.aggregate(pipeline))
        return resultados[0] if resultados else {}

    def get_proveedores_activos(self) -> list:
        match_query = {
            'form_id':   self.PROVEEDOR_FORM,
            'deleted_at': {'$exists': False},
            f'answers.{self.f["estatus"]}': 'activo',
        }
        pipeline = [
            {'$match': match_query},
            {'$project': self._project_format({
                'nombre':  self.f['nombre'],
                'rfc':     self.f['rfc'],
                'email':   self.f['email'],
            })},
        ]
        return self.format_cr(self.cr.aggregate(pipeline))

    # ─── Escritura ──────────────────────────────────────────────────────────

    def crear_proveedor(self, nombre: str, rfc: str, tipo: str, email: str) -> str:
        metadata = self.lkf_api.get_metadata(form_id=self.PROVEEDOR_FORM)
        metadata.update({
            'properties': {
                'device_properties': {
                    'System': 'Addons',
                    'Process': 'Proveedores',
                    'Action': 'crear_proveedor',
                }
            },
            'answers': {
                self.f['nombre']:     nombre,
                self.f['rfc']:        rfc,
                self.f['tipo']:       tipo,
                self.f['email']:      email,
                self.f['estatus']:    'activo',
            }
        })
        response = self.lkf_api.post_forms_answers(metadata)
        if response.get('status') not in (200, 201):
            self.LKFException({'msg': f"Error creando proveedor: {response}", 'status_code': 400})
        return response['json']['id']

    def desactivar_proveedor(self, record_id: str):
        record = self.lkf_api.get_record(record_id)['json']
        record['answers'].update({
            self.f['estatus']: 'inactivo',
        })
        self.lkf_api.patch_record(record, record_id)
```
