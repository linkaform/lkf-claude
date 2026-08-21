# Clave 10 — Sistema de Diseño

**Clave 10** es una plataforma de **seguridad industrial y seguridad patrimonial**: control de accesos y pases de entrada, turnos de guardia, bitácoras fotográficas, incidencias, rondines, artículos (concesionados, perdidos, paquetería), inspecciones y reportes. La desarrolla **LinkaForm** y su lema interno es *"Plataforma diseñada para fortalecer la Seguridad Patrimonial e Industrial"*.

El sistema de diseño nace de la necesidad de ofrecer una plataforma de gestión segura, robusta y eficiente: el **azul marino** representa solidez, los **acentos azules y verdes** guían las acciones del usuario, y las **esquinas redondeadas** suavizan un entorno técnico para convertir una base de datos compleja en una experiencia limpia, intuitiva y muy *scannable*.

## Fuentes utilizadas

| Fuente | Detalle |
| --- | --- |
| Repositorio | https://github.com/linkaform/clave10 — rama `master`. Frontend Next.js 15 (App Router) + React 19 + Tailwind 3 + shadcn/ui (Radix) + lucide-react + TanStack Table/Query + Zustand. **Explóralo para profundizar**: cada pantalla y componente aquí proviene de ese código. |
| `uploads/design-system.css` | Guía de marca oficial v1.0.0 entregada por el equipo (paleta, tipografía, sombras, radios, clases `c10-*`). |
| `uploads/logo.png` | Logo CLAVE 10 (escudo + tipografía). Es la **fuente del mark**: se recortó y se le aplicó fondo transparente → `assets/logo.png`. El `public/logo.svg` del repo resultó inservible (envoltorio de Figma con un raster incrustado sin payload) y no se conserva. |

Producto representado: **la plataforma web** (consola de guardias y supervisores). El alcance de este sistema de diseño es exclusivamente web — no existe repositorio de la aplicación móvil, así que no se recreó ninguna pantalla de app.

## Índice del proyecto

