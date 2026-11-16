# R-07 · Clientes / Contratistas · Incidentes/Fallas y Sanciones

> Ficha de diseño de la tarea R-07 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** Incidentes/Fallas y Sanciones: alta de sanción, estatus Abierto /
En proceso / Cerrado.
**Tipo:** full-stack · **Depende de:** R-05.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. **No hay una pantalla propia**
de Incidentes/Fallas ni de Nueva Sanción a nivel cliente/contratista. Lo que
existe son tres piezas sueltas:

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Entrada "Incidentes/Fallas" con acción "Nueva Sanción" y estatus Abierto / En proceso / Cerrado, en los menús Clientes y Contratistas | 4949, 4958, 4982, 4993 | `title`, `action`, `items` |
| Pintado de la acción del menú (solo texto, `href="#"`) | 110–113 | `{{ col.action }}` |
| Lista de incidencias y fallas **de un contrato** (Tipo, Prioridad, Estatus) | 2966–2992, 5676–5690 | `{{ ctoIsInc }}`, `tab === "ctoInc"` |
| Sanciones **de un empleado**: lista | 4101–4124 | `{{ edTSan }}` |
| Sanciones: detalle de la sanción | 4125–4148 | `{{ svOpen }}` |
| Sanciones: formulario "Levantar sanción" | 4149–4181 | `{{ snOpen }}` |
| Lógica del formulario y motivos | 7830–7867, 7831 | `snVals(e)`, `MOT` |
| Lógica de lista y detalle | 8231–8240 | `sanRows`, `svVals` |

Para verlas: Mi empresa → Empleados → abrir un empleado → pestaña
**Sanciones** (ME-05); y Contratos → Visualizar → **Incidencias & Fallas**
(ME-11).

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace (lo que sí está diseñado)

- **Menú**: bajo Clientes y Contratistas, el grupo "Incidentes/Fallas" lista
  Abierto, En proceso y Cerrado y la acción "Nueva Sanción". Ninguno navega:
  `ctrRoute` solo atiende Contratistas/Clientes, Contratos y Empleados.
- **Incidencias y fallas del contrato** (solo lectura, ME-11): Incidencia
  (folio `I-`) o Falla (`F-`), Prioridad Alta/Media/Baja y **Estatus Abierto /
  En proceso / Cerrado** (rojo, ámbar, verde), con filtros por los tres.
- **Sanción del empleado** (base de la "alta de sanción"): formulario
  "Levantar sanción" con Motivo* (Retardos, Falta injustificada, No portar
  EPP, Abandono de puesto, Incumplimiento de procedimiento, Conducta
  inapropiada, Otro con texto obligatorio), interruptor "Sin días de acceso"
  (1 a 8 días, "La Ley Federal del Trabajo permite una suspensión de hasta 8
  días") con fecha de inicio, y "Comentarios y evidencias" (hilo con fotos,
  video, documento y nota de voz).
- Lista de sanciones: Folio `#S-NNN`, Motivo, Fecha, Días sin acceso,
  Evidencias, Registró y **Estatus Vigente / Cumplida**; acciones Ver, Editar,
  Imprimir acta y Eliminar (confirma). Buscador y filtro por estatus.

## Huecos para resolver antes de construir

- **No está en el diseño**: la pantalla o pestaña de Incidentes/Fallas a nivel
  cliente/contratista (con su lista y filtros Abierto / En proceso / Cerrado),
  el formulario "Nueva Sanción" lanzado desde el menú, a quién se le pone la
  sanción (contratista, empleado del contratista o incidencia) y cómo se enlaza
  con una incidencia o falla.
- **Estatus**: Abierto / En proceso / Cerrado existe para incidencias y fallas;
  las sanciones usan Vigente / Cumplida. La tarea los junta en una sola
  frase; definir si la sanción lleva el estatus de la incidencia o conserva el
  suyo.
- Detalle de incidencia o falla: "Visualizar" solo muestra un toast.
- Notificar la sanción al contratista, apelación o cierre.
- En Clientes el menú también ofrece "Nueva Sanción"; no se definió si aplica
  (la tarea la ubica en R-05, que no tiene pestaña para esto).

## Qué reusa (no rehacer)

- Formulario y lista de sanciones, evidencias y acta: ME-05
- Lista de incidencias y fallas del contrato: ME-11
- Tabla, filtros, modales, panel lateral: F0-05, F0-06, F0-07
- Etiquetas espejo: F0-03

## Fuera de esta tarea

- Detalle de cliente/contratista: R-05
- Sanciones y contratos dentro del empleado: ME-05
- Incidencias del módulo de Seguridad (Incidencias, Fallas): fuera del proyecto
  Contratistas
