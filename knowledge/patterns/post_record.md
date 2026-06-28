# Post Record

> Crear un nuevo registro en LinkaForm vía lkf_api

## Patrón estándar

```python
metadata = self.lkf_api.get_metadata(form_id=self.MI_FORM)
metadata.update({
    'properties': {
        'device_properties': {
            'System': 'Addons',
            'Process': 'Nombre del proceso',
            'Action': 'nombre_accion',
        }
    },
    'answers': {
        self.f['campo_texto']:  'valor',
        self.f['campo_numero']: 123,
        self.f['campo_fecha']:  '2024-01-15',
        self.f['campo_bool']:   True,
    }
})
response = self.lkf_api.post_forms_answers(metadata)
```

## Verificar resultado

```python
if response.get('status') in (200, 201):
    record_id = response['json']['id']
else:
    self.LKFException({
        'msg': f"Error creando registro: {response.get('json')}",
        'status_code': 400,
    })
```

## Con subforms (grupos repetibles)

```python
metadata['answers'][self.f['tabla_detalle']] = [
    {
        self.f['producto']:  'A',
        self.f['cantidad']:  10,
    },
    {
        self.f['producto']:  'B',
        self.f['cantidad']:  5,
    },
]
```

## Notas
- `get_metadata(form_id=...)` obtiene la estructura base del form (necesaria para el post)
- `device_properties` identifica al proceso en los logs de LinkaForm
- El ID del nuevo registro vive en `response['json']['id']`
