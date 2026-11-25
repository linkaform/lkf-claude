# CF-02 · Configuración · Servicios, Perfiles y Equipos

> Ficha de diseño de la tarea CF-02 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** un solo componente para Servicios, Perfiles y Equipos: alta,
ligar requerimientos, pestaña Aplicación.
**Tipo:** full-stack · **Depende de:** CF-01.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
**Configuraciones → Servicios** y **Configuraciones → Perfiles**. **Equipos
no está en el menú** (4888–4893 solo trae Requerimientos, Servicios, Perfiles
y Sesiones); la pestaña existe en la pantalla (`ET` en 7170) y se alcanza
cambiando de pestaña dentro de Configuraciones.

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Menú | 4888–4893 | `openEcfg` (7152) |
| Marco y pestañas (Requerimientos, Servicios, Perfiles, Equipos, Sesiones) | 1824–1851 | `{{ ecTabs }}` |
| Tabla de servicios/perfiles | 1868–1880 | `{{ ecIsServ }}`, `{{ svRows }}` |
| Tabla de equipos (con Tipo y Categoría) | 1867 | `{{ ecIsEq }}` |
| Botón flotante "Nuevo Servicio / Perfil / Equipo" | 3409 | `{{ rfabShow }}`, `{{ rfabL }}` |
| Panel de detalle (Generales / Aplicación) | 2050–2091 | `{{ svDetOpen }}` |
| Tooltip de cumplimiento por contrato | 2092–2095 | `{{ svTipOpen }}` |
| Modal "Ligar requerimientos" | 2096–2110 | `{{ svLkOpen }}` |
| Modal alta/edición | 2303–2323 | `{{ svEdOpen }}` |
| Lógica común | 7640–7767 | `svVals()` |
| Datos semilla | 4823, 4825, 4836 | `EQ_SEED`, `PF_SEED`, `SV_SEED` |
| Categorías y tipos | 4820–4822 | `SV_CATS`, `EQ_CATS` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

La misma pantalla cambia etiquetas y campos según la pestaña (`svLblName`,
`svHasTp`, `svHasCat`).

**Lista**
- Columnas: Acciones (ver, editar), nombre, descripción, categoría (no en
  Perfiles), tipo (solo Equipos: Equipo / Vehículo) y chips de requerimientos
  por ámbito con contador (Empresa, Persona, Equipo) y tooltip con sus
  nombres; "---" si no tiene.
- Búsqueda; filtros con contador: Servicios por Categoría y Ámbito de
  requerimientos; Perfiles por Tipo de requerimiento y Limitantes; Equipos
  por Tipo, Categoría, Tipo de requerimiento y Limitantes.
- Paginación y estados vacíos como en CF-01.

**Alta / edición (modal)**
- Nombre (obligatorio), Tipo (Equipos), Categoría (Servicios y Equipos, la
  de Equipos depende del tipo), descripción y **Requerimientos**: tabla con
  filtros, buscador y "seleccionar todos". Al menos uno es obligatorio.
- Perfiles solo ofrece requerimientos de ámbito Persona; Equipos solo de
  ámbito Equipo; Servicios ofrece todos.

**Detalle**
- Generales: nombre, tipo, categoría, descripción.
- Aplicación, sub-pestañas **Requerimientos** (con "Ligar Requerimientos" y
  quitar con círculo menos; columnas requerimiento, descripción, vigencia,
  ámbito, tipo, limitante) y **Contratos** (folio, contrato, contratista,
  cumplimiento con tooltip por documento).
- **Ligar requerimientos** (modal): buscador, seleccionar todos, "N
  seleccionados", solo los aún no ligados; vacío: "Todos los requerimientos
  ya están ligados a este …". Tras guardar resalta lo ligado y avisa con
  toast.
- Eliminar: confirmación con los contratos donde se usa; se quita de todos.

## Qué reusa (no rehacer)

- Tabla, modales, toast: F0-05 · Filtros: F0-06 · Panel lateral: F0-07
- Modal de selección para ligar: F0-15
- Requerimientos que se ligan: CF-01 · Modelo: F0-01

## Fuera de esta tarea

- Alta de requerimientos: CF-01.
- Cantidades de perfiles y equipos dentro de un contrato: ME-12 y ME-11.
- Activos reales (equipos, vehículos, herramientas de la empresa): ME-08.
- Duda: el menú no expone Equipos; confirmar si se agrega al menú o queda
  como pestaña interna.
