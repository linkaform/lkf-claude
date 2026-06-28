# Patch Record

> Actualizar registros existentes en LinkaForm

## Patch del registro actual (en un trigger/script)

```python
self.current_record['answers'].update({
    self.f['campo']:       'nuevo_valor',
    self.f['campo_num']:   99,
})
response = self.lkf_api.patch_record(self.current_record, self.record_id)
```

## Patch por folio(s) — registro externo

```python
response = self.lkf_api.patch_multi_record(
    answers={
        self.f['campo']:     'valor',
        self.f['otro']:      123,
    },
    form_id=self.MI_FORM,
    folios=['FOLIO-001', 'FOLIO-002'],
)
```

## Patch por record_id — registro externo

```python
# Primero obtener el record completo
record = self.lkf_api.get_record(record_id)['json']
record['answers'].update({
    self.f['campo']: 'valor',
})
response = self.lkf_api.patch_record(record, record_id)
```

## Verificar resultado

```python
if response.get('status') in (200, 201):
    # ok
    pass
else:
    self.LKFException({'msg': f"Error en patch: {response}", 'status_code': 400})
```

## Notas
- `patch_record` modifica solo los campos pasados, no sobreescribe todo el registro
- `patch_multi_record` aplica los mismos cambios a múltiples registros por folio
- Siempre usar `self.f['campo']` para los keys del dict de answers
