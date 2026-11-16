# CF-04 · Configuración · Sesiones · Participantes

> Ficha de diseño de la tarea CF-04 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** participantes de una sesión (inscribir empleados), asistencia,
examen y resultado; cancelar sesión.
**Tipo:** full-stack · **Depende de:** CF-03.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
**Configuraciones → Sesiones**, abrir una sesión (ojo) y pestaña
**Participantes**.

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Pestaña Participantes (KPI, filtros, buscador, tabla, paginación) | 2142–2159 | `{{ ssnTPar }}`, `{{ ssnPRows }}` |
| Botón cancelar sesión en el encabezado del detalle | 2114 | `{{ ssnCanCancel }}`, `{{ ssnDCancel }}` |
| Modal "Inscribir empleados" | 2290–2302 | `{{ ssnInsOpen }}` |
| Asistencia en el calendario (empleado × día) | 1910–1953 | `{{ scalIsCu }}` |
| Lógica de participantes, asistencia y examen | 7504–7560 | `ssnVals()` |
| Cancelar y eliminar con aviso | 7362–7364 | `cancel`, `del` |
| Datos semilla de personas | 4830 | `SSN_POOL` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Lista de participantes**
- KPI: "N de cupo inscritos" y, si la sesión ya inició, "N asistieron" (o
  "% de asistencia" si dura varios días).
- Columnas: Acciones (ver empleado, quitar), empleado (iniciales, nombre,
  puesto), ubicación (centro), Asistencia y, solo si la sesión tiene examen,
  Examen.
- Asistencia sesión de un día: botones **Asistió / Faltó**, solo editables
  cuando la sesión está En curso o Finalizada; antes se muestra "Inscrito".
- Asistencia de varios días: % por empleado, "N de M días" y un punto por día
  (verde asistió, rojo faltó, gris pendiente) que se alterna con clic en los
  días ya transcurridos.
- Examen (cuando la sesión lo trae y el empleado asistió a una sesión
  Finalizada): calificación y chip **Aprobado / No aprobado** (aprueba con 80
  o más); sin resultado muestra "---".
- Filtros con contador, búsqueda "Buscar participante", paginación 10/25/50,
  estados vacíos ("Aún no hay participantes inscritos").

**Inscribir empleados** (solo si la sesión está Programada o En curso)
- Modal con buscador por nombre, puesto o centro, lista con casillas y "N
  seleccionados"; excluye a los ya inscritos ("Todos los empleados ya están
  inscritos").
- Con cupo muestra "Quedan N lugares disponibles" y no deja pasar del cupo. El
  botón del panel se deshabilita con "Se alcanzó el cupo de la sesión".
- Al guardar resalta las filas nuevas y avisa por toast.

**Quitar participante**: solo en sesión Programada; confirma y notifica al
empleado que ya no está inscrito.

**Cancelar sesión**: solo si está Programada; confirmación "¿Cancelar
sesión?" que avisa a los N inscritos; la sesión queda Cancelada. Eliminar una
sesión Programada también notifica a los inscritos.

**Calendario, subvista Asistencia**: matriz empleado × día del periodo con
% de asistencia, leyenda filtrable por estado y bloque "Sin registro de
ingreso" por día.

## Qué reusa (no rehacer)

- Tabla y modales, toast: F0-05 · Filtros: F0-06 · Panel lateral: F0-07
- Modal de selección para ligar (inscribir): F0-15 · Lista y editor de
  sesiones: CF-03

## Fuera de esta tarea

- Sesiones de un empleado (pestaña del detalle de empleado): ME-04.
- Notificar por correo o portal: solo se menciona en textos; el diseño no
  define el contenido del aviso.
- No está en el diseño: capturar la calificación del examen (el diseño la
  calcula con datos de ejemplo) ni cómo se otorga el requerimiento al aprobar;
  confirmar el origen real de "Sin registro de ingreso".
