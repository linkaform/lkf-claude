# Componentes · medidas exactas

Todas las medidas en pt, medidas desde el borde superior de la página salvo el footer. Margen izquierdo L = 34, margen derecho R = ancho − 34. Ancho útil en carta: 544.

## Header
- Logo `assets/logo_clave10.png` en (L, 40.8), 73.7 × 28.35.
- Título del documento: Helvetica-Bold 16, `tinta`, centrado en la página, top 46.6.
- "FOLIO": Helvetica 6, `gris`, alineado a R, top 37.5.
- Número de folio: Helvetica 11, `marino`, alineado a R, top 48.8.
- "VERSIÓN n" (opcional): Helvetica 5.5, `gris`, alineado a R, top 62.
- Línea `tinta` 1 pt de L a R en top 73.4. El contenido empieza en 80.5.

## Tarjetas KPI
- 4 tarjetas iguales, separación 8, alto 54 (crece 15 por cada línea extra del valor).
- Padding interno 7.
- Etiqueta 5.5 MAYÚSCULAS: en la destacada Helvetica-Bold `tinta`; en las demás Helvetica `gris`.
- Valor Helvetica-Bold 13: destacada `marino`, demás `tinta`.
- Subtítulo Helvetica 5 `gris`, pegado abajo (top = alto − 13).
- Destacada: fondo `fondo_dest`, borde `borde_dest`. Demás: fondo blanco, borde `borde`.
- La destacada siempre es la primera y muestra el estado: Gravedad, Estatus de la falla, Estatus del rondín.

## Título de sección
Helvetica-Bold 9.5 `tinta`, 6 pt de aire arriba y 17 pt entre el título y su caja.

## Rejilla de campos (etiqueta / valor)
- Caja con borde `borde`, dividida en filas por líneas `borde`; normalmente 4 columnas iguales.
- Etiqueta Helvetica 5.5 MAYÚSCULAS `gris` a 7 del borde; valor Helvetica 7.5 `tinta` 9 pt debajo, interlineado 10.5.
- Textos largos (descripción, comentarios) ocupan una fila completa (span 4).

## Tabla
- Encabezado alto 19, fondo `fondo_tabla`, borde `borde`, texto Helvetica-Bold 5.5 MAYÚSCULAS `gris_head`, máximo 2 líneas.
- Filas mínimo 17 de alto, texto 7.5 `tinta` centrado verticalmente, interlineado 9.5, borde `borde`.
- Nombres de persona en negritas. Montos alineados a la derecha. Sí/No centrados.
- Sin filas: una fila de 20 con el estado vacío en Helvetica 7 `gris`.

## Total
Línea `marino` 1 pt de L a R; etiqueta Helvetica-Bold 5.5 `tinta` a la izquierda; monto Helvetica-Bold 12 `marino` alineado a R.

## Tarjeta de seguimiento
- Barra superior alto 19, fondo `marino`, texto Helvetica-Bold 7.5 blanco: "n. Descripción de la acción".
- Debajo, 3 columnas (Fecha y hora · Tiempo transcurrido · Personas involucradas) con encabezado en fondo `fondo_tabla`; el tiempo va en negritas.
- Columna derecha de evidencia: 100 de ancho (140 con 2 fotos), alto 70; sin foto muestra "Sin evidencia" Helvetica 5 `gris` centrado. Pie de foto Helvetica 4.5 `gris`.
- Bloque opcional "DOCUMENTOS (n)" Helvetica-Bold 5.5 `marino` sobre `fondo_tabla`, una fila por archivo.
- 8 pt entre tarjetas. Una tarjeta nunca se parte entre páginas.

## Galería de evidencias
Miniaturas 98 × 55 dentro de un marco con borde `borde`, pie Helvetica 4.5 `gris`, 4 por fila, todo dentro de una caja con borde.

## Estado vacío
Caja de alto 20 con borde `borde`, texto Helvetica 6 `gris` a 7 del borde ("Sin acciones registradas", "Sin evidencias registradas").

## Footer
Ver SKILL.md. Línea a 46 pt del borde inferior, textos con línea base a 30 pt, slogan a la izquierda y paginación alineada a R.

## Pase de entrada (formato ticket)
Formato propio de 167 × 289 pt con Montserrat (Regular para etiquetas en MAYÚSCULAS 5.5, Bold 6.5–7 para valores), logo centrado, foto cuadrada, línea punteada separando vigencia y QR. Es la única pieza que no usa Helvetica; se mantiene así porque funciona como gafete. Footer: solo slogan centrado.
