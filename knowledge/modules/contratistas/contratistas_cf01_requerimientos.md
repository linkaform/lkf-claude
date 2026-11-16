# CF-01 · Configuración · Requerimientos

> Ficha de diseño de la tarea CF-01 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** lista y filtros de requerimientos, asistente de alta/edición en 2
pasos (IA, plataforma, tipo Documento/Examen/Inspección, ámbito, vigencia o
periodicidad, avisos, acuse, limitante, criterios) y detalle con pestañas
Generales / Aplicación.
**Tipo:** full-stack · **Depende de:** F0-14 (selector de vigencia), F0-11
(IA/OCR).

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
menú **Configuraciones → Requerimientos** (los sub-ítems Documentos, Exámenes
e Inspecciones abren la misma lista ya filtrada por tipo).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Menú (Configuraciones › Requerimientos) | 4888–4889 | `openEcfg(item)` (7152) |
| Marco de Configuraciones (título, buscador, pestañas, vista tabla/calendario) | 1824–1851 | `{{ isEcfg }}`, `{{ ecTabs }}` |
| Botón y panel de filtros (lateral) | 1826 | `{{ rqFSecs }}`, `{{ rqFOpen }}` |
| Tabla de requerimientos | 1852–1867 | `{{ ecIsReq }}`, `{{ rqRows }}` |
| Botón flotante "Nuevo Requerimiento" | 3409 | `{{ rfabShow }}`, `{{ rqNew }}` |
| Panel de detalle (Generales / Aplicación) | 1972–2049 | `{{ rqDetOpen }}` |
| Asistente de alta/edición (2 pasos) | 2324–2434 | `{{ rqEdOpen }}` |
| Lógica de lista, filtros, detalle y asistente | 7154–7320 | `rqVals()` |
| Auxiliares de recurrencia/avisos | 7321–7335 y 4789–4816 | `rcVals`, `rcFrom`, `rqRecView`, `RQ_*` |
| Datos semilla | 4817 | `RQ_SEED` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Lista**
- Columnas: Acciones (ver detalle, editar), requerimiento, descripción, tipo,
  vigencia (con detalle de recurrencia), ámbito, limitante (Sí/No).
  Ordenar por nombre, ancho de la columna Requerimiento ajustable, paginación
  (10/25/50, 15 por defecto), cargando con esqueleto.
- Búsqueda por nombre y descripción.
- Filtros con contador por opción: Tipo, Ámbito, Vigencia (Con vigencia / Sin
  vencimiento), Avisos de vencimiento, Requiere acuse, Limitante.
- Estados vacíos: sin resultados, sin registros, error, tiempo agotado.
- Eliminar pide confirmación y lista dónde se usa (servicios, perfiles,
  equipos, contratos, empleados según el ámbito).

**Asistente (Nuevo / Editar requerimiento)**
- Paso 1 "Datos generales": documento de ejemplo (PDF/JPG, máx. 10 MB) que la
  IA analiza ("Identificando documento", "Extrayendo datos") y con el que
  autocompleta nombre, tipo y descripción; esos campos llevan la marca IA y un
  aviso para revisarlos. Nombre (obligatorio), plataforma (SAT, IMSS,
  INFONAVIT, STPS, Registro Público de Comercio, INE, Otra, Sin plataforma)
  con enlace al sitio oficial, descripción, tipo (**Documento / Examen /
  Inspección**) y ámbito (**Persona / Empresa / Equipo**, "Cumplimiento por …").
- Tipo Inspección: elegir inspección del catálogo agrupado por categoría.
  Tipo Examen: Físico (nombre) o Digital (examen del catálogo), intentos
  permitidos (1–10), aplicación aleatoria (mezclar preguntas y/o respuestas,
  preguntas por empleado).
- Paso 2 "Configuración": vigencia **Por vigencia** (vigente por N
  días/meses/años) o **Periódico** (periodicidad Mensual a Anual, meses, plazo
  de entrega por día del mes). Inspección y Examen usan frecuencia
  (diaria, semanal, quincenal, mensual, anual; por horas). Avisos de
  vencimiento (primer aviso con unidad y recordatorios; solo si hay vigencia),
  Requiere acuse, Limitante y Criterios de revisión (alta, edición y borrado
  en línea).
- Validación al avanzar o guardar: nombre, tipo, ámbito, inspección/examen,
  periodicidad y meses obligatorios según el caso. Botones Cancelar /
  Siguiente, Anterior / Guardar (o Guardar Cambios).

**Detalle (panel lateral redimensionable)**
- Encabezado: tipo, ámbito, limitante, editar, eliminar.
- **Generales**: documento de ejemplo (abrir o "Agregar Documento"),
  vigencia, avisos, plataforma, acuse (solo Documento), descripción,
  configuración del examen o de la inspección, criterios de revisión.
- **Aplicación**: sub-pestañas "Exigencia" (servicios, perfiles o equipos que
  lo exigen) y Contratistas / Personas / Equipos según el ámbito; además
  "Contratos donde se solicita". Cada una con filtros, búsqueda y paginación.

## Qué reusa (no rehacer)

- Tabla, modales y toast: F0-05 · Filtros: F0-06 · Panel lateral: F0-07
- Selector de vigencia y recurrencia: F0-14 · Lectura de documento con IA:
  F0-11 / F0-10 · Modelo de datos del requerimiento: F0-01

## Fuera de esta tarea

- Ligar requerimientos a servicios, perfiles y equipos: CF-02.
- Asignar requerimientos de empresa a contratistas: MX-05.
- Motor que evalúa requerimientos contra contratos: ME-15.
- "Asignaciones" y "Cumplimiento" aparecen en el menú bajo Requerimientos
  pero no tienen pantalla propia en Configuraciones (ver MX-05 y MX-01).
- No está en el diseño: avisos para Examen/Inspección con valores por
  defecto distintos a los del asistente (solo se ven al editar).
