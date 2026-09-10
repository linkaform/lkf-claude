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
- `patch_record` modifica solo los campos pasados, no sobreescribe todo el registro — pero solo porque los ejemplos de arriba **ya te dan el dict `answers` completo en memoria** (`self.current_record` o `get_record()['json']`) y tú modificas ese dict in-place antes de mandarlo. La API recibe el registro entero.
- `patch_multi_record` aplica los mismos cambios a múltiples registros por folio
- Siempre usar `self.f['campo']` para los keys del dict de answers

## ⚠️ `self.net.patch_forms_answers` — API distinta, SÍ reemplaza `answers` completo

`self.net.patch_forms_answers(metadata)` (la "Actualización completa —
Tipo 2" de `addons/CLAUDE.md`) es una API distinta a `patch_record`/
`patch_multi_record` de arriba: **reemplaza el dict `answers` completo del
registro con el que le mandes** — no lo mergea campo por campo del lado del
servidor. Confirmado con pruebas directas (cuenta 10): un registro con
`anden_asignado` y `proveedor_cliente` ya guardados, al recibir un `answers`
que solo mencionaba `proveedor_cliente` (con valor nuevo), perdió
`anden_asignado` (quedó `None`) — sin error, `status_code` 200/201 normal.

**Regla**: si vas a hacer un update PARCIAL (no todos los campos posibles
del formulario) sobre un registro que ya tiene datos de una escritura
anterior, mergea manualmente antes de llamar `patch_forms_answers` —
igual que el patrón de "Patch por record_id" de arriba, pero explícito:

```python
registro_existente = self.lkf_api.get_record(record_id)['json']
merged_answers = {**registro_existente.get('answers', {}), **answers}
self.net.patch_forms_answers({..., 'answers': merged_answers})
```

Si la función siempre escribe TODOS los campos posibles del formulario, el
merge no es necesario — el riesgo es específico a updates parciales sobre
un registro con historial previo.
