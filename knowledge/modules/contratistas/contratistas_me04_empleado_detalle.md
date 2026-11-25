# ME-04 · Mi Empresa · Empleado · Detalle

> Ficha de diseño de la tarea ME-04 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** detalle de empleado con Generales, Centros, Documentos y
Configuraciones (QR y gafete, desactivar, vetar, restaurar contraseña).
**Tipo:** full-stack · **Depende de:** ME-03, F0-07 (panel lateral).

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
Mi empresa → Empleados → tocar un empleado (se abre el panel lateral).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Panel completo y encabezado (foto, nombre, folio, usuario, tabs) | 3906–3927 | `{{ edEOpen }}` |
| Pestaña Generales | 3928–3943 | `{{ edTGen }}` |
| Pestaña Centros (centros y áreas) | 3944–3963 | `{{ edTCen }}` |
| Pestaña Documentos (con sub-pestaña Nómina) | 3964–3998 | `{{ edTDoc }}` |
| Pestaña Configuraciones | 4182–4200 | `{{ edTCfg }}` |
| Modal de veto | 4201–4212 | `{{ vtOpen }}` |
| Lógica del panel | 8151–8473 | `emplVals(tab)` (secciones 8209–8224, documentos 8296–8328, QR 8250, config 8246 y 8357–8364) |

Las pestañas Contratos y Sanciones están en el mismo panel (ver ME-05).
Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Encabezado:** foto (cambiar o eliminar), nombre editable, folio `#`, usuario
con copiar y ID de cuenta; "Empleado" si no tiene usuario; chip "Vetado". Tabs:
Generales, Centros, Documentos, Contratos, Sesiones, Sanciones, Configuraciones
(con contador; el de Documentos y Sanciones en rojo si hay pendientes).

**Generales** (secciones colapsables, edición por sección con Editar / Guardar)
- Datos personales: CURP, RFC, NSS, nacimiento, sexo, estado civil,
  nacionalidad; correo y teléfono de la cuenta (solo lectura). Campos
  extraídos por IA llevan marca "IA" con el documento de origen.
- Perfiles de trabajo (chips): "Los documentos requeridos se determinan según
  sus perfiles". Sin perfiles: "Sin perfiles asignados".
- Domicilio: calle, colonia, municipio, estado, CP, país.
- Contratación: compañía, jefe directo, tipo de contrato, registro patronal,
  SBC, y automáticos alta IMSS, ingreso, antigüedad, vacaciones. Nota: el SBC
  debe coincidir con el SUA o habrá inconsistencias en ICSOE y SISUB.

**Centros**
- Lista de centros de trabajo con búsqueda; marcar/desmarcar (mínimo uno:
  "El empleado debe tener al menos un centro de trabajo"), estrella de centro
  predeterminado (va primero) y permiso por centro Lectura / Escritura.
- Del centro seleccionado: áreas con filtro por tipo, "Seleccionar todas" y
  contador "N de M seleccionadas".

**Documentos**
- Tabla: documento, origen (Expediente base, Perfil, Contrato), vigencia,
  recurrencia (Anual, Semestral, Única vez), estatus, comentario. Estatus:
  Aceptado, Por revisar, Por subir, Rechazado, Vencido; orden por urgencia.
- Filtros por estatus y origen, búsqueda, paginación. Acciones: abrir,
  descargar, subir (solo Por subir, Vencido o Rechazado) y eliminar (solo Por
  revisar). Cada documento despliega sus versiones anteriores.
- Un documento puede ser requerido por varios orígenes ("También lo requiere:").
- Sub-pestaña Nómina: XML de nómina (periodo, pago, folio fiscal, neto); vacío:
  "Sin XML de nómina. Cárgalos desde Documentos y la IA los relacionará".

**Configuraciones**
- Banner "Empleado vetado desde …" con motivo.
- Código QR (se descarga o se copia su ID; "Imprimir Gafete") para registrar
  entrada en caseta; queda inactivo si el empleado está desactivado o vetado.
- Preferencias con interruptor: Disponible para contratos, Notificaciones por
  correo, Acceso a la app móvil (requiere cuenta), Check In con fotografía.
- Estado de la cuenta: **Desactivar empleado** (confirmación; no registra
  asistencia ni se asigna; QR inactivo), **Vetar** (modal con consecuencias y
  motivo obligatorio "Escribe el motivo del veto"; no se asigna a contratos ni
  centros nuevos, las asignaciones activas no se cancelan solas) y
  **Levantar Veto**.
- Acceso a la plataforma (solo con usuario): **Restaurar contraseña** con
  confirmación; envía una temporal al correo.

## Qué reusa (no rehacer)

- Panel lateral redimensionable con tabs: F0-07 · Tabla, modales, toast: F0-05
- Filtros: F0-06 · Revisar documento y versiones: F0-13 · Uploader: F0-10

## Fuera de esta tarea

- Pestañas Contratos y Sanciones: ME-05.
- Pestaña Sesiones: no tiene tarea asignada en el plan (relacionada con CF-04).
- Imprimir Gafete solo muestra el toast "Generando gafete para imprimir": el
  diseño del gafete no está en el diseño.
- Detalle dentro de un contrato (veto por contrato, sin pestaña Contratos): ME-11.
