# F0-12 · Base · Motor de matriz

> Ficha de diseño de la tarea F0-12 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** motor de matriz genérico: fila × columna con estados, popover de
celda, chips con contador, pie de % (lo usan las 4 matrices).
**Tipo:** front.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verlo en el navegador:
menú **Contratistas** → Cumplimiento de contratista (el ejemplo más
completo), y luego las otras tres.

| Matriz (filas × columnas) | Cómo llegar | Template | Lógica |
| --- | --- | --- | --- |
| Contratista × obligación (Cumplimiento de contratistas), con vista por requerimiento (contratista × periodo) | Contratistas → Cumplimiento de contratista | 2843–2914 (celdas 2880–2893, popover 2904, vista por requerimiento 2846–2877) | `ccVals` 5823–5990, `ccTab` |
| Obligación × periodo (Cumplimiento documental de Mi empresa), con vista por vigencia | Mi empresa → Cumplimiento | 3019–3142 (celdas 3115–3123, vista vigencia 3128–3139, popover 3054) | `cmVals` 6321, `cmTab` |
| Empleado × requerimiento | Mi empresa → Cumplimiento → empleados | 3061–3114 (pie 3084, popover 3095) | `ecVals` 6127, `ecOn` |
| Contratista × requerimiento con casillas (Asignación) | Contratistas → Asignación de requerimientos | 2809–2842 (cabecera 2816, pie de guardado 2832) | `crqVals` 5787, `crqTab` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Estructura común**
- Primera columna fija con la fila (nombre, iniciales, RFC o perfil) y dos
  acciones: casilla de selección y, salvo en Asignación, campana (notificar).
- Columna de **cumplimiento**: porcentaje en color y subtítulo "x de y".
  Umbrales: 90 % o más verde `#16A34A`, de 51 a 89 % ámbar `#B45309`, 50 %
  o menos rojo `#DC2626`. Se calcula sobre las celdas que aplican (las "No
  aplica" se excluyen).
- Encabezado con scroll horizontal sincronizado con el cuerpo; ordenar por
  nombre o por %; ancho de la primera columna ajustable.
- **Pie de %** por columna, en el mismo color, con tooltip "x de y
  cumplieron", más el total general; "—" si nada aplica.
- Estado vacío y paginación: F0-05.

**Estados de celda** (`ST`, línea 5836+): Aceptado (check verde), Por
revisar (reloj azul), Rechazado (archivo-x rojo), Vencido (calendario-x
naranja), Por subir (gris), No entregado (x roja), No aplica (guion), Parcial
(ámbar, cuando la celda agrupa varios periodos) y Por transcurrir (tenue,
periodos futuros). Cuando una celda agrupa periodos (cuatrimestre o año)
muestra un número con la cantidad.

**Chips con contador:** fila de chips por estado (ícono, etiqueta, número)
que filtran la matriz y atenúan las celdas de otros estados; "Limpiar".

**Popover de celda:** 320 px de ancho, junto a la celda; se abre hacia arriba
si abajo no hay 420 px; se cierra al hacer scroll o clic fuera. Contiene
documento, contratista, estatus y periodo, desglose por mes cuando agrupa,
datos del documento, aviso de rechazo o falta, y acciones según estado: Ver
Documento, Revisar Documento, Rechazar, Notificar, Ver Cumplimiento / Ir al
detalle. Las acciones las define cada pantalla; el motor solo las recibe.

**Periodo:** selector de año con flechas y desplegable; modos mensual y
cuatrimestral; "Este año" para volver.

**Barra de selección:** al marcar filas aparece "N seleccionados", seleccionar
todos, Descargar Registros (CSV con cumplimiento y estado por columna) y
Notificar Incumplimientos.

**Variante de casillas (Asignación):** cada celda es un checkbox; casilla en
el encabezado marca toda la columna y en la fila marca toda la fila; columna
"Solicitados: n de m"; al editar aparece barra "N contratistas con cambios"
con Descartar Cambios y Guardar Cambios. Contratista con invitación pendiente
se marca.

## Qué reusa (no rehacer)

- Tabla, paginación, estado vacío, barra de selección: F0-05 · Filtros: F0-06
- Panel de detalle de periodo: F0-07 · Modal de notificar: F0-15

## Fuera de esta tarea

- Qué documentos y periodos entran en cada matriz y sus acciones: MX-01,
  MX-04, MX-05, ME-07.
- Cálculo de cumplimiento en backend: ME-15.