- `styles.css` — punto de entrada único para proyectos consumidores (solo `@import`).
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radii.css`, `elevation.css`, `motion.css`, `fonts.css`.
- `assets/` — `logo.png`, sin `fonts/` — la familia es Arial / Helvetica, presente en todo sistema, `icons/` (21 SVG de módulo del producto), `imagery/` (retratos de ejemplo).
- `components/` — primitivos React (ver abajo).
- `ui_kits/plataforma/` — recreación navegable de la consola (`index.html`).
- `guidelines/` — 16 tarjetas de especímenes (colores, tipografía, espaciado, marca).
- `SKILL.md` — envoltura para usar este sistema como Agent Skill.
- `github.md` — asociación con el repositorio de origen.

## Components

Los primitivos se agrupan por función. Todos se exportan al espacio global del bundle.

- **core/** — `Button`, `Badge`, `EstatusBadge`, `Card` (+ `CardTitle`, `CardDescription`), `Avatar`, `Progress`, `Separator`, `EmptyState`
- **forms/** — `Input`, `Textarea`, `Field`, `Select`, `Checkbox`, `Radio`, `Switch`, `FilterChip`, `FilterPanel` (+ `FilterSection`)
- **data/** — `DataTable` (+ `UserCell`), `RowAction` (+ `RowActions`), `PhotoCard`, `RecordListItem`, `KpiChip`, `StatCard`, `Pagination`
- **navigation/** — `AppHeader`, `SectionHeader`, `SegmentedControl`, `ViewModeIcons` (constante `VIEW_MODES`), `Tabs`
- **feedback/** — `Modal`, `DetailPanel` (+ `DetailSection`, `DetailField`), `Toast`, `Tooltip`, `Spinner`

El inventario se derivó de `src/components/ui/` (shadcn: button, badge, card, input, textarea, label, select, checkbox, radio-group, switch, table, tabs, dialog, avatar, progress, separator, tooltip, empty, pagination, sonner) más los componentes propios del producto (`estatus-badge`, `common/PageHeader`, `pages/notas/StatCard`, `Bitacoras/PhotoGrid/PhotoGridCard`, `navigation/header` + `navigation/mega-menu`, el conmutador de vista de las pantallas de listado).

### Adiciones intencionales

- `SectionHeader` — el "header secundario" de cada sección (título + KPI de registros, buscador, acción verde, subnavegación y modo de visualización). En el repo está esparcido entre `common/PageHeader` y bloques inline de cada pantalla; aquí se unifica.
- `SegmentedControl` + `ViewModeIcons` — el grupo de celdas unidas para subnavegación y los tres modos de visualización (tarjetas, tarjetas en lista, tabla), repetidos inline en cada listado.
- `DetailPanel` — el detalle de un registro se abre como panel lateral redimensionable (estilo Notion), no como modal; el repo actual navega a una ruta aparte.
- `KpiChip`, `FilterChip`, `FilterPanel` — el cajón de filtros y sus chips contados están reimplementados por pantalla en el repo; aquí se unifican porque son el lugar canónico de los KPI.
- `RowAction` — el botón cuadrado de solo icono de la columna OPCIONES, con su tooltip; en el repo son iconos sueltos repetidos en cada tabla.
- `Field` — envoltura label/hint/error; el producto usa `react-hook-form` + `ui/form` + `ui/label`, que no se puede portar sin la librería. Reproduce el mismo ritmo visual (label 14/500 gris, 20px de separación).
- `Spinner` — el anillo de carga de 96px está repetido inline en varias páginas.

## CONTENT FUNDAMENTALS

**Idioma:** español de México, siempre. Nunca se mezcla inglés en la interfaz visible (el código sí está en inglés).

**Tono:** operativo, directo y sin adornos. Es software para guardias en caseta a las 3 de la mañana: la interfaz nombra objetos y acciones, no conversa.

### Reglas de capitalización (obligatorias)

| Elemento | Regla | Ejemplos |
|---|---|---|
| Títulos de pantalla, secciones y modales | **Sentence case** | "Historial de pases de entrada", "Detalles del turno", "Guardias de apoyo", "Nuevo pase de entrada", "Confirmación" |
| Subtítulos y descripciones | **Sentence case** | "Registra al visitante y la ubicación autorizada." |
| Chips de estatus | **Sentence case** | Abierto, Cerrado, En proceso, Sin incidencias, Programado |
| Etiquetas de campo | **Capitalize** — solo la inicial, resto en minúscula, dos puntos cuando es dato de solo lectura | "Nombre del visitante", "Motivo de la visita", "Ubicación:", "Estatus de la caseta:" |
| Botones y CTA | **Camel Case** — cada palabra con inicial mayúscula | "Iniciar Sesión", "Iniciar Turno", "Cerrar Turno", "Nuevo Pase", "Nueva Nota", "Generar Pase", "Cambiar Imagen", "Ingresar Como Suplente" |
| Encabezados de tabla | **MAYÚSCULAS** con `letter-spacing .03em` (excepción tipográfica, no de redacción) | FOLIO, PERSONA, UBICACIÓN |

Nunca uses `text-transform: capitalize` sobre contenido de datos: escribe la cadena ya en el caso correcto. Aplicado a un estatus, `capitalize` produce "En Proceso" en lugar de "En proceso".

### Reglas de redacción

- **Botones = verbo + objeto:** "Iniciar Turno", "Cerrar Turno", "Nuevo Pase", "Cambiar Caseta". Un botón nunca es un sustantivo solo.
- **Español culto y preciso.** Evita participios torpes o coloquiales en confirmaciones. La forma correcta es *se + verbo* o *quedó + participio*:

| ✗ Evitar | ✓ Usar |
|---|---|
| "Foto de perfil cambiada correctamente" | "Se actualizó tu foto de perfil" |
| "Turno iniciado correctamente" | "Se inició tu turno" |
| "Error al obtener el turno" | "No se pudo cargar el turno" |
| "Tomate una fotografía" | "Toma una fotografía" |
| "Registro guardado exitosamente" | "Se guardó el registro" |
| "No hay menus disponibles" | "No hay menús disponibles" |

- Cuida siempre la **acentuación** (menús, más, según) y la concordancia de género y número. Un error ortográfico en software de seguridad lee como descuido operativo.
- Prefiere el verbo a la nominalización: "Se cerró el turno", no "Cierre de turno realizado".
- **Vacíos y carga son literales, no simpáticos:** "No se encontraron registros", "Cargando registros...", "Cargando...", "No hay ubicaciones", "No hay menus disponibles, revisa la configuración.", "Sin imagen".
- **Errores explican y derivan:** "Configuración Incompleta / Hubo un problema por falta de configuración en este usuario. / Por favor, solicita apoyo a soporte para resolverlo." Los avisos inline en rojo son imperativos cortos: "Selecciona una caseta para iniciar turno", "Tomate una fotografía para iniciar turno.", "\* Fuerce el cierre de la caseta para iniciar turno".
- **Confirmaciones impersonales con "se":** "Se actualizó tu foto de perfil", "Se inició tu turno", "Se guardó el registro".
- **Persona:** se habla **de tú** al usuario cuando hay que pedirle algo ("Selecciona…", "Tomate…", "¿Olvidaste tu contraseña?"). Nunca se usa "nosotros"; el sistema no se personifica.
- **Métrica siempre visible:** cada listado muestra "N registros" y "1 - 25 de 248 registros". La densidad de datos es parte del mensaje.
- **Emoji: nunca.** Ni en interfaz ni en mensajes. Los iconos son SVG.
- **Modales:** título breve en sentence case ("Confirmación", "Suplente", "Tomar fotografía") y una descripción instructiva completa ("Capture una fotografía de su uniforme completo antes de iniciar su turno.") — nota el registro *usted* en instrucciones de procedimiento frente al *tú* de los avisos rápidos.

## VISUAL FOUNDATIONS

**Color.** Azul marino `#192A4E` para identidad, encabezados y tipografía de autoridad; `#1e2d5a` es el mismo azul declarado en el código (`--color-brand`). **El azul de acción es uno solo: `#2F80ED`** (hover `#1E6FDB`, fondo sutil `#EFF6FF`, header de tabla `#DBEAFE`). El código heredado convive con `#3B82F6`, `#3D8BF2` (CTA de login) y `#2A7EFF` (selección): están **retirados** y deben migrarse a `#2F80ED`. Verde `#10B981`/`#16A34A` = presencia, entrada, "abierto". Rojo `#DC2626` = salida, cierre de turno, incidencia. Ámbar = pendiente/parcial. Púrpura y magenta clasifican perfiles de visita (acompañante, titular, suplente). **El lienzo de la aplicación es blanco:** las pantallas no llevan fondo gris; la jerarquía se construye con bordes hairline y sombras suaves, no con contraste de superficie. Los grises `#F8FAFC`/`#F1F5F9` se reservan para zonas hundidas puntuales (cuerpo del panel de detalle, fondo de botones de icono).

