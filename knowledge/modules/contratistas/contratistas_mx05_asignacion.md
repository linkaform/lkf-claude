# MX-05 · Contratistas · Asignación de requerimientos

> Ficha de diseño de la tarea MX-05 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** contratista × requerimiento de empresa con casillas, guardar /
descartar cambios.
**Tipo:** full-stack · **Depende de:** F0-12 (motor de matriz), CF-01.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
**Contratistas** y botón **Asignación de requerimientos** (solo disponible en
Contratistas; en Clientes y otras pestañas aparece deshabilitado con "Disponible
en Contratistas"). Al entrar muestra el aviso "Marca los requerimientos de
empresa que se solicitarán a cada contratista. Se administran en
Configuración."

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Botones de modo | 8503 | `crqOn`, `crqPick` |
| Filtros laterales (Estatus contratista, Requerimiento) | 2803–2808 | `{{ rfShow }}`, `rfVals` (5750) |
| Matriz con casillas | 2809–2842 | `{{ crqTab }}`, `{{ crqRows }}`, `{{ crqHd }}` |
| Barra "N contratistas con cambios" | 2831–2835 | `{{ crqBarOn }}` |
| Tooltip del requerimiento | 2836–2841 | `{{ crqTipOpen }}` |
| Lógica | 5787–5813 | `crqVals(tab)` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué es propio de esta matriz y qué viene del motor (F0-12)

- **Motor (F0-12):** rejilla con encabezado y primera columna fijos, celdas,
  paginación, tooltip anclado, selección.
- **Propio de MX-05:** las celdas son **casillas editables** (no estados de
  cumplimiento); columnas = requerimientos de ámbito Empresa; estado de
  cambios sin guardar; barra de guardar/descartar; incluye contratistas con
  invitación pendiente.

## Qué hace

- Filas: contratistas activos; los inactivos se muestran atenuados y sin
  edición ("Contratista inactivo"); los **invitados que aún no aceptan**
  aparecen con "Invitación pendiente" y sin casillas marcadas por defecto.
- Columna **Solicitados** "N de M" por contratista. Por defecto está marcado
  lo que el requerimiento tiene como limitante; el resto, desmarcado.
- Casillas: por celda, **por fila** (marcar/quitar todos los requerimientos
  del contratista), **por columna** (a todos los contratistas activos o
  invitados) y global, con estado intermedio cuando es parcial.
- Fila con cambios sin guardar: punto "Cambios sin guardar". Barra inferior
  "N contratista(s) con cambios" con **Descartar Cambios** y **Guardar
  Cambios**; al guardar: toast "Se guardó la asignación de requerimientos".
- Buscador por razón social, RFC o correo; filtros por estatus del
  contratista y por requerimiento; paginación; "No se encontraron registros".
- Nombre del contratista abre su detalle (no para invitados). Encabezado del
  requerimiento con tooltip: tipo, vigencia, avisos de vencimiento,
  plataforma con enlace, requiere acuse, limitante, a cuántos contratistas se
  solicita y "Ver Requerimiento" (abre CF-01 con el detalle).

## Qué reusa (no rehacer)

- Motor de matriz: F0-12 · Tabla y filtros: F0-05, F0-06
- Requerimientos de empresa: CF-01 · Invitaciones: R-02 · Lista: R-04

## Fuera de esta tarea

- Alta y edición de requerimientos: CF-01.
- Evaluación del cumplimiento de lo asignado: MX-01 y ME-15.
- Requerimientos por contrato (pestaña Requerimientos del contrato): ME-11.
- No está en el diseño: efecto de quitar una asignación sobre documentos ya
  cargados o contratos vigentes; si una asignación aplica a todos los
  contratos del contratista o solo a los de un cliente.
