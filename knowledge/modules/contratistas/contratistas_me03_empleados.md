# ME-03 · Mi Empresa · Empleados

> Ficha de diseño de la tarea ME-03 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** lista de empleados en 3 vistas, filtros, alta manual en 2 pasos con
IA, alta masiva por Excel y descarga de registros.
**Tipo:** full-stack · **Depende de:** F0-06 (filtros), F0-10 (uploader IA).
Usuarios (Configuración › Usuarios) no tiene diseño.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
Mi empresa → pestaña **Empleados**.

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Lista: filtros laterales, cards, lista de cards, tabla, paginación, barra de selección, tooltips | 2620–2698 | `{{ emTab }}`, `{{ emVGrid }}`, `{{ emVList }}`, `{{ emVTable }}`, `{{ emSelBar }}` |
| Panel de filtros (se repite como panel lateral y como pastilla flotante) | 2437–2455 y 2622–2630 | `{{ emFOpen }}`, `{{ emSideF }}` |
| Botón flotante "Nuevo Empleado" | 3387 | `{{ efabShow }}` |
| Elegir alta manual o carga masiva | 4418–4436 | `{{ emModeOpen }}` |
| Alta manual / edición (paso 1 documentos, paso 2 datos) | 4214–4309 | `{{ emfOpen }}` |
| Carga masiva por Excel | 4437–4464 | `{{ bkOpen }}` |
| Lógica de lista, filtros y selección | 8151–8473 | `emplVals(tab)` (selección y descarga en 8397) |
| Lógica de alta manual y validaciones | 8375–8471 | `emfOpen`, `emfHeading` dentro de `emplVals` |
| Lógica de carga masiva | 5483–5527 | `emBulkVals()` |
| Datos semilla, documentos base, perfiles | 4726, 4746, 4774 | `EMP_EMPL`, `EMP_DOCS`, `EMP_PERFILES` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Lista**
- Vistas: cards compactas (default), lista de cards y tabla. Cards con foto,
  nombre, estatus, folio, cumplimiento, perfil, RFC/CURP/NSS (copiables),
  centro y contratos ligados ("Libre" si no tiene). Tabla con columna de
  acciones fija, paginación y fila de total "Cumplimiento documental".
- Columnas de tabla: empleado, cumplimiento, perfiles, CURP, NSS, RFC,
  centro de trabajo, registro patronal, SBC, alta IMSS, contratos.
- Filtros (chips con contador): Usuario (con / sin), Estatus (Activo /
  Inactivo), Cumplimiento (Completo / Incompleto), Perfil, Contrato (incluye
  "Libre"). En modo contratista agrega Contratista (R-06). Buscador "Buscar
  empleado".
- Selección múltiple: barra "N seleccionados", "Seleccionar todos (N)" y
  **Descargar Registros** (CSV `empleados.csv`: nombre, puesto, perfiles,
  centro, RFC, CURP, NSS, estatus).
- Acciones por empleado: abrir detalle (ME-04), editar, eliminar con
  confirmación "¿Eliminar empleado?". Los perfiles y centros extra salen en un
  tooltip "+N".

**Alta manual (2 pasos)**
1. Documentos (opcional, botón "Omitir"): arrastrar juntos INE, CURP,
   comprobante de domicilio, constancia fiscal y CV (PDF o JPG, máximo 10 MB).
   La IA identifica cada uno, extrae nombre, CURP y RFC; estados: subiendo,
   analizando, error con Reintentar, inconsistencia con Reemplazar o
   continuar sin sus datos.
2. Datos generales: nombre, cuenta (apagada = "Sin cuenta", no inicia sesión;
   encendida = vincular usuario existente o crear uno nuevo con formato
   `nombre.apellido`, con correo y teléfono de 10 dígitos), perfiles
   (multi-selección), centro de trabajo, RFC, CURP, NSS. Los campos llenados por
   IA llevan la marca "IA" y el aviso de revisarlos.
- Validaciones: nombre y centro obligatorios; CURP 18 caracteres y única; RFC
  13 caracteres; NSS (opcional) 11 dígitos; username único y no asignado a otro
  empleado; correo válido.
- Al crear: toast "Se creó el empleado", queda Activo y con todos los
  documentos faltantes salvo los cargados. Editar usa el mismo formulario sin
  pasos ("Guardar Cambios").

**Carga masiva**
- Plantilla CSV con columnas Nombre completo, CURP, RFC, NSS y Puesto
  ("Descargar Plantilla"). Excel o CSV, un solo archivo, máximo 50 MB.
- Fases: subiendo, "Analizando con IA" (validando columnas, revisando
  empleados), válido ("Archivo válido · N empleados") o con errores por fila
  ("Fila 4 · Falta el NSS", "La CURP ya está registrada"). "Cargar Empleados"
  solo con archivo válido; las CURP repetidas se omiten. Los empleados nacen
  con historial y todos los documentos faltantes.

## Qué reusa (no rehacer)

- Tabla, modales, toast: F0-05 · Filtros: F0-06 · Uploader con IA: F0-10
- Mismo componente en Contratistas › Empleados (R-06) y dentro de un contrato
  (ME-11).

## Fuera de esta tarea

- Detalle del empleado y sus pestañas: ME-04, ME-05.
- Usuarios (Configuración › Usuarios): sin diseño.
- "Ligar Empleados" (el botón flotante cambia dentro de un contrato): ME-11.
- El selector de centro de la carga masiva existe en la lógica (`bkCentro`)
  pero no se dibuja en el modal: duda de diseño.