**Escala real de interfaz.** El tamaño base de todo control y dato es **14px** (`--font-size-sm`): navegación, botones, inputs, celdas de tabla, chips y conteos. 20px/600 es el título de sección; 24px/600 el título de pantalla. **Todo control mide 40px de alto** (36px solo en acciones compactas como el selector de ubicación y las acciones de fila; 48px solo en login). El texto de interfaz es `#171717`, el secundario e inactivo `#475569`, los metadatos y conteos `#64748B`, los títulos `#0F172A`. La acción de crear es siempre **verde `#16A34A`**, nunca azul: el azul es para navegación, selección y confirmación.

**Tipografía.** **`Arial, Helvetica, sans-serif`** es la **única** familia del sistema — sin webfonts, sin descargas, disponible en todo sistema operativo. También cubre folios, horas y cifras: en lugar de una monoespaciada se usa la misma familia con `font-variant-numeric: tabular-nums` (token `--numeric-tabular`) para que las columnas numéricas alineen. El código actual de la plataforma carga Geist Sans: es deuda técnica, la referencia es Arial. Escala 12/14/16/18/20/24 y 36px para cifras de KPI. Los encabezados de tabla van en **mayúsculas, 700, letter-spacing .03em, azul marino**. Títulos de pantalla 20px/700; `tracking: -0.02em` en títulos y logotipo.

**Arquitectura de headers.** Dos barras fijas y ninguna más:

1. **Header principal** (`AppHeader`) — presente en toda pantalla autenticada. Izquierda: logotipo + selector de ubicación (icono de edificio + chevron). Derecha, en este orden: **mega menú → campana de notificaciones → avatar**. *El código en producción centra el mega menú; el diseño de referencia lo alinea a la derecha junto al avatar* — la referencia manda. Cada entrada del mega menú con hijos lleva chevron y abre un panel blanco con columnas de enlaces (encabezado en negrita, enlaces en peso normal).
2. **Header secundario** (`SectionHeader`) — identifica la sección. Izquierda: título + conteo de registros en gris claro. Derecha, en orden fijo: **buscador → acción principal (verde, siempre con "+") → tabs de subnavegación → tabs de modo de visualización**. La acción verde solo aparece cuando la sección permite crear. Los modos de visualización son tres: tarjetas (default), tarjetas en lista y tabla.

**Anatomía de tabla.** Toda tabla del sistema comparte tres rasgos no negociables:

