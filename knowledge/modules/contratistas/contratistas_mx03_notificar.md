# MX-03 · Contratistas · Notificar incumplimientos

> Ficha de diseño de la tarea MX-03 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** notificar incumplimientos por fila y masivo: correo al
representante legal y aviso en su portal.
**Tipo:** full-stack · **Depende de:** MX-01, F0-15 (modal de notificar).

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
**Contratistas → Cumplimiento de contratista** (campana por fila, barra de
selección y popover de celda).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Campana en la fila de la matriz general | 2882 | `{{ r.notify }}`, `{{ r.noDis }}` |
| Insignia "Alerta enviada" | 2883 | `{{ r.sent }}` |
| Barra de selección: Notificar Incumplimientos | 2896 | `{{ ccNotifySel }}`, `{{ ccNSelDis }}` |
| Campana del encabezado y de la fila en vista por requerimiento | 2849, 2856, 2871 | `{{ ccRqNAll }}`, `{{ ccRqTipNGo }}` |
| Botón Notificar del popover de celda | 2910 | `{{ ccPopNotify }}` |
| Modal "Notificar incumplimiento" | 2921–2927 | `{{ ccNtfOpen }}` |
| Lógica: mensaje, destinatarios, envío | 5861–5863, 5891–5896 | `motivoOf`, `msgFor`, `openN`, `ntf` |
| Variante desde el detalle del contratista | 5819–5822 | `cmNtfVals()` |
| Cumplimiento de empleados (sin modal) | 3077–3078, 6163 | `r.notify`, `ecSent` (MX-04) |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

- **Por fila:** campana en la matriz; habilitada solo si el contratista tiene
  algún incumplimiento (rechazado, vencido o no entregado); si no, queda
  atenuada ("Sin incumplimientos"). Desde el popover o la vista por
  requerimiento notifica solo ese requerimiento.
- **Masivo:** con filas marcadas, "Notificar Incumplimientos" (se deshabilita
  si ninguna tiene incumplimientos y notifica solo a las que sí). En la
  vista por requerimiento, **Notificar Incumplidos (N)** cubre a todos los
  incumplidos del requerimiento.
- **Modal "Notificar incumplimiento":** descripción (uno: "Avisa al
  contratista qué obligaciones no cumplió en 2026"; varios: "Se enviará una
  alerta a N contratistas…"), **Destinatarios** (razón social, representante
  legal · correo, "N incumplimientos") y **Motivo** obligatorio ("Escribe el
  motivo") con texto precargado. Para uno: saludo al representante, lista de
  obligaciones y meses con su estatus; para varios: mensaje genérico.
- Aviso fijo: "Se enviará por correo al representante legal y aparecerá en el
  portal del contratista." Botones Cancelar / **Enviar Notificación**.
- Al enviar: toast ("Se envió la notificación" / "Se enviaron N
  notificaciones"), limpia la selección y marca la fila con **Alerta
  enviada**.
- Cumplimiento de empleados (MX-04) notifica directo, sin modal.

## Qué reusa (no rehacer)

- Modal de selección y de notificar: F0-15 · Modales y toast: F0-05
- Matriz y estados: MX-01 / F0-12 · Representante legal: ME-01 (contactos)

## Fuera de esta tarea

- El portal del contratista donde aparece el aviso: no está en el diseño
  (solo el texto que lo promete); definir antes de construir.
- No está en el diseño: plantilla del correo, historial de envíos, límites
  para no reenviar ("Alerta enviada" solo es una marca local de la sesión) ni
  el aviso desde Clientes (en espejo solo contratistas notifican).
- Avisos de vencimiento programados de un requerimiento: CF-01.
