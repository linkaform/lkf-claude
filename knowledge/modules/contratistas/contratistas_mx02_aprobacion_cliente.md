# MX-02 · Contratistas · Aprobación por cliente

> Ficha de diseño de la tarea MX-02 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** un documento de un contratista lo aprueban varios clientes ("2 de 3
aprobaron").
**Tipo:** full-stack · **Depende de:** MX-01.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
**Contratistas → Cumplimiento de contratista**, abrir un requerimiento
(clic en el encabezado de la columna) y clic en una celda Aceptado, Por
revisar o Rechazado: el popover trae las pestañas **Generales / Aprobación**.
El mismo bloque aparece en Cumplimiento documental (ME-07).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Pestañas y lista "Aprobación por cliente" en el popover (MX-01) | 2867, 2870 | `{{ ccRqTipHasApr }}`, `{{ ccRqTipApr }}`, `{{ ccRqTipAprSum }}` |
| Lógica de aprobaciones por celda | 5934–5940 | `APR`, `aprSum`, `aprFg` |
| Mismo bloque en Cumplimiento documental | 3047–3050 | `{{ cmTipHasApr }}`, `{{ cmTipApr }}` |
| Lógica (ME-07) | 6260–6262 | `cmTipApr`, `cmTipAprSum` |
| Revisar documento (aprobar / rechazar) | 2914–2920 | `{{ ccRvOpen }}` |
| Lista de clientes de ejemplo | 4780 | `CLI_NAMES` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

- La pestaña **Aprobación** solo existe si el estado de la celda es Aceptado,
  Por revisar o Rechazado (documento ya subido). Muestra el encabezado
  "Aprobación por cliente" y un resumen **"N de M aprobaron"** ("1 de 1
  aprobó" en singular).
- El resumen cambia de color: verde si todos aprobaron, rojo si alguno
  rechazó, ámbar en otro caso.
- Una fila por cliente que usa el documento, con icono y texto:
  **Aprobó** *nombre · fecha · hora*, **Rechazó** *nombre · fecha · hora* o
  **Pendiente de revisión**.
- En el diseño un documento Aceptado lo aprobaron todos; uno Rechazado tiene
  al menos un rechazo (el primer cliente); uno Por revisar tiene al menos un
  pendiente. Son 1 a 3 clientes por documento.
- Acciones relacionadas: **Revisar Documento** (modal con comentario
  obligatorio para rechazar; aprobar o rechazar) y **Rechazar** sobre un
  Aceptado.

## Qué reusa (no rehacer)

- Popover y estados de la matriz: MX-01 y F0-12 · Revisar documento: F0-13
- Documentos y versiones: ME-06 · Modelo de datos: F0-01

## Fuera de esta tarea

- La matriz y sus filtros: MX-01. Avisos al contratista: MX-03.
- No está en el diseño (definir antes de construir): la regla que combina las
  decisiones de varios clientes en el estado del documento (hoy el estado y
  las aprobaciones son independientes y los datos son de ejemplo); qué ve un
  cliente que revisa (solo su propia decisión o las de los demás); si un
  rechazo de un cliente obliga a re-subir para todos; si el modal Revisar
  documento registra la decisión del cliente que entra o del administrador.
