# F0-04 · Base · Mega menú

> Ficha de diseño de la tarea F0-04 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** mega menú (Mi empresa, Clientes, Contratistas, Configuración),
rutas y `RequireMenuAccess`.
**Tipo:** front · **Depende de:** F0-03.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verlo en el navegador:
cabecera superior, pasar el cursor sobre **Mi empresa**, **Clientes** o
**Contratistas**.

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Datos del menú (todas las entradas, columnas, grupos y acciones) | 4874–5000 | `DATA` |
| Mi empresa (incluye Configuraciones) | 4875–4894 | `DATA[0]` |
| Clientes / Contratistas (menú de primer nivel) | 4976–4995 | `DATA` |
| Bitácoras repite columnas Clientes y Contratistas | 4914–4961 | `DATA` |
| Panel de escritorio (columnas, acción, ítems, grupos, Configuración/Reportes) | 100–170 | `hdr.menus`, `menu.isOpen`, `col.*` |
| Menú móvil | 374–435 | `menu.mOpen` |
| Lógica: abrir con hover, ruteo de cada título, ítem y acción | 5172–5207 | `hdrVals`, `go`, `actGo` |
| Rutas de Mi empresa y de Clientes/Contratistas | 7735, 7741 | `empRoute`, `ctrRoute` |
| Pantalla de Configuraciones (pestañas) | 7152–7154, 7170 | `openEcfg`, `ET` |
| Buscador global de acciones (se alimenta de `DATA`) | 5226–5250 | `ACTIONS` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Estructura:** cada entrada de primer nivel abre un panel con columnas.
Cada columna tiene título (clicable), acción de alta con ícono (`+` crear,
subir, o sobre de correo para invitar), ítems de filtro (Activos, Inactivos…)
y grupos con su propia acción e ítems. Hay bloques "Configuración" y
"Reportes" al pie de columna.

**Mi empresa:** Generales (grupo Cumplimiento documental con acciones Subir
Acuse, Generar Cumplimiento, Descargar Cumplimiento Masivo), Ubicaciones
(+ Áreas), Empleados (+ Usuarios), Documentos, Activos, Contratos y
Configuraciones (Requerimientos, Servicios, Perfiles, Sesiones).

**Clientes:** Clientes (acción *Invitar Cliente*), Contratos (*Nuevo
Contrato*), Ubicaciones, Empleados, Documentos, Incidentes/Fallas (*Nueva
Sanción*), Equipos. **Contratistas:** igual, con *Invitar Contratista*, el
grupo **Cumplimiento de contratista** (Por revisar, Aceptados, Rechazados,
Vencidos, Por subir, No entregados, No aplica) y los mismos ítems.

**Qué navega de verdad:**
- Clientes: solo Clientes y Contratos. Contratistas: Contratistas, Contratos
  y Empleados, más Cumplimiento de contratista. El resto de ítems del menú
  no tiene pantalla en el diseño (solo un aviso "Abriendo: …").
- Mi empresa: cada título lleva a su pestaña; los ítems aplican el filtro
  (por ejemplo Contratos → Por vencer).
- Configuraciones: cualquier ítem abre la pantalla de configuración en la
  pestaña Requerimientos (Documentos / Exámenes / Inspecciones filtran por
  tipo). Servicios, Perfiles y Sesiones del menú **no navegan** en el
  diseño; se llega a ellos con las pestañas de esa pantalla (Requerimientos,
  Servicios, Perfiles, Equipos, Sesiones).

**Menú de primer nivel "Configuración":** en el diseño no existe como
entrada propia; es la columna Configuraciones dentro de Mi empresa. El
"Configuración" de la cabecera de perfil es el módulo general de Clave 10 y
queda fuera.

**RequireMenuAccess:** No está en el diseño. Definir con la tarea qué
oculta el menú según el permiso (ver F0-03 para los modos).

## Qué reusa (no rehacer)

- Contexto de modo y etiquetas espejo: F0-03

## Fuera de esta tarea

- Contenido de cada pantalla a la que lleva el menú: ME-*, R-*, CF-*, MX-*.
- Las demás entradas del menú (Accesos, Pases, Bitácoras, Seguridad,
  Activos, Reportes) y el Inicio.
