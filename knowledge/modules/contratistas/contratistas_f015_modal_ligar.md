# F0-15 · Base · Modal de selección para ligar y modal de notificar

> Ficha de diseño de la tarea F0-15 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** modal de selección para ligar (buscador, seleccionar todos,
filtros) y modal de notificar.
**Tipo:** front · **Depende de:** F0-05.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. El diseño trae cuatro
modales de selección con la misma mecánica y un modal de notificar.

| Bloque | Cómo llegar | Template | Lógica |
| --- | --- | --- | --- |
| **Ligar empleados** a un contrato (el más completo: buscador, filtro, seleccionar todos, deshabilitados) | Contratos → abrir uno → pestaña Empleados → Ligar | 3388–3406 | `clkVals` 5528–5549, `clkOpen` |
| **Ligar requerimientos** a un servicio o perfil (agrupado por ámbito) | Configuraciones → Servicios (o Perfiles) → abrir uno → Ligar Requerimientos | 2096–2110 | 7698–7708, `svLkOpen` |
| Selección con filtros dentro del alta de servicio/perfil | Configuraciones → Servicios → Nuevo | 2303–2323 | 7708–7713, `svEdOpen` |
| **Ligar a un contrato** desde el empleado (2 pasos: contrato y perfiles) | Empleados → abrir uno → pestaña Contratos → Ligar Contrato | 4005, 4026–4058 | 8352–8354, `edLinkOpen` |
| **Notificar incumplimiento** (destinatarios, motivo, enviar) | Cumplimiento de contratista → campana de una fila, de una celda o "Notificar Incumplimientos" | 2921–2927 | 5891–5897 (`ccNtfOpen`), 5819–5821 (`cmNtfVals`, desde el detalle del contratista) |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Mecánica común de selección**
- Cabecera con título y contexto ("Ligar empleados · {objeto} #{folio}"), nota
  informativa (p. ej. "Solo puedes ligar empleados activos registrados. Un
  empleado puede estar en varios contratos.") y botón de cerrar.
- Buscador (sin acentos ni mayúsculas) y botón de filtros con contador y
  chips de opción con número (en empleados: Con contrato / Sin contrato).
- Fila de control: casilla "seleccionar todos" sobre lo disponible (estado
  intermedio si es parcial), texto "N disponibles" y "N seleccionados".
- Filas con casilla, avatar o ícono y datos de apoyo; las ya ligadas salen
  deshabilitadas con etiqueta "Ya ligado" y no cuentan en "seleccionar
  todos"; las disponibles se ordenan primero.
- Pie: "Cancelar" y botón principal con conteo ("Ligar 3 empleados"),
  deshabilitado sin selección. Al guardar, cierra y muestra toast ("Se ligó
  1 empleado al contrato", "Se ligaron N …").
- Sin resultados: "No se encontraron empleados activos" / "No se encontraron
  registros"; si todo ya está ligado, mensaje propio ("Todos los
  requerimientos ya están ligados" en requerimientos).

**Variantes**
- Empleados: cada fila muestra perfiles (hasta 3 y "+N" con tooltip), NSS y
  chip de contratos ("En {contrato}", "En N contratos", "Sin contrato").
- Requerimientos: tabla con columnas Requerimiento, Vigencia, Ámbito, Tipo;
  agrupados por ámbito con casilla de grupo (marcado total o parcial) y
  contador "n de m". Al terminar resalta 2.7 s los recién ligados.
- Alta de servicio/perfil: misma lista dentro del formulario, con filtros
  por ámbito y tipo; error "Selecciona al menos un requerimiento".
- Ligar contrato al empleado: paso 1 elegir contrato (muestra perfiles
  requeridos y coincidencia con los del empleado), paso 2 elegir perfiles
  ("Ya está en sus perfiles" / "No está en sus perfiles: se agregará al
  asignarlo"). Navegación Atrás / Siguiente. (Contenido: ME-05.)

**Modal de notificar**
- Título "Notificar incumplimiento" y descripción según el caso: uno ("Avisa
  al {contratista} qué obligaciones no cumplió en {periodo}") o varios ("Se
  enviará una alerta a N …").
- **Destinatarios:** tarjeta por contratista con iniciales, razón social,
  representante legal y correo, y "N incumplimientos".
- **Motivo \*:** texto prellenado con las obligaciones incumplidas y su causa;
  editable; vacío → borde rojo y "Escribe el motivo".
- Aviso: "Se enviará por correo al representante legal y aparecerá en el
  portal del contratista."
- Pie: Cancelar y "Enviar Notificación". Éxito: toast "Se envió la
  notificación" o "Se enviaron N notificaciones"; la fila queda con "Alerta
  enviada" y se limpia la selección.
- Desde el detalle de un contratista la descripción habla del documento
  ("qué le falta cumplir en {documento}").
- **Cumplimiento de empleados no abre modal:** la campana de la fila
  notifica directo con toast "Se notificó a {nombre} · N …".

## Qué reusa (no rehacer)

- Modales, botones, chips, casillas, toast: F0-05 · Filtros: F0-06
- Matriz que dispara notificar: F0-12

## Fuera de esta tarea

- Qué se hace al ligar (reglas de perfiles, límites): ME-11, ME-05, CF-02
- Notificar por fila y masivo con correo y portal: MX-03
- Modal de revisar documento (aprobar / rechazar): F0-13
