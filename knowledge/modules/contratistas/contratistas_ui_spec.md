# Clave 10 · Especificación de UI (Inicio.dc.html)

Fuente de verdad del look & feel de la plataforma web Clave 10. Toda pantalla nueva sigue exactamente estas reglas. Las capturas que comparta el usuario indican contenido y estructura, no estilo. Ante cualquier duda, preguntar.

Este documento sirve para actualizar el Clave 10 Design System según el proyecto actual. Cuando una regla del sistema de diseño anterior no coincide con este documento, este documento manda. Decisiones ya tomadas:
- Lienzo de la app: gris #F3F5F8, no blanco.
- Anillo de foco: `0 0 0 3px rgba(59,130,246,.15)` + borde #2F80ED.
- Encabezado de tabla: peso 600 y color #475569, no 700 ni azul marino.

---

## 1. Fundamentos

### 1.1 Tipografía
- Familia única: `Arial, Helvetica, sans-serif`, sin webfonts. Las cifras y folios usan `font-variant-numeric: tabular-nums`.
- Escala:

| Uso | Tamaño / peso | Color |
|---|---|---|
| Título de pantalla | 24px / 600, tracking -0.02em | #0F172A |
| Título de sección / panel / modal | 20px / 600, tracking -0.02em | #0F172A |
| Subtítulo de tarjeta | 18px / 600, tracking -0.01em | #0F172A |
| Título de bloque | 16px / 600 | #0F172A |
| Texto base, botones, inputs, celdas | 14px / 400–500 | #171717 (texto), #0F172A (dato) |
| Texto secundario / opciones de menú | 13px / 500 | #475569 |
| Metadatos, ayudas, hora | 12px / 400 | #64748B o #94A3B8 |
| Chips, KPI, etiquetas de campo | 11px / 600 | según el componente |
| Encabezado de tabla | 12px / 600 uppercase, .05em | #475569 |

- Pesos: 400 (normal), 500 (medium), 600 (semibold, por defecto en énfasis), 700 (solo títulos de login y cifras grandes).
- Textos largos: `text-wrap: pretty`, `line-height: 1.45`.

### 1.2 Color

| Rol | Valor |
|---|---|
| Acción / selección (primario) | #2F80ED · hover #1E6FDB |
| Azul sutil (fondos activos, hover de opción) | #EFF6FF |
| Azul claro (encabezado de tabla, chip KPI, hover de ícono) | #DBEAFE · borde #BFDBFE |
| Azul texto sobre azul claro | #1E6FDB |
| Marca (azul marino) | #192A4E |
| Crear / éxito | #16A34A · hover #15803D · fondo #DCFCE7 / rgba(22,163,74,.12) |
| Destructivo / error | #DC2626 · hover #B91C1C · fondo #FEE2E2 · borde #FECACA |
| Advertencia / pendiente | #F59E0B · texto #B45309 · fondo rgba(245,158,11,.14) |
| Título / dato | #0F172A |
| Texto de interfaz | #171717 |
| Etiquetas y secundario | #334155 / #475569 |
| Metadatos | #64748B |
| Placeholder, íconos inactivos, nombres de campo | #94A3B8 |
| Separadores fuertes | #CBD5E1 |
| Bordes de control y tabla | #E2E8F0 |
| Bordes de tarjeta | #E5E7EB |
| Fondo de botón de ícono / zona hundida | #F1F5F9 · hover #E2E8F0 |
| Fondo de cuerpo de panel | #F8FAFC |
| Skeleton | #EEF2F6 |
| Lienzo de la app (fondo de toda pantalla) | #F3F5F8 |
| Superficie | #FFFFFF |

