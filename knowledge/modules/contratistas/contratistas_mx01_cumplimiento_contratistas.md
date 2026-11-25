# MX-01 · Contratistas · Cumplimiento de contratistas

> Ficha de diseño de la tarea MX-01 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** matriz contratista × requerimiento (vista general) y vista por
requerimiento (periodos), con popover de celda (ver, revisar, notificar, ir al
detalle) y descargar registros.
**Tipo:** front · **Depende de:** F0-12 (motor de matriz), ME-15, R-04.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
menú **Contratistas → Contratistas → Cumplimiento de contratista**
(sub-ítems Por revisar, Aceptados, Rechazados, Vencidos, Por subir, No
entregados, No aplica, que abren la matriz con ese estatus filtrado), o en la
pantalla de Contratistas el botón **Cumplimiento de contratistas**. No existe
en Clientes (`ccTgShow` exige modo contratistas).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Menú | 4986–4988 | `ctrRoute` (7741) |
| Botones de modo (Cumplimiento / Asignación) | 8503 | `ccTgOn`, `crqOn` |
| Filtros laterales (Estatus contratista, Requerimiento) | 2803–2808 | `{{ rfShow }}`, `rfVals` (5750) |
| Encabezado: Este año, ejercicio, filtros de estatus con contador | 2844–2851 | `{{ ccTab }}`, `{{ ccFObl }}` |
| Vista por requerimiento (periodos) | 2852–2878 | `{{ ccRqOn }}`, `{{ ccRqRows }}` |
| Matriz general | 2879–2893 | `{{ ccRows }}`, `{{ ccDocs }}` |
| Barra de selección (descargar, notificar) | 2894–2897 | `{{ ccSelTxt }}` |
| Tooltip del requerimiento | 2898–2902 | `{{ crqTipOpen }}` |
| Popover de celda | 2904–2911 | `{{ ccPopOpen }}` |
| Revisar documento | 2914–2920 | `{{ ccRvOpen }}` |
| Lógica | 5823–5990 | `ccVals(tab)` |
| Columnas y claves cortas de requerimientos | 4818–4819 | `CC_KEY`, `ccDocsOf` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué es propio de esta matriz y qué viene del motor (F0-12)

- **Motor (F0-12):** rejilla fila × columna con encabezado y primera columna
  fijos, ordenar por nombre y por cumplimiento, celdas con icono de estado,
  chips de filtro con contador, selección con casilla y barra de acciones,
  pie de % por columna, popover anclado a la celda, paginación.
- **Propio de MX-01:** filas = contratistas (razón social, RFC, iniciales);
  columnas = requerimientos de ámbito Empresa (`ccDocsOf`); periodo =
  ejercicio (año) con "Este año" y selector desde 2019; estados y reglas de
  abajo; vista por requerimiento; acciones de revisar y notificar.

## Qué hace

**Vista general**
- Cada celda resume el año del requerimiento con el peor estado: **Aceptado,
  Por revisar, Por subir, Rechazado, Vencido, No entregado, No aplica**
  (Parcial y Por transcurrir existen como estados visuales). Un contador
  aparece si hay varios periodos con ese estado.
- Cumplimiento por fila = aceptados / aplicables; color verde ≥ 90 %, ámbar
  51–89 %, rojo ≤ 50 %. Pie "Cumplimiento por obligación".
- Chips de estado con contador filtran la matriz y ocultan columnas sin
  coincidencias; "Limpiar". Buscador por razón social, RFC o representante.
  Filtro lateral por estatus del contratista y por requerimiento.
- Clic en el encabezado de una columna entra a la vista por requerimiento.

**Vista por requerimiento**
- Flecha de regreso, selector de requerimiento (con su periodicidad), KPI "N
  de M contratistas al corriente" y botón **Notificar Incumplidos (N)**.
- Una columna por periodo (mensual, bimestral, trimestral, cuatrimestral,
  semestral, "Vigencia" o "Sin vencimiento"); el periodo en curso se marca "En
  curso". Pie con % por periodo. Ancho de la columna Contratista ajustable.

**Popover de celda** (general o de periodo): documento, contratista, estado,
periodo, datos (vigencia, vencimiento, requiere acuse, fecha de carga, subido
por, motivo de rechazo) y, en general, cuadrícula de meses o periodos con
resumen de conteo. Acciones: Notificar (si hay incumplimiento), Ver
Documento, **Ver Cumplimiento / Ver en detalle del contratista** (abre el
detalle del contratista en Cumplimiento documental, resaltando el periodo),
**Revisar Documento** (si Por revisar) y Rechazar (si Aceptado).

**Selección y descarga**: casilla por fila y global; barra con "Descargar
Registros" (CSV con razón social, RFC, % y estado por requerimiento) y
"Notificar Incumplimientos" (ver MX-03).

## Qué reusa (no rehacer)

- Motor de matriz: F0-12 · Tabla y filtros: F0-05, F0-06 · Lista de
  contratistas: R-04 · Evaluación de estados: ME-15
- Revisar documento (aprobar / rechazar con comentario obligatorio): F0-13

## Fuera de esta tarea

- Aprobación por cliente (pestaña "Aprobación" del popover): MX-02.
- Modal y envío de notificaciones: MX-03. Asignación de requerimientos:
  MX-05. Cumplimiento de empleados: MX-04.
- Cumplimiento documental propio (matriz obligación × periodo): ME-07.
- No está en el diseño: filtros por rango de % o por situación (`ccFC`,
  `ccFS` existen en la lógica pero sin control visible).
