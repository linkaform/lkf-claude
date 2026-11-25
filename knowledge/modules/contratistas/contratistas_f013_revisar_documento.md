# F0-13 · Componente · Revisar documento

> Ficha de diseño de la tarea F0-13 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** modal para aprobar o rechazar un documento (comentario obligatorio
al rechazar), con versiones y comentarios.
**Tipo:** front · **Depende de:** F0-07 (panel de detalle). Lo consumen ME-06,
ME-07, ME-11 y MX-01.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. El modal está copiado tres
veces, con variables distintas y el mismo diseño:

| Pantalla | Cómo llegar | Modal (líneas) | Variable | Lógica |
| --- | --- | --- | --- | --- |
| Mi empresa → Documentos | abrir documento "Por revisar" → "Revisar Documento" (3790, 3822) | 3826–3838 | `{{ dcRvOpen }}` | 7927–7932, abre en 7898 |
| Detalle de contrato → Requerimientos | acción "revisar" de la fila (5675) | 3839–3851 | `{{ rqRvOpen }}` | 5652 |
| Cumplimiento de contratistas / de contratista | popover de celda → revisar (5933, 6244, 6262) | 2914–2921 | `{{ ccRvOpen }}` | 5814–5818, 5887–5890 |

Versiones y comentarios viven en el panel de documento (3779–3825):
pestañas Generales / Versiones (`dcPTabs`, 7919), comentarios `dcPComs`,
versiones `dcPVers` (7922), "Subir Nueva Versión" `dcPNewVer` (7923–7924).
`dcRvTabs` (Aprobar/Rechazar, 7928) quedó en la lógica sin uso en el template.

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

- Modal 520 px "Revisar documento": enlace al archivo (abre el PDF en
  pestaña nueva), **Propietario** y **Mapeo** (en cumplimiento: **Contratista**
  y **Subido por**), caja **Comentarios** y botones Cancelar / Rechazar /
  Aprobar.
- **Aprobar:** el comentario es opcional. Pasa a Aceptado, agrega el
  comentario si lo hay y muestra el toast "Se aprobó el documento".
- **Rechazar:** comentario obligatorio. Vacío marca el borde en rojo y
  muestra "Escribe un comentario para rechazar el documento." Con texto pasa
  a Rechazado, guarda el comentario y toast "Se rechazó el documento".
- Texto de ayuda: "El comentario se agrega al documento y se notifica a quien
  lo subió" (en cumplimiento, "al contratista").
- Solo se puede revisar un documento en estatus **Por revisar**; en la
  lista y en el panel el botón no aparece en otro estatus.
- **Versiones:** lista de versiones (v1, v2…) con archivo, estatus, quién,
  cuándo, tipo y peso, la actual marcada "Actual" y el motivo de rechazo de
  versiones previas. "Subir Nueva Versión" crea una versión Por revisar y
  avisa "Liga los contratos cuando la apruebes."
- **Comentarios:** hilo con iniciales, autor y hora; "Sin comentarios" si
  está vacío.

## Qué reusa (no rehacer)

- Modal, botones, toast: F0-05 · Panel lateral con tabs: F0-07
- Subir versión nueva (reemplazar): F0-10

## Fuera de esta tarea

- Notificar al que subió (correo/aviso): no hay diseño de la notificación.
- Aprobación por varios clientes ("2 de 3 aprobaron"): MX-02.
- Lista de documentos y filtros: ME-06 · Matrices de cumplimiento: MX-01.