1. **Pestaña flotante de filtros** — media pastilla azul de 38×52px anclada al centro del costado izquierdo, sobresaliendo del borde de la tabla (radio solo del lado derecho, icono `SlidersHorizontal` en blanco). Es el único elemento del sistema que rompe intencionalmente el contenedor.
2. **Columna OPCIONES primero** — acciones de **solo icono**, nunca texto: botón cuadrado de 32px con fondo gris `#F1F5F9` y icono gris; al hover toma el azul claro del encabezado `#DBEAFE` con el icono en azul de acción y aparece el tooltip debajo ("Ver detalle", "Editar", "Imprimir"). Las acciones no aplicables al registro se dejan deshabilitadas al 40%, no se ocultan.
3. **Los KPI no son tarjetas.** Ninguna pantalla con tabla lleva tarjetas de KPI en el header: la cifra vive en un **chip azul pequeño a la derecha del título** (`KpiChip`: "715 registros") y los desgloses viven en los **contadores de los chips del panel de filtros** ("Entrada 58", "Salida 0"). `StatCard` queda reservado para paneles de resumen sin tabla.
4. **Panel de filtros como cajón** — la pestaña abre un cajón de 316px desde la izquierda que atenúa la tabla con un velo blanco al 72% (sin blur). Encabezado "Filtros" con badge del número de filtros activos y enlace "Limpiar"; secciones colapsables con chevron; el mismo número aparece sobre la pestaña flotante.
5. **Encabezado `#DBEAFE`** en mayúsculas slate con `letter-spacing .05em`; filas al hover `#F1F5F9`, divisores hairline entre celdas.

**Los tres modos de visualización.** Toda sección de listado ofrece los mismos tres modos, en este orden:

1. **Tarjetas** (`PhotoCard`, modo por defecto) — rejilla de tarjetas de 280px con la evidencia fotográfica a 340px arriba, folio (chip azul) y estatus superpuestos en la esquina superior derecha, y cuerpo con nombre en 14/700, empresa en gris, chip púrpura de perfil, metadatos con icono ("Ubicación:", "Visita a:", "Entrada:") y fila de acciones circulares al pie. **La fecha de salida se pinta en rojo**: cierra el registro. El panel de filtros vive a la izquierda como columna de 320px.
2. **Lista de tarjetas** (`RecordListItem`) — filas de ancho completo: foto a la izquierda en caja clara con su tira de miniaturas debajo; a la derecha nombre en 18/700, empresa, los tres chips (estatus **sólido**, perfil, folio) alineados a la derecha, y una rejilla de tres columnas con campos etiquetados en MAYÚSCULAS ("CASETA", "VISITA A", "FECHA DE ENTRADA", "FECHA DE SALIDA", "GAFETE"). Un campo vacío imprime `---`. Casilla de selección en la esquina superior derecha.
3. **Tabla** (`DataTable`) — ancho completo sin panel lateral (los filtros entran por la pestaña flotante), columna OPCIONES primero con acciones `plain` (icono suelto, sin fondo) y todas las columnas del registro. Los estatus van en chip sólido.

Las acciones son las mismas en los tres modos y en el mismo orden — ver, vehículo, equipo, identificación, imprimir, registrar salida (naranja) — y se deshabilitan al 35% cuando el registro ya está cerrado.

**Detalle de registro.** Ver un registro **nunca** abre un modal ni cambia de página: entra un **panel lateral estilo Notion** desde la derecha que deja la tabla visible a su izquierda, con un asa de arrastre en el borde izquierdo (tooltip "Arrastra para ajustar el ancho") y el ancho recordado en `localStorage`. Ancho por defecto 1040px, entre 480 y 1440. Encabezado con antetítulo en mayúsculas, folio en cifras tabulares, chip de estatus, acciones de icono y cierre; cuerpo sobre `#F8FAFC` compuesto de tarjetas blancas (`DetailSection`), las secundarias plegadas; pie con nota gris a la izquierda y "Cerrar" a la derecha. El `Modal` queda solo para crear y confirmar.

**Espaciado y layout.** Ritmo de 4px con paradas prácticas en 6, 12, 20 y 24. Controles: 36px (compactos), 40px (estándar), 48px (auth). Padding de tarjeta 20px; gutter de página 24px. El header es *sticky* (`top:0`) y el `PageHeader` se pega bajo él (`top:57px`): en un listado largo, título, contador y buscador nunca se pierden. Los listados usan un panel de filtros lateral de 224–256px y contenido fluido.

