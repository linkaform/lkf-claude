# CF-03 · Configuración · Sesiones

> Ficha de diseño de la tarea CF-03 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** sesiones en tabla y calendario, editor con recurrencia, temario,
recursos, exámenes y requerimientos que otorga.
**Tipo:** full-stack · **Depende de:** F0-14 (vigencia/recurrencia).

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
**Configuraciones → Sesiones** (alternar vista Tabla / Calendario).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Menú (Sesiones: Cursos, Capacitaciones, Pláticas, Inducciones, Webinar) | 4891 | `openEcfg` |
| Tabla de sesiones | 1881–1896 | `{{ ecIsSes }}`, `{{ ssnIsTable }}`, `{{ ssnRows }}` |
| Calendario (Día/Semana/Mes, Sesiones y Asistencia) | 1897–1954 | `{{ ssnIsCal }}`, `{{ scalSubs }}` |
| Popover de evento del calendario | 1955–1971 | `{{ sevOn }}` |
| Panel de detalle (Generales, Temario, Recursos, Participantes) | 2111–2159 | `{{ ssnDetOpen }}` |
| Editor (Detalles, Temario, Recursos, Exámenes y requerimientos) | 2160–2262 | `{{ ssnEdOpen }}` |
| Modal nombre de sección/lección | 2263–2273 | `{{ ssnNmOpen }}` |
| Modal material | 2274–2289 | `{{ ssnMtOpen }}` |
| Lógica de sesiones | 7336–7639 | `ssnVals()` |
| Calendario | 7380–7500 | `scal*`, `sev*` |
| Datos semilla y temarios | 4826–4834 | `SSN_SEED`, `SSN_TEM`, `SSN_AREAS` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Tabla**
- Columnas: Acciones (ver, editar), sesión, descripción, fecha y duración,
  modalidad, tipo de sesión, estatus y participantes (inscritos/cupo con barra).
- Tipos: Curso, Capacitación, Plática, Inducción. Modalidad se deduce:
  Presencial (lugar), Virtual (enlace), Híbrida (ambos). Estatus se calcula
  por fecha: Programada, En curso, Finalizada, Cancelada.
- Orden: en curso, programadas, luego el resto. Filtros con contador: Tipo,
  Modalidad, Estatus. Búsqueda, paginación y estados vacíos.

**Calendario**
- Día / Semana / Mes con "Hoy", flechas y selector de periodo; leyenda por
  tipo que filtra. Arrastrar sobre un hueco horario abre "Nueva sesión". Clic
  en un evento abre el popover (editar, eliminar, participantes con resumen
  de asistencia). Subvista "Asistencia" (matriz empleado × día) en CF-04.

**Editor** (Programar nueva sesión / Editar sesión)
- Detalles: nombre, fecha y hora de inicio y fin (o "Todo el día"; admite
  varios días), repetición (no se repite o vigencia personalizada: días,
  semanas, meses, cada N, termina nunca / el día / después de N), tipo,
  lugar (busca ubicación o área) y/o enlace de la reunión (al menos uno),
  instructor (etiqueta cambia: Docente, Instructor, Ponente, Facilitador),
  cupo (vacío = sin límite), descripción.
- Temario (solo Curso): secciones, lecciones con minutos y materiales
  (Video, Lectura, Presentación, Cuestionario, Clase en vivo; archivo o
  enlace). Obligatoria al menos una sección con lección y nombres.
- Recursos (Capacitación, Plática, Inducción): materiales de apoyo.
- Exámenes y requerimientos (Curso, Capacitación, Inducción): **Exámenes**
  (requerimientos tipo Examen, ámbito Persona) que se aplican al terminar, y
  **Requerimientos que otorga** (tipo Documento, ámbito Persona, p. ej. DC-3)
  que cumple quien acredite.
- Guardar: "Programar Sesión" / "Guardar Cambios".

**Detalle**: líneas de fecha, lugar, enlace, instructor, cupo, exámenes y
requerimientos que otorga; pestañas Temario (con "Agregar Sección/Lección/
Material"), Recursos y Participantes (CF-04). Cancelar (solo Programada) y
eliminar piden confirmación y avisan a los inscritos.

## Qué reusa (no rehacer)

- Tabla, modales, toast: F0-05 · Filtros: F0-06 · Panel lateral: F0-07
- Selector de vigencia / recurrencia: F0-14 · Modal de selección: F0-15
- Requerimientos tipo Examen y Documento: CF-01

## Fuera de esta tarea

- Participantes, asistencia, examen y cancelar con avisos: CF-04.
- Pestaña Sesiones del detalle de empleado: ME-04.
- No está en el diseño: tipo Webinar (aparece en el menú pero el editor solo
  ofrece 4 tipos); cómo se otorgan automáticamente los requerimientos al
  aprobar.
