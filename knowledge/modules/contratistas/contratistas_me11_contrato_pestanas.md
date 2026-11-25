# ME-11 · Contratos · Detalle · Empleados, Requerimientos e Incidencias & Fallas

> Ficha de diseño de la tarea ME-11 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** pestañas del detalle de contrato: Empleados (ligar empleados),
Requerimientos (Empresa / Empleados / Equipos) e Incidencias & Fallas.
**Tipo:** front · **Depende de:** ME-10, ME-15 (motor de requerimientos).

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verlas en el navegador:
Mi empresa → Contratos → Visualizar un contrato → pestañas **Empleados**,
**Requerimientos**, **Incidencias & Fallas** (`CTO_TABS`, `empMode` `cto`).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Pestañas del contrato | 4775 | `CTO_TABS` |
| Empleados: lista (la misma de Mi empresa, sin columna Contratos) | 2620–2698 | `{{ emTab }}` |
| Empleados: botón flotante "Ligar Empleados" | 3387 | `{{ efabShow }}` |
| Modal Ligar empleados | 3388–3406 | `{{ clkOpen }}` |
| Lógica del modal | 5528–5549 | `clkVals()` |
| Lógica de la lista de empleados | 8151–8164 | `emplVals(tab)` |
| Requerimientos: tabla con sub-pestañas | 2994–3017 | `{{ ctoRqTab }}` |
| Lógica de Requerimientos | 5613–5675 | `tab === "ctoReq"` |
| Incidencias & Fallas: tabla | 2966–2992 | `{{ ctoTblTab }}`, `{{ ctoIsInc }}` |
| Lógica de Incidencias & Fallas | 5676–5690 | `tab === "ctoInc"` |
| Modal revisar requerimiento | 3839–3851 | `{{ rqRvOpen }}` |
| Pestaña Documentos (reuso de ME-06) | 2699–2767 | `{{ dcTab }}` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Empleados**
- Mismas 3 vistas, filtros y columnas que la lista de empleados (ME-03),
  limitada a los empleados ligados al contrato; sin columna ni filtro de
  contratos. El detalle del empleado se abre en solo lectura.
- Botón flotante verde "Ligar Empleados" abre el modal: aviso "Solo puedes
  ligar empleados activos registrados. Un empleado puede estar en varios
  contratos.", buscador (nombre, NSS, perfil), filtro Con contrato / Sin
  contrato con contador, "seleccionar todos" y contador "N empleados
  disponibles / N seleccionados". Cada renglón: casilla, avatar, nombre,
  perfiles (+N con tooltip), NSS y chip ("Sin contrato", "En #folio", "En N
  contratos"). Los ya ligados salen atenuados con chip "Ya ligado" y casilla
  bloqueada. Botón "Ligar N empleados" deshabilitado sin selección; toast
  "Se ligó 1 empleado al contrato".
- Quitar un empleado del contrato se hace con "Remover del contrato" en el
  detalle del empleado (ME-05), no en esta lista.

**Requerimientos** (sub-pestañas verticales con insignia de pendientes)
- Sub-pestañas **Empresa**, **Empleados** y **Equipos**; la insignia cuenta los
  documentos Por subir, Rechazado o Vencido.
- Columnas de Empleados y Equipos: Documento (con archivo y versiones),
  Mapeo (combo con búsqueda), Empleado (o Equipo), Vigencia, Perfil (o
  Categoría), Tipo, Estatus y Comentarios (último y contador). Empresa solo
  lleva Documento, Mapeo, Vigencia, Estatus y Comentarios.
- Estatus: Aceptado, Por revisar, Por subir, Rechazado, Vencido. Tipo:
  Documento, Examen, Inspección, Capacitación (Empleados); Documento e
  Inspección (Equipos).
- Filtros: Estatus, Categoría (solo Equipos: Vehículo, Equipo, Herramienta),
  Tipo, Mapeo (Mapeado / Sin mapear); en Empleados además buscador múltiple
  de Empleado y de Perfil. Búsqueda "Buscar requerimiento".
- Acciones por fila, cada una deshabilitada con motivo en tooltip: Visualizar
  (si hay archivo), Subir (solo Por subir, Rechazado o Vencido; "Subir nueva
  versión" si Vencido), Revisar (solo Por revisar: aprobar / rechazar con
  comentario, F0-13) y Eliminar (solo Por revisar; vuelve a Por subir y
  conserva las versiones anteriores). Chevron para ver versiones anteriores.
- Vacíos: "Liga empleados al contrato para ver sus requerimientos",
  "Sin requerimientos", "No se encontraron documentos".

**Incidencias & Fallas** (solo lectura)
- Columnas: Descripción (con ubicación), Folio (`I-` o `F-`), Tipo
  (Incidencia / Falla), Prioridad (Alta, Media, Baja), Fecha, Reportó,
  Estatus (Abierto, En proceso, Cerrado).
- Filtros: Tipo, Prioridad, Estatus. Búsqueda "Buscar incidencia o falla".
- Vacíos: "No se encontraron incidencias ni fallas"; contrato sin registros:
  "Este contrato no tiene incidencias ni fallas".

**No está en el diseño**
- Abrir el detalle de una incidencia o falla: "Visualizar" solo muestra un
  toast.
- Crear sanción desde esta pestaña (ver R-07).
- Compartir enlace del documento: la lógica existe pero no hay botón en la
  fila.
- El combo de Mapeo y su lista pertenecen a ME-13; aquí solo se muestra.

## Qué reusa (no rehacer)

- Tabla, filtros, paginación, modales: F0-05, F0-06
- Modal de selección para ligar: F0-15
- Revisar documento, versiones y comentarios: F0-13 · Uploader: F0-10
- Matriz de requerimientos y su motor: ME-15

## Fuera de esta tarea

- Generales del contrato: ME-10 · Alta y edición de empleados: ME-03, ME-04
- Mapeo y homologación contra catálogo maestro: ME-13
- Ligar contrato desde el empleado, remover y sanciones: ME-05
- Documentos del contrato: ME-06
