# R-04 · Clientes / Contratistas · Lista

> Ficha de diseño de la tarea R-04 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** lista única Clientes/Contratistas: REPSE, contratos,
representante legal, cumplimiento %, estatus.
**Tipo:** front · **Depende de:** F0-06 (filtros), R-01. Un componente, dos rutas.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
mega menú **Contratistas** → Contratistas, o **Clientes** → Clientes. Es el
mismo componente: `ctrKind` cambia las etiquetas y los datos
(`empMode` `ctr`).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Lista (filtros, tabla, paginación) | 2787–2801 | `{{ ctrTab }}` |
| Lógica de la lista | 5991–6019 | `ctrVals(tab)` |
| Etiquetas espejo | 5713 | `kLbl()` |
| Datos de contratistas y clientes (base + extras) | 5714–5749, 4781–4782 | `ctrList()`, `CLI_NAMES`, `CLI_EXTRA` |
| Pestañas por modo | 4776, 4778 | `CTR_TABS`, `CLI_TABS` |
| Rutas del mega menú | 7741–7742 | `ctrRoute(sec, item, kind)` |
| Cabecera ("Contratistas  N registros") | 2440 | `{{ empModeCtr }}`, `{{ ctrKpi }}` |
| Abrir detalle | 5711 | `openCtrD(id)` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

- Vista **tabla** únicamente (cards y lista deshabilitadas). Pestañas:
  Contratistas = Contratistas, Contratos, Empleados; Clientes = Clientes y
  Contratos (sin Empleados).
- **Espejo** (`kLbl`): `kSg` Contratista/Cliente, `kPl` Contratistas/Clientes.
  Cambian el encabezado de columna, "Buscar contratista/cliente", los
  tooltips ("Ver contratos del cliente") y los textos de confirmar eliminar.
  Los datos y folios (`CT-` / `CL-`) también son distintos.
- Columnas: **{Contratista|Cliente}** (avatar, razón social, RFC con copiar;
  ordenable A-Z / Z-A, ancho ajustable), **REPSE** (folio y "Vigente hasta
  {fecha}" / "Venció {fecha}": ámbar < 90 días, rojo vencido), **Contratos**
  (chip "N contratos" que lleva a la lista de contratos filtrada por RFC, o
  "Sin contratos"), **Representante legal** (nombre y correo),
  **Cumplimiento** (% con barra; verde ≥ 90, ámbar 51–89, rojo ≤ 50) y
  **Estatus** (Activo / Inactivo).
- Acciones por fila: Visualizar (abre R-05) y Eliminar (confirma; solo
  `empRW`). Búsqueda por razón social, RFC, REPSE y representante.
- Filtros (F0-06): Estatus (Activo, Inactivo) y Cumplimiento (90% o más,
  51% a 89%, 50% o menos), ambos con contador por opción.
- Clic en el % de cumplimiento va a Cumplimiento de contratistas
  (MX-01), **solo en Contratistas y con estatus Activo**; en Clientes la
  celda no es clicable.
- Mega menú: atajos Activos / Inactivos para Contratistas y Clientes.
- Estados vacíos: sin resultados / sin registros (F0-05).

**No está en el diseño**
- Mostrar los invitados con invitación pendiente en esta lista: solo aparecen
  en Asignación de requerimientos (R-02).
- Si Clientes conserva la columna REPSE: el diseño la deja igual en ambos
  modos con datos de ejemplo. Confirmar con negocio.
- Cómo se calcula el cumplimiento %: en el diseño sale del mapa de
  Cumplimiento (`ccPctMap`) o de un valor semilla.

## Qué reusa (no rehacer)

- Tabla, estados vacíos, modal de confirmar: F0-05
- Filtros: F0-06 · Etiquetas espejo y contexto de modo: F0-03

## Fuera de esta tarea

- Detalle del cliente/contratista: R-05
- Invitar: R-02 · Empleados agregados: R-06
- Cumplimiento de contratistas y Asignación de requerimientos: MX-01, MX-05
- Backend de relaciones: R-01
