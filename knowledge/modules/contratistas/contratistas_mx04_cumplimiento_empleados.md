# MX-04 · Mi empresa · Cumplimiento de empleados

> Ficha de diseño de la tarea MX-04 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** matriz empleado × requerimiento con notificar por fila.
**Tipo:** front · **Depende de:** F0-12 (motor de matriz), ME-15.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
**Mi empresa → Empleados** y botón **Cumplimiento** (alterna a esta matriz
con `cmFrom = "empleados"`; el buscador pasa a "Buscar empleado o CURP"). Solo
en la empresa propia, no en el detalle de un contratista.

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Matriz (filtros, encabezado, filas, pie, paginación) | 3061–3094 | `{{ ecOn }}`, `{{ ecRows }}`, `{{ ecCols }}` |
| Popover de celda | 3095–3101 | `{{ ecPopOpen }}` |
| Alterna entre empleados y obligaciones | 8505 | `empCmPick`, `cmE` |
| Lógica | 6127–6176 | `ecVals(out)` |
| Estados con color e icono | 4777 | `CM_IC` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué es propio de esta matriz y qué viene del motor (F0-12)

- **Motor (F0-12):** rejilla con encabezado y primera columna fijos, orden por
  nombre y por cumplimiento, celdas con icono de estado, chips con contador,
  pie de %, popover anclado, paginación.
- **Propio de MX-04:** filas = empleados (activos; se separan los que tienen
  usuario con el interruptor `emFU`), columnas = requerimientos de ámbito
  **Persona**; **sin periodos ni ejercicio** (se toma el documento más
  reciente del empleado que coincide con el requerimiento); solo cinco
  estados; sin vista por requerimiento ni selección múltiple; notificar sin
  modal.

## Qué hace

- Estados: **Aceptado, Por revisar, Rechazado, Vencido, Por subir** (este
  último cuando el empleado no tiene el documento). Aceptado con vigencia
  pasada se calcula como Vencido.
- Cada fila: acciones (Ver empleado, campana), empleado con primer perfil y
  "+N" perfiles, punto de estatus activo/inactivo, cumplimiento % y "N de M".
  Color verde ≥ 90 %, ámbar 51–89 %, rojo ≤ 50 %.
- Pie "Cumplimiento por requerimiento": % global y por columna, con tooltip
  "N de M empleados cumplen".
- Chips de estado con contador (filtran y atenúan las celdas que no
  coinciden), "Limpiar"; buscador por nombre o CURP; orden por empleado y por
  cumplimiento; paginación 10/25/50 y estado vacío.
- **Notificar por fila:** campana habilitada solo si el empleado tiene algún
  requerimiento no aceptado. Sin modal: marca "Alerta enviada" y muestra toast
  "Se notificó a *nombre* · N documentos pendientes".
- **Popover de celda:** requerimiento y empleado, estado, nota "El empleado
  aún no tiene este documento en su expediente" si no hay documento, datos
  (documento con folio, vigencia, vencimiento, fecha de carga, subido por,
  motivo de rechazo) y botones **Ver Empleado** (pestaña Documentos) y **Ver
  Documento** (Mi empresa › Documentos).
- Encabezado de columna: tooltip con tipo, vigencia y descripción.

## Qué reusa (no rehacer)

- Motor de matriz: F0-12 · Tabla, filtros y popover: F0-05, F0-06
- Evaluación de requerimientos: ME-15 · Lista de empleados: ME-03

## Fuera de esta tarea

- Notificar con correo y portal (modal con motivo): MX-03 (aquí el envío es
  directo y no hay mensaje editable).
- Documentos del empleado y su detalle: ME-04 · Documentos de la empresa:
  ME-06.
- No está en el diseño: criterio de a qué empleado aplica cada requerimiento
  por perfil (hoy todos los de ámbito Persona se evalúan a todos) ni el
  contenido del aviso al empleado.