- La acción de crear es siempre verde (#16A34A) con ícono "+"; el azul es para navegar, seleccionar y confirmar.
- No uses gradientes decorativos, emoji ni SVG dibujado a mano. Los íconos son de lucide, con trazo de 2px.

### 1.3 Espaciado y tamaños
- Ritmo de 4px, con paradas en 2, 4, 6, 8, 10, 12, 16, 20 y 24px.
- Alto de controles: 40px estándar (inputs, selects, tabs, botones principales); 36px para acciones compactas; 32px para botones de ícono y botones dentro de tooltips; 28–30px para chips de filtro; 22px para chips de dato.
- Padding: tarjeta 20px; modal 24px; gutter de página 24px.
- Separación entre controles de una barra: 8px. Entre tarjetas: 12–16px.

### 1.4 Radios
- Pill (999px): chips, avatares, botones de ícono fuera de tablas y switches.
- 8px: botones, inputs, selects, botones de ícono en tablas, opciones de menú.
- 12px: tarjetas de listado, tablas, menús desplegables.
- 14px: tooltips.
- 16px: modales, panel de comentarios, popovers grandes.
- 20px: secciones / tarjetas grandes de Inicio, pastillas de evidencia.
- 5px: checkboxes.

### 1.5 Elevación

| Nivel | Valor |
|---|---|
| Reposo de sección | `0 1px 2px rgba(15,23,42,.04), 0 6px 20px rgba(15,23,42,.04)` |
| Hairline como sombra | `0 0 0 1px #E2E8F0` (tablas) / `0 0 0 1px #E5E7EB` (tarjetas) |
| Tarjeta en reposo | `0 1px 2px rgba(15,23,42,.06), 0 4px 10px rgba(15,23,42,.06)` |
| Tarjeta en hover | `0 2px 4px rgba(15,23,42,.06), 0 14px 30px rgba(15,23,42,.12)` |
| Menú / popover | `0 0 0 1px #E2E8F0, 0 12px 28px rgba(15,23,42,.12)` |
| Tooltip | `0 12px 32px rgba(15,23,42,.16)` |
| Modal | `0 20px 40px rgba(15,23,42,.25)` |
| Botón flotante azul | `0 4px 12px rgba(47,128,237,.3)` |
| Anillo de foco | `0 0 0 3px rgba(59,130,246,.15)` + borde #2F80ED |
| Selección (active) | `0 0 0 2px #2F80ED` |

No uses glow de color ni sombras internas, salvo el hairline `inset 0 0 0 1px`.

### 1.6 Movimiento
- Curva única: `ease-in-out`.
- Duraciones: 150ms para color, fondo y borde de controles; 200ms para menús, rotación de chevron y fades; 250ms para superficies y paneles.
- Animaciones del archivo:
  - `c10-menu-in`: fade + translateY(8px) → 0, 200ms.
  - `c10-fade-in`: overlays.
  - `c10sk`: skeleton.
  - `c10spin`: carga.
  - `c10live`: pulso verde de "en vivo".
  - `c10-pend-in` / `c10-pend-out`: filas que entran y salen.
  - `c10bounce`: reacomodo al eliminar.
- Al eliminar un registro de una lista, la fila sale y las de abajo suben con un rebote suave.
- No hay escala de "press" en botones. Las tarjetas sí tienen un estado active (ver Cards).

---

## 2. Layout

- Cabecera principal: sticky `top: 0`, 64px, fondo blanco, borde inferior #E5E7EB, z-index 40.
  - Izquierda: logo (24px de alto) | separador vertical de 1px | selector de ubicación (36px).
  - Derecha: mega menú → notificaciones → avatar.
- Lienzo gris #F3F5F8 en todas las pantallas; las superficies (tarjetas, tablas, paneles) son blancas sobre ese gris. Las secciones nuevas (a partir de Mi empresa) ocupan todo el ancho disponible, sin max-width, y siempre son responsive.
- Quedan fijos la cabecera, el título de la sección y los paneles de navegación de sección (p. ej. el menú lateral de Configuración). Al hacer scroll solo se mueve el área de contenido.
- Contenido fluido: `minmax(0,1fr)` y grids que hacen wrap. No uses anchos fijos en cajas con texto.
- Breakpoint de filtros: en pantallas de menos de 1100px, el panel lateral se sustituye por el botón de filtros.

### Cabecera de sección
- Izquierda: título (20px/600) + chip KPI.
- Derecha, en este orden: botón de filtros (si aplica) → buscador → acción verde "+" (si se puede crear) → tabs de subnavegación → tabs de modo de vista.

---

## 3. Componentes

### 3.1 Botones

| Tipo | Especificación |
|---|---|
| Primario | 40px, padding 0 18px, radio 8, fondo #2F80ED, texto #FFF 14/600; hover #1E6FDB |
| Crear | igual que primario, con fondo #16A34A, hover #15803D e ícono "+" 16px |
| Destructivo | fondo #DC2626, hover #B91C1C, texto blanco |
| Cancelar | fondo #F1F5F9, sin borde, texto #334155 14/500; hover #E2E8F0 |
| Secundario contorno | fondo #FFF, borde 1px #E2E8F0, texto #334155; hover borde e ícono #2F80ED |
| Texto inline (Editar, Agregar, dentro de secciones/acordeones) | sin fondo, texto #2F80ED 14/600 con ícono 14–16px; hover solo subrayado (abarca ícono y texto) |
| Ver más / Ver menos | ancho completo, 36px, transparente, texto #2F80ED 13/600 + chevron (rota 180° en "Ver menos"); hover fondo #EFF6FF; va al pie del listado, sobre un borde superior #F1F5F9 |

- Etiquetas en Camel Case, con verbo + objeto: "Guardar Cambios", "Nuevo Pase".
- Deshabilitado: opacidad 0.4–0.5, `cursor: not-allowed`. Nunca se oculta.
- Los botones del pie (p. ej. Cerrar + acción principal) siempre tienen el mismo ancho (`flex: 1`), sin importar el texto.
- Las acciones destructivas o de cambio de estado (eliminar, desactivar, activar, etc.) siempre piden confirmación con modal.

### 3.2 Botones de ícono
- Siempre 32×32 con ícono de 16px.
- Circulares (999px) en todas partes excepto en tablas, donde llevan radio 8px.
- Normal: fondo #F1F5F9, ícono #475569; hover fondo #DBEAFE, ícono #2F80ED.
- Dentro de cards (no aplica a cards de vista/listado): solo el ícono, sin fondo, en #94A3B8. En hover cambia el color del ícono: azul #2F80ED, o rojo #DC2626 para eliminar.
- Tooltip nativo (`title`) en botones de ícono sueltos y en los checkboxes de "Seleccionar todos".

### 3.3 Inputs, selects y fechas
- 40px, padding 0 12px, radio 8, borde 1px #E2E8F0, fondo #FFF, 14px.
- Placeholder o valor vacío en #94A3B8; el texto es #0F172A solo cuando el campo tiene información.
- Focus: borde #2F80ED + anillo `0 0 0 3px rgba(59,130,246,.15)`, sin outline.
- Error: borde #DC2626 + mensaje 12px #DC2626 debajo.
- Buscador: ícono search de 16px #94A3B8 a 12px de la izquierda; padding izquierdo 36px. En cabeceras de sección va a la izquierda de las tabs.
- Dropdown:
  - El chevron de 16px (#94A3B8) gira 180° y se pone azul #2F80ED al abrir; regresa al cerrar.
  - El menú se abre 6px debajo del control: fondo #FFF, radio 12, padding 4, sombra de menú, animación `c10-menu-in`.
  - Opción: 34px, radio 8, 14px; hover #F1F5F9; la seleccionada lleva fondo #EFF6FF, texto #2F80ED 600 y check a la derecha.
  - Se cierra al hacer clic fuera.
- Textarea: radio 12, mismo borde y foco que los inputs.

### 3.4 Checkbox, radio y switch
- Checkbox:
  - 20×20, radio 5, borde 1.5px #CBD5E1, fondo #FFF.
  - Marcado: fondo y borde #2F80ED, check blanco de 13px.
  - Indeterminado: guion blanco.
- Switch de estado: track pill (#CBD5E1 apagado, #2F80ED encendido) y perilla blanca de 14px con sombra `0 1px 2px rgba(15,23,42,.2)`; `transition: left 150ms`.
- Selector segmentado de permiso (Escritura / Solo lectura):
  - Pastilla gris #F1F5F9.
  - Opción activa: pill #2F80ED, texto blanco 11/600, sombra `0 1px 2px rgba(47,128,237,.35)`.
  - En modo solo lectura se muestra únicamente la opción activa, como pill azul estático.

### 3.5 Tabs
- Grupo unido, 40px de alto, separadores #E2E8F0, borde exterior 1px #E2E8F0, radio 8.
- Activa: fondo #2F80ED, texto #FFFFFF, peso 600. Inactiva: fondo #FFFFFF, texto #475569, peso 500; hover texto #2F80ED.
- Tabs de tarjeta (dentro de secciones de Inicio, p. ej. Últimos movimientos / Mis tareas): subrayado de 2px #2F80ED en la activa, gap 20px y línea base `inset 0 -1px 0 #E5E7EB`.
- Los contadores nunca van en las tabs; van en el título.

### 3.6 Chips

| Chip | Especificación |
|---|---|
| Base | 22px, padding 0 9px, pill, 11px/600, `white-space: nowrap` |
| Estado | bolita de 6px del color fuerte + texto; fondo tenue del mismo tono |
| Folio | siempre con "#" (p. ej. #I-0584); fondo #DBEAFE, texto #1E6FDB, cifras tabulares |
| Prioridad | Alta: fondo #FEE2E2, texto #B91C1C, bolita #DC2626 · Media: fondo rgba(245,158,11,.14), texto #B45309, bolita #F59E0B · Baja: fondo #F1F5F9, texto #475569, bolita #94A3B8 |
| Tipo / categoría | fondo #F1F5F9, texto #334155 |
| KPI junto al título | "N registros" (singular "1 registro"); 11px/600, #1E6FDB sobre #DBEAFE, pill |
| Filtro (seleccionable) | 30px, padding 0 8px 0 12px, pill, 13px; inactivo #F1F5F9 / #334155 / 500; activo #2F80ED / #FFF / 600 con contador |

Colores de los estados:
- Abierta / Abierto: rojo, texto #B91C1C sobre #FEE2E2, bolita #DC2626.
- En progreso / En proceso: azul, texto #1E6FDB sobre #DBEAFE, bolita #2F80ED.
- Cerrada / Activo / Vigente: verde, texto #15803D sobre #DCFCE7, bolita #16A34A.
- Pendiente / Por vencer: ámbar, texto #B45309, bolita #F59E0B.
- Inactivo: texto #475569 sobre #F1F5F9, bolita #94A3B8.

Los estados se escriben en sentence case ("En proceso"). Nunca uses `text-transform: capitalize`.

### 3.7 Tooltip (componente)
- Look de "Registra tu asistencia":
  - Tarjeta blanca, radio 14, padding 14px 14px 14px 16px, sombra de tooltip.
  - Flecha: cuadro de 12px rotado 45°.
  - Ícono en cuadro gris (32px, radio 10, #F1F5F9, ícono de 16px #64748B).
  - Título 14/600 #0F172A, texto 13px #64748B; botón opcional de 32px.
  - Cierre "x" de 24px #94A3B8.
  - Entra con `c10-menu-in`.
- Los botones de ícono y "Seleccionar todos" usan el tooltip nativo (`title`), no este componente.

### 3.8 Toast
- Posición: fijo abajo a la derecha (24px); máximo 360px.
- Tarjeta: blanca, borde #E5E7EB, radio 12, padding 14, sombra `0 10px 15px -3px rgba(15,23,42,.08), 0 4px 6px -4px rgba(15,23,42,.06)`.
- Ícono de 32px en cuadro de radio 10. Texto 14px.
- Animación `c10-menu-in`; se cierra sola a los 3 s aprox.
- Redacción impersonal: "Se copió el RFC", "Se guardó el registro".

### 3.9 Modales (creación y confirmación)
- Overlay `rgba(15,23,42,.45)` con fade de 200ms, sin blur.
- Caja: centrada, 560px (confirmación 420–480px), `max-width: calc(100% - 32px)`, radio 16, padding 24, gap 16, sombra de modal.
- Título 20px/600 #0F172A; descripción 14px #475569.
- Etiquetas de campo: uppercase, 11px, semibold (600), #334155. Campo obligatorio: asterisco rojo #DC2626 junto a la etiqueta.
- Texto de ayuda o aviso como label de consejo azul:
  - Fondo #EFF6FF, borde 1px #BFDBFE, texto #1E6FDB 12–13px, ícono info, radio 8.
  - `width: fit-content`: mide solo lo que ocupa su texto, no todo el ancho disponible.
- Pie: Cancelar (gris) + acción principal, de ancho igual. En confirmaciones destructivas, la acción va en rojo.

### 3.10 Paneles de detalle
- Lateral derecho:
  - Al abrir entra deslizándose hacia la izquierda; al cerrar sale deslizándose hacia la derecha (250ms).
  - Overlay `rgba(15,23,42,.2)` con fade, para seguir viendo los registros de abajo.
- Ancho ajustable arrastrando el borde izquierdo: 480–1440px, 640px por defecto. Se recuerda en `localStorage` con la clave `c10-detail-w`.
- Excepción — detalle abierto desde una vista de tabla: sin overlay y sin bloquear clics, para cambiar de registro sin cerrar el panel. Un clic fuera (que no sea otro botón eye) lo cierra.
- Cabecera:
  - Título primero (20px/600), sin antetítulo; debajo, chips de folio, estado y prioridad.
  - Acciones del registro arriba a la derecha, solo ícono (32px, circulares, #F1F5F9), p. ej. Editar, Imprimir, Eliminar. Van separadas del botón cerrar por una línea vertical #E2E8F0.
  - Toda acción del registro (incluido el toggle Activo/Inactivo) va en la cabecera, nunca en el cuerpo.
  - Título editable (opcional, según el registro): ícono pencil junto al título → input en línea (Enter guarda, Esc cancela).
- Cuerpo sobre #F8FAFC con tarjetas blancas (radio 12, padding 20, hairline #E5E7EB).
  - Nombre de campo: uppercase, 11px, 500, #94A3B8, .05em.
  - Dato: 14px, 500, #0F172A. El protagonista es el dato, no el nombre del campo.
  - La descripción va dentro de la misma tarjeta de datos, separada por una línea #E2E8F0.
- Al ensanchar el panel, imágenes y tarjetas de archivo mantienen su tamaño (no crecen); caben más por fila.
- Acciones dentro del panel (confirmaciones y modales, p. ej. Remover, Ligar contrato, Sanción): el oscurecido cubre toda la pantalla (`rgba(15,23,42,.45)`, fade), no solo el panel; el modal siempre va centrado en la pantalla.
- Modo solo lectura (p. ej. el detalle de un empleado abierto desde un contrato):
  - Se muestra solo lo asignado: sin checkboxes, "Seleccionar todos" ni controles de edición.
  - Los elementos asignados conservan el look de "seleccionado".
  - El centro predeterminado se marca con estrella ámbar #F59E0B (18px).

### 3.11 Folios
- Nomenclatura por sección, sin ceros a la izquierda: Activos A-35, Empleados E-101, Documentos D-XXXX. Incidencias, fallas y mantenimientos usan I- / F- / M-.
- En listados, el folio solo aparece en Lista de cards y Tabla (no en cards compactas).

---

## 4. Tablas
- Contenedor:
  - Directo sobre el fondo gris, sin card blanca contenedora (excepto Configuración).
  - Radio 12 y hairline `0 0 0 1px #E2E8F0`.
  - Preferir columnas fluidas (`minmax(px, 1fr)`) para evitar scroll horizontal; si existe, va sincronizado entre encabezado y cuerpo.
- Encabezado:
  - Uppercase, 12px, peso 600 (no 700), color #475569 (no azul marino), letter-spacing .05em, fondo #DBEAFE.
  - Sticky bajo la cabecera de sección. El scroll vertical es el de la pantalla, no dentro de la tabla.
- Filas: texto 14px; divisores 1px #F1F5F9 / #E2E8F0; hover #F8FAFC.
- La columna de botones se llama **ACCIONES** y va primero. El botón eye (Ver detalle) es el primero de ACCIONES.
- En tablas anchas, las dos primeras columnas (ACCIONES y la principal) quedan fijas al hacer scroll horizontal.
- Formatos:
  - Fechas en aa-mm-dd (p. ej. 26-10-21). Fecha y hora: "26-10-30 · 12:00".
  - Celda vacía: "---".
- CURP, NSS y RFC llevan ícono para copiar (14px #94A3B8 → #2F80ED) y toast "Se copió el …".
- Paginación debajo de la tabla, estilo de Bitácoras: Mostrar 10/25/50 · rango "1 - 10 de N registros" · flechas y números (botones de 32px, radio 8; el activo en #2F80ED con texto blanco).
- Selector de periodo dentro de la celda del encabezado (p. ej. Cumplimiento): dropdown compacto de 32px y 12px, junto al checkbox de "Seleccionar todos".
- Skeleton de carga: bloques #EEF2F6 con `c10sk 1.2s`.

---

## 5. Listados y filtros

### Modos de vista
Hay tres modos, en este orden: Cards compactas → Lista de cards → Tabla. Las acciones son las mismas y van en el mismo orden en los tres modos.

### Cards
- Superficie blanca, radio 12, borde 1px #E5E7EB, sombra de tarjeta.
- Hover: efecto botón, sube 3px (`translateY(-3px)`) con sombra de hover; el borde se mantiene #E5E7EB (sin contorno azul).
- Active (al presionar): anillo azul de 2px #2F80ED y vuelve a su posición.
- Clic en la card abre su panel de detalle; los botones internos no propagan el clic.
- El botón Ver detalle / Visualizar (eye) solo existe en vista de tabla; en cards no se incluye.
- Cards compactas: separación entre campos de 6px; el bloque de título (nombre + chips) lleva 4px extra abajo (`margin-bottom: 4px`).
- Lista de cards: los contratos se muestran como botones inline (texto #2F80ED, peso normal, hover subrayado); si son varios, van separados por comas.

### Filtros
- Panel lateral (Cards compactas, Lista de cards y Tabla; pantallas de 1100px o más):
  - Es el mismo componente en las tres vistas: fijo a la izquierda (sticky, fondo blanco, 280px, radio 16).
  - El contenido (cards o tabla) va directo sobre el fondo gris, sin contenedor blanco, y se alinea con el título cuando el panel está oculto.
  - Sin botón de filtros en la cabecera.
  - Estado por defecto según la vista: abierto en Cards compactas y Lista de cards; cerrado en Tabla, Calendarios y Gráficos. Si el usuario lo abre o cierra, esa elección se conserva al cambiar de vista.
  - Se oculta con un botón chevron junto al título "Filtros". Al ocultarse se encoge en su lugar (clip-path + ancho, 250ms, `ease-in-out`) hasta desaparecer por completo; no deja riel. Nunca se desliza fuera del panel.
  - Al ocultarse o mostrarse, el contenido se reacomoda con animación de 250ms: las cards con FLIP (atributo `data-fsflip` en cada card); la tabla se ensancha o se angosta con el panel. Aplica a toda sección nueva.
- Botón de filtros: media pastilla azul (en todas las vistas con panel lateral).
  - 38×52px, `position: fixed`, `left: 0`, radio `0 999px 999px 0`, fondo #2F80ED (hover #1E6FDB).
  - Ícono sliders-horizontal blanco de 18px y sombra de botón flotante.
  - Badge con el número de filtros: fondo rojo #DC2626, 18px, texto blanco 11/600.
  - Solo es visible cuando el panel está oculto; al abrirlo, la pastilla se oculta. Al presionarla, abre el panel.
  - Por defecto aparece al centro de la pantalla (`top: 50%`). Se puede arrastrar únicamente en vertical para no tapar registros; no sube más allá del encabezado fijo (cabecera de sección o encabezado de tabla) ni baja fuera de la pantalla. Un clic abre los filtros; un arrastre no. La posición se conserva al cambiar de sección.
  - Nunca se mueve con el scroll.
- Cajón de filtros (pantallas de menos de 1100px, o secciones que solo tienen vista de tabla):
  - Fijo a la izquierda, a todo lo alto, sin radio.
  - Velo blanco `rgba(255,255,255,.72)` sobre toda la pantalla.
  - Secciones separadas por una línea #F1F5F9.
  - Encabezado "Filtros" + badge de activos + "Limpiar".
  - En estas pantallas la media pastilla sigue visible y abre el cajón.
- Botón de filtros en cabecera (pantallas de menos de 1100px y Configuración):
  - Hace match con el buscador: 40×40, radio 8, fondo blanco, borde #E2E8F0, ícono #64748B.
  - Hover: borde e ícono #2F80ED.
  - Focus: borde #2F80ED + anillo de 3px.
  - Con filtros activos: fondo #EFF6FF, borde #2F80ED y badge azul con el número.
  - Siempre va a la izquierda del buscador.
- Todo panel de filtros se cierra al presionar fuera de él.
- Filtro de fecha:
  - Opciones: Todos, Hoy, Ayer, Esta semana, Semana pasada, Últimos 15 días, Este mes, Mes pasado, Este año, Personalizado.
  - Personalizado muestra dos campos de solo fecha: Desde y Hasta.
  - Cuenta como filtro activo cuando no es "Todos".

### Listas dentro de tarjetas de Inicio (Últimos movimientos, Mis tareas)
- Se muestran tantos registros como quepan en el alto disponible, medido por la altura real de cada fila.
- Al pie va "Ver más (N)": cada clic agrega otra página y habilita el scroll interno. "Ver menos" regresa al inicio.

---

## 6. Comentarios y evidencias (tipo chat)
- Uso: registrar comentarios y evidencias dentro de un formulario (p. ej. Levantar/Editar sanción, Seguimiento de tareas). Etiqueta: "COMENTARIOS Y EVIDENCIAS".
- Contenedor: fondo #F1F5F9, sin contorno, radio 16. Al arrastrar archivos encima: borde #2F80ED + anillo de 3px y fondo #EFF6FF.
- Barra inferior, de izquierda a derecha:
  - Agregar fotografía (camera), Agregar video (video) y Adjuntar archivo (paperclip): 40px circulares, fondo blanco, ícono #2F80ED, hover #DBEAFE, tooltip nativo.
  - Separador vertical #CBD5E1.
  - Textarea.
  - Botón derecho.
- Textarea:
  - Alto fijo de 2 filas (62px), fondo blanco, borde 1px #CBD5E1, radio 12; focus con borde #2F80ED + anillo.
  - Placeholder "Escribe un comentario o arrastra archivos aquí".
  - Enter envía; Shift + Enter hace salto de línea.
- Botón derecho (40px circular):
  - Sin texto: micrófono azul (#2F80ED, hover #1E6FDB), "Grabar nota de voz".
  - Con texto: Enviar (send-horizontal).
  - Grabando: rojo #DC2626 con ícono stop, "Detener y enviar".
- Grabación:
  - El textarea se sustituye por un campo blanco con punto rojo pulsante + "Grabando nota de voz · m:ss" y un botón para descartar (trash, gris → rojo en hover).
  - Al detener se envía como mensaje.
- Envío de archivos:
  - Fotos, videos y documentos se envían automáticamente al subirlos, sin presionar Enviar.
  - Mientras suben se muestra una tarjeta con nombre, ícono girando y "Subiendo…".
  - El texto escrito se queda en el campo y se envía por separado.
- Límites: videos 500 MB; otros archivos 50 MB.
- Texto de ayuda bajo el campo (12px #94A3B8): "Enter para enviar · Shift + Enter para nueva línea · Videos hasta 500 MB · otros archivos hasta 50 MB".
- Hilo de mensajes:
  - Va arriba del compositor. Globos alineados a la derecha, fondo blanco, radio `16px 16px 4px 16px`, sombra sutil.
  - Debajo de cada globo: autor · hora (11px #94A3B8) y botón eliminar (trash gris → rojo).
  - Alto máximo 280px con scroll; baja solo al último mensaje.
- Scroll discreto (hilo y textarea): barra de 4px invisible que aparece solo mientras se desplaza (atributo `data-thin-scroll`).
- En Seguimiento:
  - Los mensajes se apilan hasta presionar Guardar, que los registra como un solo avance.
  - Cancelar y Guardar solo aparecen cuando hay contenido.

## 7. Visualización de evidencias
Aplica en todas partes: chat, detalle de modal y detalle de tareas.

- Encabezado del bloque: ícono paperclip #2F80ED (16px) + "Evidencia" (14px/600 #0F172A, sin uppercase) + chip contador (11px/600, #1E6FDB sobre #DBEAFE, pill).
- Se agrupan por tipo; cada grupo va en fila con wrap y gap de 6px.
- Fotos y videos:
  - Miniaturas cuadradas de 112px, radio 8, fondo #F1F5F9 (imagen real en cover).
  - Video con botón play circular al centro (36px, rgba(15,23,42,.72), ícono blanco).
- Notas de voz:
  - Pastilla de 200×40px, radio 20, fondo #F1F5F9 (#DBEAFE al reproducir).
  - Botón play/pausa de 32px #2F80ED (hover #1E6FDB).
  - Onda de barras #CBD5E1, con el avance en #2F80ED.
  - Duración 12px/500 #475569.
- Documentos:
  - Pastilla de 240×48px, radio 20, fondo #F1F5F9 (hover #E2E8F0).
  - Ícono file-text en círculo azul de 32px con ícono blanco.
  - Nombre 13px/500 #0F172A; tamaño 11px #64748B.
  - En hover aparece el botón Descargar (32px circular, transparente, ícono #475569 → hover fondo #DBEAFE, ícono #2F80ED).
- Abrir documento externo: ícono external-link.

---

## 8. Dominio

### Asistencia y turno
- Asistencia: el estatus Disponible / Ausente del menú del avatar.
  - Aplica a Guardia y a Recursos Humanos.
  - Ambos inician en Ausente y ven el tooltip "Registra tu asistencia".
- Check In / Check Out: el flujo de turno, solo en el perfil Guardia. Es independiente de la asistencia.
  - Check In activo: chip verde.
  - Check Out: botón rojo pill de 28px.

### Mis tareas
- Tipos: Mantenimiento, Falla e Incidencia.
- Estados:
  - Toda tarea inicia en Abierta.
  - Pasa a En progreso con el primer avance guardado.
  - Al cerrarse (con confirmación) pasa a Cerrada y sale de la lista con animación.
  - Solo se listan las tareas Abiertas y En progreso.
- Fila de la lista: título, chips de tipo y prioridad, y "Límite aa-mm-dd · hh:mm" con ícono clock (12px/500 #64748B).
- Detalle: tabs Generales y Seguimiento.
- El historial de estatus va del más nuevo al más antiguo; cada paso lleva fecha, persona, comentarios y evidencia.

### Cumplimiento
- Es una vista general de todos los documentos, sin separación Mensual / Cuatrimestral.
- El periodo se elige en el encabezado de la tabla.
- Cada documento muestra su estado según su propia periodicidad: mensual, cuatrimestral (el cuatrimestre que contiene el mes elegido) o permanente.

---

## 9. Redacción
- Español de México, sin mezclar inglés en la interfaz visible.
- Capitalización:
  - Títulos y estados en sentence case.
  - Botones en Camel Case, con verbo + objeto.
  - Encabezados de tabla y nombres de campo en MAYÚSCULAS (vía CSS).
- Al usuario se le habla de tú.
- Confirmaciones impersonales con "se": "Se guardó el registro".
- Estados vacíos y de carga literales: "No se encontraron registros", "Cargando…".
- Cuida acentos y concordancia. Nunca uses emoji.
