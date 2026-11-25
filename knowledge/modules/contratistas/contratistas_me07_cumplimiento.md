# ME-07 · Mi Empresa · Cumplimiento documental

> Ficha de diseño de la tarea ME-07 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** matriz obligación × periodo, vista por vigencia, Subir acuse con OCR
(declaración en ceros), Generar cumplimiento (ZIP), descarga masiva, detalle del
periodo y panel lateral en Generales.
**Tipo:** full-stack · **Depende de:** F0-12 (motor de matriz), ME-06.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
Mi empresa → pestaña **Cumplimiento** (menú: Cumplimiento documental, Empresa,
Acuses, Opiniones, ICSOE / SISUB; todos abren esta misma pestaña).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Pestaña completa | 3019–3142 | `{{ cmTab }}` |
| Panel "Descargar cumplimiento" (ejercicio, periodicidades, formato) | 3020–3042 | `{{ cmDlOpen }}` |
| Barra de selección "Descargar Documentos" | 3043 | `{{ cmSelBar }}` |
| Tooltip de celda con acciones | 3044–3053 | `{{ cmTipOpen }}` |
| Popover de celda (documento, periodo, campos, acciones) | 3054–3060 | `{{ cmPopOpen }}` |
| Matriz (filtros, columnas, filas, pie de % por columna) | 3099–3126 | `{{ cmNotVig }}`, `{{ cmRows }}`, `{{ cmCols }}` |
| Vista por vigencia (tabla con versiones) | 3127–3141 | `{{ cmVigOn }}`, `{{ cmVigRows }}` |
| Detalle del periodo (panel lateral con acuse) | 4310–4329 | `{{ cmDetOpen }}` |
| Subiendo / analizando con IA | 4370–4383 | `{{ cmLoad }}` |
| Subir acuse (revisar datos leídos) | 4384–4405 | `{{ cmUpOpen }}` |
| Generar cumplimiento (ZIP) | 4406–4417 | `{{ cmGenOpen }}` |
| Botón flotante "Subir acuse" | 3410 | `{{ cfabShow }}` |
| Panel lateral de Generales (cumplimiento y pendientes) | 2546–2618 | `{{ pendAny }}` |
| Lógica de la pantalla | 6127–6456 | `ecVals(out)`, `cmVals(tab)` |
| Subida y lectura de acuse | 5516–5527 | `cmStart()`, `cmIntake()` |
| Obligaciones, periodos y datos semilla | 4777–4860 | `CM_OBS`, `CM_SEED`, `CM_TODAY` (9-nov-2026) |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable. El bloque 3061–3098 (`{{ ecOn }}`) es el cumplimiento de
empleados: no es de esta tarea.

## Qué hace

**Matriz**
- Una fila por requerimiento de ámbito Empresa y una columna por periodo; se
  elige la periodicidad en pestañas: Mensuales (12 meses), Bimestrales,
  Trimestrales, Cuatrimestrales, Semestrales, **Por vigencia**, Sin vencimiento
  (solo aparecen las que tienen requerimientos), cada una con contador de
  pendientes. Selector de ejercicio (año).
- Celdas por estatus: Aceptado, Por revisar, Rechazado, Vencido, Por subir,
  No entregado, No aplica, En ceros (cuatrimestrales). Periodos futuros
  vacíos. Fila con % de cumplimiento y pie "Cumplimiento por mes" con % por
  columna. Filtro por estatus (chips con contador) y "Acuse sí / no".
- Obligaciones de acuse del diseño: opiniones SAT 32-D, IMSS e INFONAVIT, CFDI
  de nómina y DIOT (mensuales, vigencia 30 días) e ICSOE y SISUB
  (cuatrimestrales, límite 17 de mayo, septiembre y enero).
- Tocar una celda abre tooltip/popover con documento, plataforma, periodo,
  estatus y acciones: Ver Documento, Generar Cumplimiento, Subir o Reemplazar
  Acuse.
- Selección de filas con "Descargar Documentos".

**Por vigencia / Sin vencimiento:** tabla Cumplimiento, Vigencia, Estatus
(más "Subido por", "Fecha de carga" y "Comentarios" al ver un contratista), con
versiones anteriores desplegables, subir, eliminar y ver.

**Subir acuse (con OCR)**
- Arrastrar PDF (SAT, IMSS, INFONAVIT, ICSOE o SISUB; solo PDF, máximo 50 MB)
  → "Subiendo acuse" → "Analizando con IA" → formulario con obligación, año,
  mes o cuatrimestre y fecha (emisión o presentación), cada campo con su %
  de confianza de la IA. Fecha obligatoria.
- Cuatrimestral: interruptor **Declaración en ceros** ("Sin contratos
  vigentes ni operaciones en el cuatrimestre"). Aviso al cambiar a la vista
  cuatrimestral sobre presentarlos en ceros para evitar multas.
- Si ya hay acuse del periodo: "Se reemplazará". Toast "Se guardó el acuse".
  Un acuse subido entra como Por revisar.

**Generar cumplimiento (ZIP):** por obligación y periodo genera dos CSV,
`<TAG>_contratos_<RFC>_<periodo>.csv` y `<TAG>_trabajadores_<RFC>_<periodo>.csv`
(contratos y trabajadores con asignaciones; en ceros: "SIN INFORMACION"),
empaquetados en `<TAG>_<RFC>_<periodo>.zip`. Indica dónde subirlo.

**Descargar cumplimiento (masivo):** panel con ejercicio, periodicidades con
conteo y formato Excel o PDF; entrega un ZIP.

**Detalle del periodo:** archivo del acuse (abrir, descargar, eliminar), campos
y la nota de la obligación.

**Panel lateral en Generales:** anillo de cumplimiento (Empresa, Empleados,
Acuses del año) y lista de documentos y acuses pendientes con subida directa.

## Qué reusa (no rehacer)

- Motor de matriz (celda, popover, chips con contador, pie de %): F0-12
- Uploader con IA y filtros: F0-10, F0-06 · Documentos subidos: ME-06
- Qué requiere cada periodo: ME-15

## Fuera de esta tarea

- Cumplimiento de contratistas (contratista × requerimiento): MX-01; de
  empleados: MX-04; aprobación por cliente: MX-02; notificar: MX-03.
- Revisar documento (aprobar o rechazar): F0-13.
- Duda: el selector Mensual / Cuatrimestral (`cmFTabs`) existe en la lógica pero
  la pestaña activa se maneja por periodicidad; confirmar si queda.
