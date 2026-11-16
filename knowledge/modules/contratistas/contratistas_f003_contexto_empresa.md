# F0-03 · Base · Contexto de empresa activa y modo

> Ficha de diseño de la tarea F0-03 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** contexto de empresa activa y modo (propia / cliente / contratista):
una sola pantalla con etiquetas espejo (`kLbl`).
**Tipo:** front · **Depende de:** F0-01.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verlo en el navegador:
menú **Mi empresa** (modo propio), menú **Clientes** o **Contratistas** → lista
→ abrir una fila (detalle), y desde ahí abrir un contrato.

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Etiquetas espejo (Cliente/Contratista, singular/plural, minúscula) | 5713 | `kLbl()` → `kSg`, `kSgL`, `kPl`, `kPlL`, `cli` |
| Datos del lado activo (semilla de clientes o de contratistas) | 5712, 5714 | `ctSeed()`, `ctrList()` |
| Pestañas por modo | 4775–4782 | `EMP_TABS`, `CTO_TABS`, `CTR_TABS`, `CLI_TABS` |
| Pestañas visibles y etiqueta de la activa | 8503, 8506 | `empTabs`, `empTabLabel` |
| Migas y cabecera (volver, nombre, estatus) | 2436–2447, 8503 | `empCrumb`, `empModeCto`, `ctrDName`, `ctrDSt` |
| Etiqueta espejo en las listas | 2773, 2790, 2795 | `{{ kSg }}` |
| Entradas a cada modo | 7735, 7741–7744, 5694, 5711 | `empRoute`, `ctrRoute`, `openEmpresa`, `openCto`, `openCtrD` |
| Acento de color por modo | 6858 | `--c10-acc*` |
| Perspectiva dentro del contrato (quién es "propio" y quién "otro") | 5581, 5592 | `ctoBackMode` |
| Cosas que se ocultan según modo | 8503, 8508, 8837, 6014 | `ccTgShow`, `empRW`, `invShow` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Estado de contexto** (en el diseño, `state`):
- `empMode`: `emp` (Mi empresa, por defecto), `ctr` (lista de clientes o
  contratistas), `ctrD` (detalle de uno), `cto` (detalle de un contrato).
- `ctrKind`: `ctr` o `cli`. Solo cuenta cuando `empMode` es `ctr`, `ctrD` o
  `cto`; en `emp` se limpia (`openEmpresa` lo pone en `null`).
- `ctrDId`, `ctoId`, `ctoK` guardan la empresa o contrato abierto.
  `ctoBackMode` recuerda desde dónde se abrió el contrato para regresar.

**Etiquetas espejo** (`kLbl`): con `ctrKind = cli` y modo ≠ `emp` todo dice
Cliente/Clientes/cliente; en cualquier otro caso, Contratista/Contratistas.
Afecta títulos, columnas, placeholder de búsqueda ("Buscar cliente"), textos
de confirmar eliminar y avisos de notificación.

**Pestañas por modo**
- `ctr` cliente: Clientes, Contratos. `ctr` contratista: Contratistas,
  Contratos, Empleados (más el modo cumplimiento y asignación, solo
  contratista).
- `ctrD` (detalle): las de Mi empresa sin Ubicaciones; todo en solo lectura,
  sin botones flotantes de alta.
- `cto`: Generales, Empleados, Documentos, Requerimientos, Incidencias &
  Fallas.

**Color de acento:** propio azul `#2F80ED`, contratista naranja `#EA580C`,
cliente violeta `#7C3AED`. Se aplica a todo el árbol como variables
`--c10-acc`, `-h`, `-l`, `-s`, `-b`, `-m`; los componentes deben usar las
variables, no el azul fijo.

**Diferencias que sí hay entre cliente y contratista:** el modo de
cumplimiento y la asignación de requerimientos solo existen del lado
contratista; el botón flotante de invitar solo se muestra del lado
contratista; en cliente no hay columna de acciones de cumplimiento.

## Qué reusa (no rehacer)

- Tabla y modales: F0-05 · Filtros: F0-06 · Panel de detalle: F0-07
- Mega menú que dispara las rutas: F0-04

## Fuera de esta tarea

- Menú y rutas: F0-04. El `RequireMenuAccess` **no está en el diseño**.
- Contenido de cada lista y detalle: R-04, R-05, ME-09, ME-10, ME-11.
- Cumplimiento de contratistas y asignación: MX-01, MX-05.
