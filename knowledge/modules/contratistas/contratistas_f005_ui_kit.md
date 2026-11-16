# F0-05 · Base · UI kit

> Ficha de diseño de la tarea F0-05 del proyecto Contratistas. Índice en
> `contratistas.md`. El estilo (colores, tipografía, tamaños) está en
> `contratistas_ui_spec.md`; aquí solo se dice dónde ver cada pieza.

**Tarea:** UI kit: tabla (columna ACCIONES fija, ancho ajustable, paginación,
selección y acciones masivas, modos tabla/lista/cards, estados vacíos),
modales crear/confirmar, toast, folios.
**Tipo:** front · **Orden:** primero botones, inputs, chips, modales y toast;
después la tabla.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verlo en el navegador:
Mi empresa → **Documentos** (3 modos y selección), Mi empresa → **Contratos**
(tabla con columnas fijas), menú Mi empresa → Configuraciones →
**Requerimientos** (tabla con ancho ajustable).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Selector de modo (cards compactas / lista de cards / tabla) | 2445, 8505 | `empViews`, `empView` |
| Cards compactas con checkbox y acciones | 2712–2730 | `dcVGrid`, `dcRows` |
| Lista de cards | 2731–2748 | `dcVList` |
| Tabla con columna de acciones fija, ordenar y selección | 2749–2758 | `dcVTable`, `dcPageRows` |
| Tabla de contratos: dos columnas fijas a la izquierda | 2770–2785 | `ctTab`, `ctGridT`, `ctSortIc` |
| Tabla con encabezado "Acciones" y ancho de columna ajustable | 1853, 1867 | `rqHdRef`, `rqRzDown` |
| Paginación ("Mostrar 10/25/50", rango, páginas) | 2784, 6664, 6683 | `ctPer`, `svPg`, `pgList` |
| Barra de selección con acciones masivas | 2759–2763, 7996 | `dcSelBar`, `dcSelAllLbl` |
| Estados vacíos (sin registros, sin resultados, error, tiempo agotado) | 6668–6672 | `esVals`, `dcEmpty` |
| Modal confirmar (título, descripción, aviso, "Se usa en") | 3614–3629 | `cfmOpen`, `cfm` |
| Modal crear/editar con campos y errores | 2303–2323 | `svEdOpen` |
| Toast (éxito, error, info) | 3360, 7132, 8832–8833 | `toast(m)`, `tMsg` |
| Folios (prefijos) | 4730, 5719 | `folio` |
| Botón flotante "nuevo" que se expande al pasar el cursor | 3407 | `dfabShow`, `dfabW` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Tabla**
- Columna de acciones fija a la izquierda (checkbox, ver, acciones de fila);
  en Contratos hay dos columnas fijas (acciones y nombre). El encabezado
  tiene fondo `--c10-acc-l`; ordenar por columna con ícono de dirección.
- Ancho ajustable: arrastrar el borde derecho del encabezado de la primera
  columna (Requerimientos, Contratistas en cumplimiento).
- Paginación: "Mostrar" con 10, 25 o 50; texto "a - b de N registros";
  botones anterior/siguiente y números con "…".
- Selección: checkbox por fila y "Seleccionar todos (N)"; al marcar aparece
  la barra "N seleccionados" con quitar selección, seleccionar todos y la
  acción masiva (en Documentos: Descargar Documentos).
- Modos cards / lista / tabla con el mismo dato. En tabla el panel de filtros
  se colapsa a pastilla (ver F0-06).

**Estados vacíos:** cuatro variantes con imagen, título y subtítulo: "No
existen registros" (nada creado), "No se encontraron resultados" (hay
filtros o búsqueda activa), error de consulta y tiempo agotado. Ocupan el
alto disponible de la pantalla.

**Modales:** confirmar con "Cancelar" y botón principal (rojo si destruye);
crear/editar con título, campos obligatorios con `*` y mensaje de error bajo
el campo ("Selecciona el tipo", "Selecciona al menos un requerimiento").

**Toast:** esquina inferior, 3.5 s, cerrable. Verde con check (éxito),
rojo con alerta (mensajes que empiezan con "No", "Error", "Ningún"), azul con
info. Se anima con la fila de grid 0fr→1fr.

**Folios:** prefijo por entidad: `D-` documento, `E-` empleado, `C-`
contrato, `CL-` cliente, `CT-` contratista, `A-` activo, `F-` falla, `I-`
incidencia. Se muestran como `#folio` junto al nombre.

## Qué reusa (no rehacer)

- Variables de acento por modo: F0-03.

## Fuera de esta tarea

- Filtros: F0-06 · Panel de detalle: F0-07 · Selección para ligar: F0-15
- Matrices de cumplimiento: F0-12 · Uploader con IA: F0-10
- Editor de recurrencia: F0-14
