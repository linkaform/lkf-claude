# F0-07 · Base · Panel de detalle lateral

> Ficha de diseño de la tarea F0-07 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** panel de detalle lateral redimensionable con tabs.
**Tipo:** front · **Depende de:** F0-05.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verlo en el navegador:
Mi empresa → **Empleados** → abrir un empleado (el ejemplo con más tabs);
**Documentos** → abrir un documento (cabecera con acciones y versiones).

| Panel | Líneas | Variable | Tabs |
| --- | --- | --- | --- |
| Empleado (el más completo) | 3906–4213, 8255, 8375 | `edEOpen`, `edResize` | Generales, Centros, Documentos, Contratos, Sesiones, Sanciones, Configuraciones (con contador) |
| Documento | 3779–3825, 7908, 7920 | `dcPOpen`, `dcResize` | Generales, Versiones |
| Activo | 3658–3724, 8076, 8110 | `avPOpen`, `avResize` | Generales, Mantenimientos, Concesiones |
| Requerimiento | 1972–2049, 6736 | `rqDetOpen`, `rqDResize` | Generales, Aplicación |
| Servicio / Perfil | 2050–2091, 7681 | `svDetOpen`, `svDTabs` | Generales, Aplicación |
| Sesión | 2111–2159, 7505, 7512 | `ssnDetOpen`, `ssnTabs` | Generales, Temario (si es curso), Recursos (si hay), Participantes |
| Periodo de acuse (sin tabs) | 4310–4328, 6408 | `cmDetOpen`, `cmDResize` | — |
| Animación de entrada y salida | 6685, 6762 | `panelIn`, `panelOut` | — |
| Cierre al hacer clic fuera | 6686–6692 | `edOutside`, `dcOutside` | — |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Contenedor:** panel fijo a la derecha, alto completo, sobre un velo
(`rgba(15,23,42,.2)`). Entra deslizando desde la derecha (320 ms) y sale
(260 ms) con el velo desvaneciéndose. Un solo componente para todos los
paneles: cambia el contenido, no la mecánica.

**Redimensionar:** asa vertical en el borde izquierdo ("Arrastra para ajustar
el ancho"). Ancho inicial 640 px, mínimo 480, máximo el menor entre 1440 y el
ancho de ventana menos 40. El ancho es **uno solo para todos los paneles**
(`tdW`) y se guarda en `localStorage` con la clave `c10-detail-w`. El
contenido se adapta al ancho (el panel de empleado calcula columnas de
Centros según `tdW`).

**Cabecera:** nombre o título, folio, chip de estatus y versión, y botones de
ícono (abrir en pestaña, descargar, revisar, cerrar). Debajo, la fila de tabs
con subrayado de acento y, cuando aplica, contador por tab.

**Pie:** botón "Cerrar" y la acción principal de la entidad (por ejemplo
"Revisar Documento" solo si está Por revisar).

**Comportamiento por vista:** en cards o lista el velo bloquea la pantalla y
cierra al hacer clic en él; en vista **tabla** el velo es transparente y no
captura clics, así la tabla sigue usable y el panel cierra al hacer clic
fuera (se exceptúa el ícono de ojo, para poder cambiar de fila).

**Modo solo lectura:** dentro de un contrato o del detalle de otra empresa el
panel de empleado oculta la edición, y esconde las tabs que no aplican
(Contratos dentro de un contrato; Configuraciones en el detalle de otra
empresa).

**Contenido por tab:** lo define cada tarea (ver abajo). Esta ficha cubre
solo contenedor, cabecera, tabs, redimensionado y cierre.

## Qué reusa (no rehacer)

- Botones, chips, toast y modales: F0-05 · Acento por modo: F0-03

## Fuera de esta tarea

- Contenido de Documentos y revisar/versiones: ME-06, F0-13
- Contenido del empleado: ME-04, ME-05 · Activos: ME-08
- Requerimientos, servicios, perfiles: CF-01, CF-02 · Sesiones: CF-03, CF-04
- Periodo de acuse: ME-07
