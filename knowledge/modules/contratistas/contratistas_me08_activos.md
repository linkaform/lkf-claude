# ME-08 · Mi Empresa · Activos

> Ficha de diseño de la tarea ME-08 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** activos de la empresa (equipos, vehículos y herramientas): alta,
disponibilidad y mantenimiento.
**Tipo:** full-stack · **Depende de:** F0-05 (UI kit).

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
Mi empresa → pestaña **Activos** (menú: Vehículos, Equipos, Herramientas
filtran por tipo).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Lista (filtros, 3 vistas, tabla, paginación, barra de selección) | 3143–3214 | `{{ avTab }}`, `{{ avVGrid }}`, `{{ avVList }}`, `{{ avVTable }}` |
| Botón flotante "Nuevo Activo" | 3408 | `{{ afabShow }}` |
| Panel de detalle (Generales, Mantenimientos, Concesiones) | 3658–3724 | `{{ avPOpen }}` |
| Formulario de alta y edición | 3725–3778 | `{{ avfOpen }}` |
| Lógica de lista, detalle, mantenimiento y alta | 8039–8150 | `avVals(tab)` |
| Hilo de comentarios y evidencias del mantenimiento | 8015–8038 | `avEvVals()` |
| Áreas, catálogo de vehículos, tipos y datos semilla | 4748–4751 | `AV_AREAS`, `AV_VEH`, `AV_TV`, `AV_SEED` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Lista**
- Vistas: cards (default), lista de cards y tabla (acciones fijas, paginación,
  selección con "Exportar Activos"). Card: foto, nombre, tipo, estatus, marca y
  modelo, ubicación, asignado a, último mantenimiento y, en vehículos, lectura
  de kilometraje u horómetro. Acciones: ver, concesionar, editar, eliminar.
- Tabla: activo (nombre y folio `A-…`), tipo, estatus, área, asignado a,
  inventario, adquisición, costo, último mantenimiento.
- Filtros: Tipo (Vehículo / Equipo / Herramienta), Concesionado (Disponible /
  No disponible), Estado (Activo / Inactivo), Inventario (Único / Stock) y
  fecha de último mantenimiento. Buscador "Buscar activo". Filtra por la
  ubicación de trabajo activa.

**Alta y edición** (modal, "Nuevo activo" / "Editar activo")
- Foto del activo con IA (JPG o PNG, máximo 10 MB): "Identificado como …"
  completa nombre, tipo, marca y modelo; si no se distingue el modelo: "Captúralo
  manualmente". Campos de IA con marca "IA".
- Obligatorios: nombre, tipo, costo, área ("Selecciona un área"). Inventario
  Único o Stock solo en Herramienta; con Stock pide "Cantidad en existencia"
  (piezas, mayor a 0). Vehículos y equipos son siempre Único.
- Vehículos: tipo (Pickup, Automóvil, Camión de carga, Montacargas, Maquinaria
  pesada, Grúa), marca y modelo en cascada, serie de chasis, motor 1 y motor 2
  (aparece al capturar su serie), kilometraje y horómetro con su fecha.
- Fecha de adquisición y último mantenimiento. Al editar, "Asignado a"
  es obligatorio ("Selecciona a quién se asigna").

**Detalle (panel lateral)**
- Estado Activo / Inactivo con interruptor y confirmación; Inactivo = fuera de
  operación, queda como no disponible y no se puede asignar.
- Generales: tipo, marca, modelo, inventario, adquisición, costo; ubicación,
  área, asignado a ("Sin asignar"); en vehículos serie de chasis y motores y
  lecturas del último kilometraje y horómetro.
- Mantenimientos: historial con fecha límite, estatus (Abierta, En proceso,
  Cerrada), prioridad (Alta, Media, Baja) y quién lo atiende; cada uno despliega
  su historial de estatus con comentarios y evidencias. "Agregar": asignado a
  (obligatorio), prioridad, fecha límite y comentarios y evidencias (foto,
  video, archivo, nota de voz). Editar y eliminar con confirmación. Al guardar:
  "Se programó el mantenimiento y se asignó a …" y se crea una tarea para esa
  persona.
- Concesiones: préstamos del activo (persona, estatus En préstamo / Completo /
  Dañado / Perdido, piezas, fechas) y enlace "Ver en Concesiones".

## Qué reusa (no rehacer)

- Tabla, modales, toast: F0-05 · Filtros: F0-06 · Panel lateral: F0-07
- Uploader con IA para la foto: F0-10 · Módulo Concesiones existente (se enlaza)

## Fuera de esta tarea

- Alta de concesiones y devoluciones: módulo Concesiones actual, no se rehace.
- La tarea asignada aparece en "Mis tareas" del Inicio general, fuera de
  alcance: aquí solo se crea la asignación.
- Activos de un contrato (Empresa / Equipos): ME-11.
