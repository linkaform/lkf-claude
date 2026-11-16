# ME-12 · Contratos · Nuevo contrato

> Ficha de diseño de la tarea ME-12 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** crear un contrato: documento firmado con IA, datos, servicios con
sus documentos, recurrencia, recursos (perfiles y equipos con cantidad y
requerimientos), ubicaciones, confirmar y guardar.
**Tipo:** front · **Depende de:** F0-10, F0-14, ME-14. Diseño v2.

## Dónde está en el diseño

Archivo: `diseno/registro-contrato/nuevo-contrato.dc.html` (6207 líneas, su
propio `_ds/`). Es un componente con el estado `nuevoAbierto`; las pantallas
de lista y detalle del mismo archivo son de otras tareas. Para llegar: abrir el
archivo con la pestaña **Contratos** (prop `tabInicial` = contratos, o
`#contratos` al final de la URL) → botón flotante **"Nuevo contrato"** (abajo a
la derecha, solo en Contratos, no en Contratistas/Clientes). El enlace
"+ Nuevo contrato" del mega menú no hace nada en el diseño. Ojo: el prop
`tabInicial` ofrece "clientes" pero el código lo trata como `contratistas`.

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Botón flotante | 2825–2830 | `{{ verFabContrato }}`, `nuevoContrato` |
| Pantalla completa | 87–430 | `{{ verNuevo }}` |
| 1 · Documento físico firmado | 113–136 | `nSinArchivo`, `nHayArchivo`, `nSubir` |
| 2 · Datos del contrato (+ subcontratación) | 140–176 | `nFilasCampos`, `nSub` |
| 3 · Servicios contratados | 179–211 | `nServChips`, `nServFiltradas` |
| 4 · Recurrencia | 213–334 | `nRc` |
| 5 · Recursos asignados (Perfiles / Equipo) | 335–391 | `nTabsRec`, `nFilasRec` |
| 6 · Ubicaciones de trabajo | 392–424 | `nUbiChips` |
| Cancelar / Guardar Contrato | 425 | `nGuardar` |
| Modal "Confirmar contrato" | 3237–3320 | `{{ nResAbierto }}` |
| Lógica de la pantalla | 3965–4358 | `valsNuevo(st)` |
| Catálogos de ejemplo | 3966–4003 | `SERV`, `EQUIPOS_CAT`, `PERFIL_REQS` |
| Estado inicial | 3754–3813 | `n…` en el `constructor` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

- **Encabezado:** migas Contratistas › Contratos › Nuevo contrato (las dos
  primeras cierran la pantalla), flecha "Volver a contratos" y "Folio de
  registro" (`CTR-2026-0181`, fijo en el diseño).
- **1 · Documento firmado:** zona "Arrastra o haz clic" (PDF, JPG o PNG, máx.
  20 MB) con "La IA extraerá automáticamente los datos del contrato". Simulado:
  tras 1.6 s precarga folio, objeto, descripción, contratista, monto, fechas y
  responsable, y marca con el chip **IA** los siete campos leídos. Estado
  "Extrayendo datos con IA..." y botón quitar. Es opcional: se puede capturar
  a mano ("Puedes capturarlos manualmente").
- **2 · Datos:** folio del contrato, objeto, descripción, contratista, monto
  total (MXN), fecha de inicio y fin; responsable (no obligatorio) e interruptor
  "Permite subcontratación". Al guardar, los siete obligatorios vacíos marcan
  borde rojo y "Campo requerido".
- **3 · Servicios:** buscador con lista (cada opción dice cuántos documentos
  trae), chips de servicios agregados con su conteo; al pasar el cursor
  muestra la lista de documentos requeridos. Resumen "N servicios · M
  documentos requeridos".
- **4 · Recurrencia (opcional):** interruptor "Restringir días y horarios de
  trabajo"; tipos Por día, Semanal, Mensual, Configurable (cada N
  día/semana/mes/año), con selección de días, semanas, meses, frecuencia por
  horas y Desde / Hasta. Es el selector de F0-14.
- **5 · Recursos:** pestañas Perfiles y Equipo con contador. Perfil: selector
  buscable (no repite perfiles ya usados) y cantidad. Equipo: tipo (Equipo o
  Vehículo), equipo del catálogo y cantidad. Cada fila muestra sus
  **requerimientos** como chips por formato (Documento, Examen, Inspección,
  Capacitación) que se pueden quitar o reponer ("N de M requerimientos
  seleccionados"). "Añadir perfil / equipo" y eliminar fila con confirmación.
  Filas incompletas: "Selecciona el perfil y captura la cantidad en todas las
  filas." Los recursos son opcionales.
- **6 · Ubicaciones:** buscador y chips de centros de trabajo; la IA preselecciona
  dos.
- **Guardar:** valida datos y recursos; si pasa, abre "Confirmar contrato" con
  resumen de todo (datos, descripción, servicios, recurrencia, perfiles y
  equipos con "× cantidad" y "N req.", centros). "Regresar a editar" o
  "Confirmar y guardar" (muestra "Se guardó el contrato" y cierra).

## No está en el diseño

- Guardado real: solo cierra la pantalla; no hay estado de error.
- Beneficiario (cliente) como selector: el campo "Contratista" es texto libre
  y el diseño lo precarga con "Grupo Insa, S.A. de C.V.".
- Estatus resultante (la lista usa "En documentación" para contratos nuevos).
- Aquí la IA no usa el uploader de F0-10 (sin mapeo, % ni duplicados): solo
  precarga campos y chip IA.
- La pestaña de vehículos (`CAMPOS_REC.vehiculos`, 4006) existe en la lógica
  y no se muestra.

## Qué reusa (no rehacer)

- Modales y toast: F0-05 · Subida con IA: F0-10 · Recurrencia: F0-14 ·
  Confirmación de eliminar: F0-05.

## Fuera de esta tarea

- Backend de contratos: ME-14 · Lista de contratos: ME-09.
- Detalle del contrato y sus pestañas: ME-10, ME-11.
- Mapeo de requerimientos contra el catálogo maestro: ME-13.
