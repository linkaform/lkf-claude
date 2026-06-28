# Send Email

> Enviar correos desde un módulo vía el form de email de LinkaForm

## Patrón estándar

```python
self.send_email_by_form({
    'email_from':    'sistema@linkaform.com',
    'email_to':      'destinatario@ejemplo.com',
    'titulo':        'Asunto del correo',
    'nombre':        'Nombre del destinatario',
    'mensaje':       '<p>Cuerpo del correo en <strong>HTML</strong></p>',
    'enviado_desde': 'NombreModulo',
})
```

## Múltiples destinatarios

```python
self.send_email_by_form({
    'email_from': 'sistema@linkaform.com',
    'email_to':   'uno@ej.com,dos@ej.com',   # separados por coma
    'titulo':     'Notificación',
    'nombre':     'Equipo',
    'mensaje':    '<p>Mensaje</p>',
    'enviado_desde': 'MiModulo',
})
```

## Notas
- `send_email_by_form` usa un form interno de LinkaForm para el envío
- El campo `mensaje` acepta HTML completo
- `enviado_desde` aparece en los logs para identificar el origen del correo
