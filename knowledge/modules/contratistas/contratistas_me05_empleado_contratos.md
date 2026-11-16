# ME-05 · Mi Empresa · Empleado · Contratos y Sanciones

> Ficha de diseño de la tarea ME-05 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** pestaña Contratos del empleado (ligar contrato en 2 pasos, editar
perfiles, remover) y pestaña Sanciones (levantar con evidencias, imprimir acta).
**Tipo:** full-stack · **Depende de:** ME-04, ME-14 (backend de contratos).

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
Mi empresa → Empleados → abrir un empleado → pestañas **Contratos** y
**Sanciones**.

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Pestaña Contratos (lista, filtros, acciones) | 3999–4022 | `{{ edTCtr }}` |
| Modal Ligar contrato (paso 1 contrato, paso 2 perfiles; también Editar perfiles) | 4023–4052 | `{{ edLinkIsOpen }}` |
| Pestaña Sanciones (lista, filtros, acciones) | 4101–4124 | `{{ edTSan }}` |
| Detalle de una sanción | 4125–4148 | `{{ svOpen }}` |
| Modal Levantar / Editar sanción | 4149–4181 | `{{ snOpen }}` |
| Lógica de contratos y ligado | 8332–8355 | dentro de `emplVals(tab)` |
| Lógica de sanciones (lista, estatus, imprimir, eliminar) | 8225–8240 | `sanRows` en `emplVals` |
| Lógica del formulario de sanción | 7830–7866 | `snVals(e)` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Contratos del empleado**
- Tabla: folio, contratista, servicio, perfiles que cubre, requerimientos,
  vigencia, estatus (Activo / Inactivo). Filtro por estatus y buscador.
  Columna Requerimientos: "N de 2 pendientes" en rojo; al tocarla salta a
  Documentos filtrado por origen Contrato.
- **Ligar Contrato** (2 pasos):
  1. Contrato: solo contratos Activos no ligados aún; buscador y filtros por
     contratista y perfiles; los que coinciden con los perfiles del empleado
     van primero con "Coincide con sus perfiles: …".
  2. Perfiles: perfiles requeridos por el contrato, con "Seleccionar todos" y
     búsqueda; marca "Ya está en sus perfiles" o "No está en sus perfiles: se
     agregará al asignarlo". Se preseleccionan los que ya tiene.
  Al terminar: "Se ligó al contrato #… y se agregó N perfil(es)"; los perfiles
  nuevos se suman al empleado y sus documentos requeridos.
- **Editar perfiles**: el mismo paso 2 con título "Editar perfiles" y botón
  Guardar.
- **Remover**: confirmación "¿Remover del contrato?"; los documentos del
  empleado se conservan. Sin contratos: "Sin contratos asignados. El empleado
  está libre."

**Sanciones**
- Tabla: folio (`#S-…`), motivo y comentario, fecha, días sin acceso,
  evidencias, quién registró, estatus (**Vigente** / **Cumplida**; con días sin
  acceso pasa a Cumplida al terminar la suspensión). Filtro por estatus y
  buscador. Acciones: ver, editar, imprimir y eliminar (confirmación; borra
  comentarios y evidencias). Vacío: "El empleado no tiene sanciones registradas."
- **Levantar Sanción**: motivo obligatorio entre Retardos, Falta injustificada,
  No portar EPP, Abandono de puesto, Incumplimiento de procedimiento, Conducta
  inapropiada u Otro (con texto obligatorio). Interruptor "Sin días de acceso":
  de 1 a 8 días ("la Ley Federal del Trabajo permite hasta 8 días") y fecha de
  inicio. Sin él es una amonestación.
- Comentarios y evidencias en un hilo tipo chat: fotografía, video (hasta
  500 MB), archivo (hasta 50 MB) y nota de voz; Enter envía, Shift+Enter salta
  de línea.
- Detalle: motivo, tipo, fecha, días, comentarios y evidencias (miniaturas,
  audio, documentos descargables). "Sin evidencias adjuntas." si no hay.
- **Imprimir acta**: el diseño solo dispara el toast "Generando acta
  administrativa". No está en el diseño: el formato del acta.

## Qué reusa (no rehacer)

- Tabla, modales de confirmar, toast: F0-05 · Filtros: F0-06 · Panel: F0-07
- Modal de selección para ligar (buscador, filtros, seleccionar todos): F0-15
- Detalle de contrato y su lista de contratos: ME-09, ME-10

## Fuera de esta tarea

- Resto de pestañas del empleado: ME-04.
- Estatus Abierto / En proceso / Cerrado de Incidentes y Sanciones que cita el
  plan en R-07 no coincide con Vigente / Cumplida del diseño: confirmar.
- El formulario dice "Durante estos días no podrá laborar en las ubicaciones
  asignadas", pero el diseño no muestra cómo se aplica ese bloqueo en accesos.
