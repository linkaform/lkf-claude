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
- `enviado_desde` aparece en los logs para identificar el origen del correo

## ⚠️ El motor de correo ESCAPA HTML en campos de texto libre

`send_email_by_form` internamente resuelve el form de envío vía
`self.ENVIO_DE_CORREOS` (`base/model.py`), que hace
`self.lkm.form_id('envio_de_correos', 'id')`. **Ese slug no siempre
resuelve** — en al menos una cuenta/módulo (transportistas/accesos, cuenta
30335/10) el formulario real se llama "Envío de Notificaciones" con slug
`envio_de_notificaciones`, y `envio_de_correos` regresa `{}` con un warning
silencioso ("Can not find id or info for item type: form..."). Antes de
asumir que `send_email_by_form` funciona en un módulo nuevo, confirma con
`get_form_fields` qué form_id resuelve `self.lkm.form_id('envio_de_correos', 'id')`
en esa cuenta — si falla, usa el atributo específico del módulo que sí
resuelve (ej. `self.ENVIO_DE_NOTIFICACIONES_FORM` en `accesos_utils.py`) y
llama `self.lkf_api.post_forms_answers` directo en vez del helper.

Independiente de qué form_id se use: **el motor de correo remoto (fuera de
este repo) escapa el HTML** cuando el valor sustituido en
`{{record.answers.<field_id>}}` viene de un campo tipo `textarea` de texto
libre (ej. un campo genérico "Mensaje"). Un HTML completo armado en Python y
mandado por ese campo llega como texto plano con las etiquetas visibles — no
hay ningún filtro `|safe`/`is_html` en el repo para evitarlo (el motor sí
soporta sintaxis tipo Django — `|floatformat:2`, `|length`, `{% if %}/{% for %}`
— pero no se ha confirmado si `|safe` funciona ahí).

**Patrón que sí funciona** para HTML rico: el **Cuerpo** de la acción de
email (configurado directo en la UI de LinkaForm, no en código) debe ser
HTML **fijo**, con placeholders `{{record.answers.<field_id>}}` que apunten
a campos **cortos** (texto, fecha, radio) del mismo registro — nunca a un
campo de mensaje libre. Para envío dinámico/multi-destinatario:

1. Agrega una página nueva a la forma de notificaciones con los campos
   cortos que necesita el diseño (ej. Estatus, Folio, Fechas) más un campo
   "Clase" (radio) si esa forma se comparte con otros tipos de notificación.
2. El diseño HTML se configura una sola vez en la UI de LinkaForm sobre esos
   campos cortos — no en el código del módulo.
3. El módulo crea **un registro nuevo por destinatario** (loop por cada
   correo separado por coma) con los valores reales mapeados a esos
   field-IDs — el campo "Mensaje" genérico, si sigue siendo obligatorio en
   la forma, se rellena con cualquier texto de relleno (ya no se usa en el
   diseño).
4. Valida el `status_code` de `post_forms_answers` explícitamente — un
   registro rechazado por LinkaForm (ej. "Answer N was rejected") puede
   regresar 200 igual si no se checa.
