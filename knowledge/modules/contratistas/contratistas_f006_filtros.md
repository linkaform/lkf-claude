# F0-06 · Base · Filtros

> Ficha de diseño de la tarea F0-06 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** filtros: un solo componente (panel lateral, pastilla flotante,
chips con contador, fecha, buscador).
**Tipo:** front · **Depende de:** F0-05.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verlo en el navegador:
Mi empresa → **Documentos** (el ejemplo más completo: estatus, categoría,
tipo de propietario, propietario, fecha, contrato). Cambiar a vista **Tabla**
para ver el panel colapsado a pastilla.

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Documentos: panel lateral, pastilla y chips | 2701–2710, 2750 | `dcSideF`, `dcPillSide`, `dcPillShow`, `dcFCount` |
| Lógica de Documentos: opciones con contador, rangos de fecha, conteo | 7873–7881, 7992–8004 | `dcEstOpts`, `dcVigOpts`, `dcFecha`, `dcFV` |
| Colapsar/expandir con animación | 6679–6681, 7993 | `fsFlip`, `dcFsFlip` |
| Empleados: popover de filtros en cabecera (con interruptor "Usuario") | 2443, 2626–2627, 2678 | `emHdrF`, `emFOpen`, `emFCount` |
| Contratos: panel con estatus y fecha | 2771–2772 | `fsx.ct`, `ctFCount` |
| Contratistas/Clientes | 2788 | `fsx.ctr`, `ctrFCount` |
| Requerimientos (config) y Asignación | 1826, 2803–2811 | `rqFCount`, `fsx.rf`, `rfCount` |
| Ancho y modo de panel por pantalla (≥1100 px lateral; menos, pastilla) | 6673–6678 | `fsxVals` |
| Filtro dentro de modales de selección | 2314, 3395 | `svEFCount`, `clkFOpen` |
| Chips de estatus como filtro del cumplimiento | 2850 | `ccFO`, `o.ic`, `o.count` |
| Buscador de la cabecera y su placeholder por pestaña | 2443, 8505 | `empQ`, `empQPh` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Tres formas de un mismo filtro**
- Panel lateral de 280 px a la izquierda del listado (pantallas anchas):
  título "Filtros", contador, "Limpiar" y botón para ocultar.
- Pastilla flotante (ícono de controles con contador): reemplaza al panel
  cuando está oculto; en la vista tabla el panel nace oculto. Al ocultar o
  mostrar el panel se anima el ancho (250 ms) y el listado ocupa el espacio.
- Popover en la cabecera de la pantalla (pantallas estrechas y Empleados):
  mismo contenido dentro de una caja con botón de filtros y contador.

**Controles**
- Chips de opción con contador: botón `checkbox` con la etiqueta y el número
  de registros que coinciden; seleccionado = fondo y contador resaltados.
  Selección múltiple dentro del grupo (Estatus, Cumplimiento, Tipo de
  propietario).
- Listas con muchas opciones (Categoría, Propietario, Contrato, Perfil,
  Contratista): selector que agrega valores como chips con "x" para quitar.
- Fecha: lista con Todos, Hoy, Ayer, Esta semana, Semana pasada, Últimos 15
  días, Este mes, Mes pasado, Este año y Personalizado; este último muestra
  Desde y Hasta.
- Interruptor ("Con usuario de Clave 10" en Empleados).
- Documentos también filtra por vigencia (Vigente, Por vencer, Vencido,
  Permanente) en la lógica (`dcVigOpts`); el panel visible no la muestra, es
  decisión de quien construya si se incluye.

**Contador y limpiar:** el contador de la pastilla suma los grupos con
selección y la fecha distinta de "Todos"; "Limpiar" aparece solo con filtros
activos y los borra todos. Los filtros se aplican al instante, sin botón
"Aplicar".

**Buscador:** campo en la cabecera de la pantalla; el placeholder cambia por
pestaña ("Buscar documento", "Buscar contrato", "Buscar cliente"…). Compara
sin acentos ni mayúsculas.

**Atajos:** las entradas del menú (Activos, En revisión, Vencidos…) abren la
pantalla con el filtro ya aplicado.

**Resultado vacío:** si hay búsqueda o filtros activos el estado vacío es
"No se encontraron resultados" (ver F0-05).

## Qué reusa (no rehacer)

- Chips, botones y estado vacío: F0-05 · Acento por modo: F0-03

## Fuera de esta tarea

- Qué campos filtra cada pantalla: ME-03, ME-06, ME-09, R-04, MX-01, CF-01.
- Filtros por periodo de las matrices (año, mes): F0-12.
- Selección con buscador para ligar: F0-15.
