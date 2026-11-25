# R-05 · Clientes / Contratistas · Detalle

> Ficha de diseño de la tarea R-05 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** detalle de cliente/contratista reusando Mi Empresa (sin
Ubicaciones; en Clientes sin acciones de cumplimiento).
**Tipo:** front · **Depende de:** R-04, ME-11.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
mega menú Contratistas (o Clientes) → Visualizar una fila. Es la pantalla de
Mi empresa en modo solo lectura (`empMode` `ctrD`); `ctrKind` decide si es
contratista o cliente (etiquetas espejo, mismo componente).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Cabecera (regresar, nombre, estatus) | 2440 | `{{ empModeCtrD }}` |
| Pestañas y botón de modo | 8503–8506 | `empTabs`, `empCmShow` |
| Generales de la empresa (datos fiscales, REPSE, actividad, contactos) | 2457–2545 | `{{ empIsGen }}` |
| Panel lateral Cumplimiento documental y Enviar Notificación | 2546–2619 | `{{ pendAny }}`, `{{ pendRD }}` |
| Lógica del panel lateral | 5696–5710 | `ctrDPend(o)` |
| Datos de la empresa vista (razón, RFC, dirección, rep. legal) | 8476–8490 | `empresaVals()` |
| Abrir detalle | 5711 | `openCtrD(id)` |
| Reparto de empleados/documentos/activos por contratista (solo demo) | 5695 | `ctrKeep(id)` |
| Etiquetas espejo | 5713 | `kLbl()` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

- Cabecera: "‹ {razón social}" con chip Activo / Inactivo; el regresar dice
  "Regresar a Contratistas" o "Regresar a Clientes" (`kPl`).
- Pestañas: **Generales, Empleados, Documentos, Activos, Contratos**. Son las
  de Mi empresa (`EMP_TABS`) sin **Ubicaciones** y sin Cumplimiento como
  pestaña. Contratos reusa la lista ME-09 filtrada a esa razón social; abrir
  un contrato y regresar vuelve a esta pestaña.
- **Todo en solo lectura**: sin botón Editar, sin agregar/editar/borrar
  contactos, sin alta de empleados ni documentos; el detalle del empleado
  también es de lectura.
- Generales: razón social, RFC, dirección, REPSE con vigencia, objeto social y
  actividad preponderante (el texto cambia según sea cliente o contratista) y
  **un solo contacto**: el representante legal.
- Contratista: botón "Ver cumplimiento" (ícono folder-check) junto a las
  vistas; lleva a la pestaña Cumplimiento (matriz de ME-07 acotada a ese
  contratista). Panel lateral "Cumplimiento documental" con anillos y lista de
  pendientes; si hay, botón "Enviar Notificación" (modal F0-15, correo al
  representante legal, MX-03).
- **Cliente**: el botón "Ver cumplimiento" se oculta (`ctrKind === "cli"`) y
  en la lista R-04 el % no es clicable. En Cumplimiento y en el detalle de contrato el
  acento pasa a morado (cliente) o naranja (contratista).

**Inconsistencias del diseño (para decidir antes de construir)**
- El panel lateral Cumplimiento documental y "Enviar Notificación" salen
  también en Cliente: `ctrDPend` no revisa `ctrKind`. La tarea pide
  ocultarlos en Clientes.
- En Cliente se siguen mostrando Empleados, Documentos y Activos; la tarea no
  dice si deben ocultarse.
- Empleados, Documentos y Activos se reparten por `ctrKeep` (hash de demo):
  en producción deben filtrarse por la relación real.

**No está en el diseño**
- Pestaña de Incidencias & Fallas ni de Sanciones a nivel contratista (ver
  R-07).
- Árbol de subcontratistas (R-08).

## Qué reusa (no rehacer)

- Pantalla Mi empresa (Generales, Empleados, Documentos, Activos): ME-01,
  ME-03, ME-06, ME-08
- Lista de contratos: ME-09 · Panel lateral con tabs: F0-07
- Modal de notificar: F0-15 · Etiquetas espejo y modo: F0-03

## Fuera de esta tarea

- Lista de Clientes/Contratistas: R-04
- Incidentes/Fallas y Sanciones: R-07
- Cumplimiento de contratistas (matriz): MX-01
- Notificar incumplimientos: MX-03
- Árbol de subcontratistas: R-08
