# ME-09 · Contratos · Lista

> Ficha de diseño de la tarea ME-09 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** lista de contratos con filtros de estatus y fecha (Activo, Por
vencer, En documentación, Vencido, Pausado, Cancelado).
**Tipo:** front · **Depende de:** F0-06 (filtros). Datos: ME-14.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
Mi empresa → pestaña **Contratos**, o mega menú Clientes / Contratistas →
**Contratos**. Es el mismo componente en los tres lugares (ver "Qué hace").

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Lista (filtros, tabla, paginación, tooltip de ubicaciones) | 2770–2785 | `{{ ctTab }}` |
| Lógica de la pantalla | 6020–6050 | `ctVals(tab)` |
| Colores por estatus | 6024 | `ES` |
| Datos semilla (contratista/cliente, vigencia en días, recursos, cumplimiento, estatus) | 4730, 4781 | `CT_SEED`, `CT_SEED_CLI` |
| Qué semilla usa según el modo | 5712–5713 | `ctSeed()`, `kLbl()` |
| Abrir detalle | 5693 | `openCto(id)` |
| Confirmar eliminar | 3614–3629 | `{{ cfmOpen }}` |
| Estados vacíos | 6668–6672 | `esVals()` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

- Solo vista **tabla**: en esta pestaña las vistas cards/lista quedan
  deshabilitadas. Columna de acciones fija a la izquierda, paginación con
  "Mostrar N" y rango "1 - 15 de 40 registros".
- Columnas: **Objeto del contrato** (con folio `#num`, ordenable asc/desc/sin
  orden, ancho ajustable 220–720 px), **Contratista/Cliente** (avatar con punto
  activo/inactivo, razón social, RFC con copiar), **Vigencia** (inicio y
  "hasta fin"; el fin va en rojo si Vencido y ámbar si Por vencer),
  **Ubicación** (primera + chip "+N" con tooltip numerado del resto),
  **Recursos** (chips "N empleados" y "N equipos"), **Cumplimiento** (% con
  barra; rojo si ≤ 50, verde si no) y **Estatus** (chip).
- Acciones por fila: Visualizar (abre el detalle, ME-10), Descargar (en el
  diseño solo muestra toast) y Eliminar (confirma "¿Eliminar contrato?",
  irreversible; solo si `empRW`).
- Búsqueda de cabecera "Buscar contrato": razón social, RFC, objeto, número,
  ubicaciones y folio.
- Filtros (panel lateral que se oculta, pastilla flotante en pantallas
  angostas): **Estatus** con chips y contador por opción (los 6 estatus) y
  **Fecha** (Todos, Hoy, Ayer, Esta semana, Semana pasada, Últimos 15 días, Este
  mes, Mes pasado, Este año, Personalizado con Desde/Hasta). La fecha filtra
  por traslape de la vigencia con el rango. Botón de limpiar y contador de
  filtros activos.
- Estados vacíos: sin resultados (con filtros) o sin registros.
- Espejo (F0-03): en `Contratistas` la columna dice "Contratista" y en
  `Clientes` dice "Cliente" (`kSg`). Desde el detalle de un contratista
  (`empMode` `ctrD`) la lista se filtra a los contratos de esa razón social.
- Atajos del mega menú: Activos, En documentación, Por vencer, Vencidos
  (preseleccionan el chip de estatus).

**No está en el diseño**
- La regla que calcula Por vencer / Vencido / En documentación: los datos
  semilla traen el estatus fijo. Solo hay umbrales de color (fin ≤ 30 días
  ámbar, < 0 rojo). Hay que definirla con el backend (ME-14).
- Atajos para Pausado y Cancelado: el menú no los trae, el filtro sí.
- Botón "Nuevo contrato": el menú lo lista como acción pero no lleva a
  ningún lado en `plataforma.dc.html`; el flujo está en
  `nuevo-contrato.dc.html` (ME-12).
- Eliminar contrato: la tarea no lo menciona (en el detalle solo se pausa y
  cancela). Confirmar si se conserva.
- En Mi empresa la columna de la contraparte también dice "Contratista",
  aunque ahí es el cliente/beneficiario. Confirmar etiqueta.

## Qué reusa (no rehacer)

- Tabla, modal de confirmar, toast, estados vacíos: F0-05
- Filtros (panel, pastilla, chips con contador, fecha): F0-06
- Etiquetas espejo según modo: F0-03

## Fuera de esta tarea

- Detalle del contrato: ME-10 y ME-11.
- Crear contrato: ME-12.
- Backend de contratos: ME-14.
