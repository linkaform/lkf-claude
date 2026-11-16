# R-06 · Contratistas · Empleados agregados

> Ficha de diseño de la tarea R-06 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** Contratistas · Empleados agregados (columna Contratista).
**Tipo:** front · **Depende de:** ME-03, R-01.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
mega menú Contratistas → **Empleados** (Activos / Inactivos). Es la lista de
empleados de ME-03 en modo `ctr`: no existe en Clientes (`CLI_TABS` solo trae
Clientes y Contratos).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Lista de empleados (filtros, cards/lista/tabla) | 2620–2698 | `{{ emTab }}` |
| Filtro Contratista y columna (bloques `emIsCtr`) | 2628, 2645, 2678–2679 | `{{ emIsCtr }}`, `emFR` |
| Columna Contratista en la tabla | 2682 | `{{ e.ctrName }}`, `{{ e.ctrGo }}` |
| Lógica de la lista | 8151–8164 | `emplVals(tab)`, `ISC` |
| Columnas de la tabla | 8400 | `emGridCols` |
| Pestañas del modo | 4776 | `CTR_TABS` |
| Atajos del mega menú (Activos / Inactivos) | 7741–7742 | `ctrRoute` |
| Contratistas visibles | 5714 | `ctrList()` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

- Misma lista que ME-03: 3 vistas (cards, lista, tabla), buscador, filtros
  (Usuario, Estatus, Cumplimiento, Perfil, Contrato) y columnas (empleado,
  cumplimiento, perfiles, CURP, NSS, RFC, centro de trabajo, reg. patronal,
  SBC, alta IMSS, contratos). Se agrega:
  - **Columna Contratista** (segunda, 220 px mín.): avatar con iniciales,
    razón social como enlace "Ver contratista" (abre R-05) y RFC.
  - En cards y lista, el dato "Contratista" encabeza los metadatos.
  - **Filtro Contratista**: selector con búsqueda y chips (`emFR`).
- Solo lectura en la tabla: sin editar ni eliminar (`empRW` es falso en
  `ctr` + Empleados). El detalle del empleado se abre normal (ME-04).
- Atajos del menú: Activos / Inactivos.
- Desde el detalle de un contratista (R-05) la misma lista se acota a sus
  empleados y la columna Contratista no se muestra.

**Inconsistencias del diseño**
- El botón flotante "Nuevo Empleado" aparece también en este modo
  (`efabShow` solo excluye `ctrD`), aunque la tabla es de lectura. Confirmar si
  debe ocultarse.
- El contratista de cada empleado se asigna con un hash de demo
  (`hsE(e.id) % CTRS.length`); falta la regla real (sale de la relación,
  R-01).

**No está en el diseño**
- Un empleado con más de un contratista.
- Estado vacío propio: usa el genérico de empleados.

## Qué reusa (no rehacer)

- Toda la lista, filtros y vistas: ME-03, F0-05, F0-06
- Detalle del empleado: ME-04, F0-07
- Etiquetas y modo: F0-03

## Fuera de esta tarea

- Alta manual, masiva y descarga de empleados: ME-03
- Detalle del empleado: ME-04
- Relaciones y datos del contratista: R-01, R-04, R-05
