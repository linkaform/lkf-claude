# ME-13 · Contratos · Mapeo y homologación de requerimientos

> Ficha de diseño de la tarea ME-13 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** vincular los requerimientos que el cliente escribe en su contrato
con el catálogo maestro: auto-mapear, desvincular, crear en el catálogo
maestro.
**Tipo:** full-stack · **Depende de:** ME-11. Diseño v2.

## Dónde está en el diseño

Archivo: `diseno/registro-contrato/nuevo-contrato.dc.html` (el mismo de
ME-12; aquí es otra pantalla del archivo). Es un panel lateral dentro del
detalle de contrato. Para llegar: abrir el archivo (prop `tabInicial` =
contratos, o `#contratos`) → clic en un folio de la lista (`contratoSel`) →
pestaña **Requerimientos** (`kTab: "requerimientos"`) → el panel está
colapsado a una tira de 44 px a la derecha con el botón **"Mapeo"**; clic
para expandirlo a 400 px (`mapPanelCerrado`, inicia en `true`).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Pestaña Requerimientos (tabla a la izquierda, panel a la derecha) | 893–1089 | `{{ kRequerimientos }}`, `colsMapeo` |
| Panel expandido | 1007–1079 | `{{ mapAbierto }}` |
| Tira colapsada "Mapeo" | 1081–1086 | `{{ mapColapsado }}` |
| Modal "Alta en catálogo maestro" | 1091–1130 | `{{ mapModalAbierto }}` |
| Toast con el JSON guardado | 1132–1140 | `{{ mapVerToast }}` |
| Catálogo maestro y mapeo de ejemplo | 3388–3417 | `CATALOGO_MAESTRO`, `MAPEO_INICIAL` |
| Similitud, mejor match, código | 3419–3441 | `similitud`, `mejorMatch`, `aSlug` |
| Lógica del panel | 5450–5566 | `map…` en `renderVals` |
| Estado | 3791–3795 | `mapCatalogo`, `mapMapeo`, `mapModal` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

- **Encabezado:** "Mapeo y Homologación de Requerimientos del Contrato" y
  "Vincula los requerimientos con el catálogo maestro de la base de datos";
  botón colapsar.
- **Barra:** "Auto-Mapear por Similitud", "Guardar Configuración" y
  "Restablecer".
- **Agregar requerimiento del contratista:** input de texto libre; mientras
  se escribe sugiere "se parece a <catálogo> (N % coincidencia)" si pasa de
  40 %. Al agregar, la fila entra ya homologada si la coincidencia es 60 % o
  más; el nivel (Empresa/Empleado) lo toma del catálogo si pasa de 40 %, si
  no queda en Empleado.
- **Lista "Homologación"** con contador "N de M homologados". Cada fila:
  texto original del cliente (con errores de captura, ej. "Comprobentede
  Domicilio"), chip de nivel Empresa (verde) o Empleado (azul), chip de
  resultado ("✓ → <nombre catálogo> · N % coincidencia" o "? → Sin mapear",
  fila en amarillo), selector del catálogo agrupado en "Nivel Empresa" y
  "Nivel Empleado" con la opción "Sin homologar…", **Desvincular match**,
  **Eliminar fila** (con confirmación) y **Crear +**.
- **Auto-Mapear:** solo para filas sin match; busca en el mismo nivel y luego
  en todo el catálogo; asigna si la similitud es 40 % o más. Similitud =
  coeficiente de Dice sobre bigramas del texto normalizado (sin acentos ni
  símbolos), contra nombre y código del catálogo.
- **Crear +** abre "Alta en catálogo maestro": nombre canónico (obligatorio,
  precargado con el texto original), código de sistema (se genera en
  mayúsculas, máx. 24 caracteres, editable), nivel Empresa/Empleado y
  descripción o norma oficial. "Guardar en Catálogo BD" agrega el
  requerimiento al catálogo, lo liga a la fila y avisa con toast.
- **Guardar Configuración:** arma `{ contractId, mappings: [{ source, scope,
  catalogId, catalogCode }] }` y lo muestra en un toast de 6 s. No hay
  llamada ni persistencia.
- **Restablecer:** vuelve el catálogo y las filas al ejemplo.

## No está en el diseño

- De dónde salen las filas: en el diseño son 9 fijas; no dice si vienen de
  los requerimientos del contrato (ME-12 / ME-11) o de un archivo.
- Permisos (quién puede crear en el catálogo global) y duplicados de código.
- Estado de guardado pendiente, errores o historial de cambios.
- El catálogo de ejemplo tiene 10 requerimientos (6 Empresa, 4 Empleado) sin
  Equipo, aunque la pestaña Requerimientos filtra por Empresa/Empleado/Equipo.

## Qué reusa (no rehacer)

- Modales, confirmación de eliminar, toast: F0-05 · Panel lateral: F0-07.

## Fuera de esta tarea

- La tabla de Requerimientos del contrato (Empresa / Empleados / Equipos):
  ME-11.
- Motor que aplica los requerimientos: ME-15.
- Alta de requerimientos en su catálogo y asistente: CF-01.
