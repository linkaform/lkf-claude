# ME-06 · Mi Empresa · Documentos

> Ficha de diseño de la tarea ME-06 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** lista de documentos de la empresa en 3 vistas, estados, subida con
IA, carga masiva, detalle con versiones, "Compartido con" y comentarios.
**Tipo:** full-stack · **Depende de:** F0-10 (uploader IA), F0-13 (revisar
documento).

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
Mi empresa → pestaña **Documentos**.

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Lista (filtros, 3 vistas, paginación, barra de selección) | 2699–2767 | `{{ dcTab }}` |
| Botón flotante "nuevo" | 3407 | `{{ dfabShow }}` |
| Panel de detalle (generales, versiones, compartido con, comentarios) | 3779–3825 | `{{ dcPOpen }}` |
| Modal revisar (aprobar / rechazar con comentario) | 3826–3838 | `{{ dcRvOpen }}` |
| Duplicado detectado (preguntar, cargando, comparar) | 3852–3905 | `{{ dupAsk }}`, `{{ dupLoad }}`, `{{ dupOpen }}` |
| Carga masiva con IA (analizando, revisar resultado) | 4330–4369 | `{{ nomLoad }}`, `{{ nomRev }}` |
| Lógica de la pantalla | 7871–8008 | `docVals(tab)` |
| Tooltip de contratos / vigencia | 7867 | `dcTipAt` |
| Catálogo de categorías, tipos con vigencia en días, palabras clave para clasificar | 4731–4733 | `DC_CATS`, `DC_TYPES`, `DC_KW` |
| Datos semilla | 4735 | `DC_SEED` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Lista**
- Vistas: cards (default), lista y tabla. Tabla con columna de acciones fija,
  paginación y selección múltiple con barra "N seleccionados" (descargar).
- Columnas/datos: documento, categoría, propietario (tipo y nombre),
  contratos ligados, estatus, vigencia, fecha de carga, subido por, lectura
  con IA.
- Estatus: **Aceptado, Por revisar, Rechazado, Vencido**. Vencido se calcula:
  Aceptado con vigencia pasada.
- Filtros: estatus, categoría, propietario, tipo de propietario, contrato
  (incluye "Sin contrato"), vigencia, fecha de carga (desde/hasta). Chips con
  contador por opción.
- Atajos del menú: Activos = Aceptado, En revisión = Por revisar,
  Rechazados = Rechazado.
- Dentro de un contrato (`empMode === "cto"`) la misma lista se filtra a los
  documentos ligados a ese contrato y oculta la columna de contratos.

**Detalle (panel lateral)**
- Generales: categoría, propietario, origen, mapeo a requerimiento, vigencia,
  fecha de carga, subido por.
- Versiones: la actual y las anteriores; "Subir nueva versión".
- Compartido con: a qué clientes/contratos se compartió.
- Comentarios.
- "Revisar documento" solo si está Por revisar.

**Subir**
- Individual: arrastrar archivo → IA clasifica tipo y propietario → mapeo a
  requerimiento con % de confianza (componente F0-10).
- Duplicado: si ya existe, reemplazar o conservar ambos.
- Masiva: varios archivos, IA extrae RFC/CURP/NSS y relaciona con empleados;
  comentario común para toda la carga; los que quedan sin propietario pasan a
  Por revisar.

## Qué reusa (no rehacer)

- Tabla, modales, toast: F0-05 · Filtros: F0-06 · Panel lateral: F0-07
- Uploader con IA y duplicados: F0-10 · Revisar documento y versiones: F0-13

## Fuera de esta tarea

- Documentos del empleado (pestaña del detalle de empleado): ME-04.
- Cumplimiento documental y acuses: ME-07.
- Servicio de OCR en backend: F0-11 (aquí solo se consume).
