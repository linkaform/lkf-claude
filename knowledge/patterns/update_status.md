# Update Status

> Actualizar el campo de status/estado de un registro

## En el registro actual

```python
# Actualiza self.f['field_id_status'] en self.current_record
self.update_status_record('procesando')
self.update_status_record('completado', msg_comentarios='Todo procesado correctamente')
self.update_status_record('error', msg_comentarios='Falló la validación de campos')
```

## En registros externos (por record_ids)

```python
self.update_status_record(
    'aprobado',
    record_ids=['abc123', 'def456'],
    form_id=self.MI_FORM,
    msg_comentarios='Aprobado automáticamente',
)
```

## Cómo funciona internamente

`update_status_record` hace un patch de:
- `self.f['field_id_status']` → el valor de status
- `self.f['field_id_comentarios']` → el mensaje (si se pasa `msg_comentarios`)

## Convención de valores de status

Depende de cada módulo, pero la convención es usar strings en español o inglés consistentes:
- `'pendiente'`, `'procesando'`, `'completado'`, `'error'`
- `'aprobado'`, `'rechazado'`, `'cancelado'`

Define los posibles valores como constantes de clase si hay más de 3:

```python
class MiModulo(Base):
    STATUS_PENDIENTE  = 'pendiente'
    STATUS_PROCESANDO = 'procesando'
    STATUS_COMPLETADO = 'completado'
    STATUS_ERROR      = 'error'
```