**Fondos e imágenes.** Sin gradientes decorativos, sin patrones, sin texturas, sin ilustraciones. Los únicos degradados son funcionales: una protección `from-background/80` sobre las fotos de las tarjetas de bitácora para que los chips se lean. La imaginería es **fotografía operativa real y sin filtro** — evidencias de guardia, áreas, artículos, uniformes; tono frío y neutro, encuadre documental, nunca *stock*. Cuando falta la imagen se usa un placeholder SVG gris (`nouser`, `noiden`, `noarticle`) o el texto "Sin imagen" en itálica gris.

**Bordes y esquinas.** Radios 4 / 8 / 12 / 16 / 20 y pill. Botones e inputs 8px; tarjetas 12px; tarjeta de auth 16px; panel de filtros 16–20px; chips y avatares pill. Bordes hairline de 1px `#E5E7EB` (o `#E2E8F0` en tablas). Las tarjetas seleccionables usan **borde de 2px** en azul de selección en lugar de sombra de color.

**Sombras.** Tres niveles: `sm` (reposo de tablas y tarjetas planas), `md` (tarjetas y KPI), `lg` (hover de tarjeta, modales, tarjeta de login). Retratos de guardia llevan `0 2px 8px rgba(0,0,0,.2)` y los avatares del header `0 0 3px rgba(0,0,0,.4)`. No hay sombras internas ni *glow* de color; el foco es un anillo azul de 3px al 15%.

**Estados.** *Hover*: en superficies se **oscurece** el fondo (fila `#F1F5F9`, tile `#E5E7EB`, botón secundario al lienzo) y en botones sólidos se pasa al tono 600. Los botones fantasma del nav **se invierten a azul sólido con texto blanco** — un gesto propio de Clave 10. *Focus*: borde azul + anillo `rgba(59,130,246,.15)`. *Disabled*: opacidad 0.5 y cursor bloqueado (nunca se oculta la acción). *Selected*: fondo `#DBEAFE` o borde `#2A7EFF`. **No hay estado de "press" con escala hacia abajo**; el único cambio de escala es `scale(1.05)` al pasar sobre los tiles del menú y `scale(1.05)` en la foto de una tarjeta.

**Animación.** Discreta y corta: 150ms para controles, 250ms para superficies, 200ms para menús (deslizamiento de 8px con fundido), 300–500ms para imágenes. Curva única `ease-in-out`. Sin rebotes, resortes ni animaciones de entrada escalonadas. El único movimiento continuo es el anillo de carga.

**Transparencia y desenfoque.** Casi ausentes. El overlay de modal es negro al 80% **sin blur**; los fondos translúcidos se limitan a `slate-100/50` en el conmutador de vista y `muted/30` en la barra lateral del mega-menú.

**Tarjetas.** Blancas, radio 12px, borde hairline, sombra `sm`/`md`, padding 20px; el hover sube a `lg`. La tarjeta con foto es la excepción rica: imagen de 320px arriba, chips de folio y estatus superpuestos, cuerpo con título 14/600, descripción 12px gris, lista de metadatos con icono y una fila de acciones al pie.

## ICONOGRAPHY

- **Sistema principal: [lucide-react](https://lucide.dev)** (`lucide-react@0.454`), trazo de 1.5–2px, 16px en botones y filas, 20px en el header, 40px en tarjetas KPI. Para prototipos HTML enlaza lucide desde CDN: `<script src="https://unpkg.com/lucide@latest"></script>`. Iconos recurrentes: `Search`, `Plus`, `LayoutGrid`, `LayoutList`, `Sheet`, `Settings`, `LogOut`, `StickyNote`, `Building2`, `ChevronDown`, `Check`, `ShieldCheck`, `ShieldAlert`, `AlertCircle`, `Eye`/`EyeOff`.
- **Iconos de módulo propios: SVG del producto**, uno por entrada del menú. Están copiados en `assets/icons/`: `pases`, `pase_entrada`, `accesos`, `turnos`, `bitacoras`, `incidencias`, `rondines`, `inspecciones`, `fallas`, `articulos`, `articulos_concesionados`, `notas`, `reportes`, `configuracion`, `history`, `key`, `package`, `check`. **Úsalos siempre que representes un módulo**; no los sustituyas por lucide.
- **Placeholders SVG:** `nouser`, `noiden`, `noarticle` — se muestran cuando falta la foto de un guardia, una identificación o un artículo.
- **No hay fuente de iconos ni sprite.** No se usan emoji. No se usan caracteres unicode como iconos (salvo el "x" de cerrar de algún modal heredado). **No dibujes SVG nuevos**: copia de `assets/icons/` o usa lucide.
- Los avatares de usuario son fotografías circulares; sin foto, iniciales sobre gris.
