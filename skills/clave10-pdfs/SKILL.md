---
name: clave10-pdfs
description: Sistema de diseño de los PDFs y reportes de Clave 10 (bitácoras de incidencias, fallas, rondines, pases de entrada, reportes de visitas, contratistas, accesos y cualquier documento que la plataforma entregue a clientes). Usa este skill siempre que el usuario pida diseñar, maquetar, crear, rediseñar, revisar o corregir un PDF, reporte, bitácora, formato, pase o plantilla de Clave 10, o pida "hazlo con el estilo de Clave 10", aunque no diga "design system" ni "skill". También para agregar o corregir el footer (slogan "Operación segura." y paginación), revisar si un PDF cumple la línea gráfica, o pasarle a desarrollo las especificaciones de un reporte.
---

# Clave 10 · Sistema de diseño de PDFs

Los PDFs de Clave 10 son documentos de evidencia que el cliente guarda, imprime y muestra en auditorías. El estilo es sobrio y ordenado: tinta casi negra, un solo azul marino de marca, grises fríos, cajas con borde fino y mucho aire. **No se rediseña; se respeta.** Cualquier PDF nuevo debe verse como pariente directo de la Bitácora de incidencias y la Bitácora de fallas actuales.

## Cómo trabajar

1. **PDF nuevo** → constrúyelo con `scripts/clave10_pdf.py` (ReportLab). La librería ya trae header, tarjetas KPI, secciones, rejilla de campos, tablas, total, tarjetas de seguimiento, galería de evidencias, estados vacíos y footer. Mira `scripts/ejemplo_incidencia.py` para un documento completo. Usa datos reales del usuario o datos de ejemplo claramente marcados.
2. **PDF existente al que solo le falta el footer** → `python scripts/aplicar_footer.py entrada.pdf salida.pdf`.
3. **Revisión de un PDF** → compáralo contra `references/componentes.md` y la checklist de abajo; reporta diferencias concretas (qué, dónde, valor actual vs. valor del sistema).
4. **Especificación para desarrollo** → entrega los tokens y medidas de `references/componentes.md` en pt, no en px.

Siempre renderiza el resultado a PNG (`pdftoppm -r 80 -png`) y míralo antes de entregarlo.

## Tokens

| Token | Hex | Uso |
|---|---|---|
| tinta | #1D2433 | Texto principal, títulos, línea del header |
| marino | #1F3A6E | Marca: folio, valor del KPI destacado, barras de seguimiento, totales, slogan |
| gris | #8B95A7 | Etiquetas de campo, subtítulos, estados vacíos, paginación |
| gris_head | #5B6577 | Encabezados de tabla |
| borde | #D9DEE6 | Bordes de cajas y tablas, línea del footer |
| fondo_tabla | #F1F3F6 | Fondo de encabezados de tabla y de "Documentos" |
| fondo_dest | #EEF4FD | Fondo de la tarjeta KPI destacada |
| borde_dest | #A9C3EA | Borde de la tarjeta KPI destacada |

Tipografía: **Helvetica / Helvetica-Bold** en todos los reportes. Escala (pt): título 16 B · KPI 13 B · folio 11 · sección 9.5 B · valor 7.5 · celda 7.5 · barra de seguimiento 7.5 B blanco · etiqueta 5.5 MAYÚSCULAS gris · encabezado de tabla 5.5 B MAYÚSCULAS · subtítulo de KPI 5.

Página carta 612 × 792 pt, márgenes laterales 34 pt (12 mm), bordes de 0.75 pt, separación entre tarjetas 8 pt.

## Footer (obligatorio en todos los PDFs)

- Línea `borde` 0.75 pt de margen a margen, a 46 pt del borde inferior.
- Izquierda: **"Operación segura."** Helvetica-Bold 9 pt, `marino`, a 30 pt del borde inferior.
- Derecha: **"Página X de Y"** Helvetica 8 pt, `gris`, alineada a la derecha **con el margen derecho del contenido** (x = ancho − 34 pt). Nunca a una x fija.
- Formatos angostos (< 300 pt de ancho, como el pase de entrada): solo el slogan, Helvetica-Bold 6 pt `marino`, centrado a 8 pt del borde inferior. Sin línea ni paginación si es una sola página.
- El contenido nunca baja de 60 pt desde el borde inferior.

## Estructura de un reporte

Header → fila de 4 tarjetas KPI (la primera destacada: el estatus o gravedad) → secciones en el orden lógico del registro (Información → Acciones/Resolución → Personas → Afectación → Seguimiento → Evidencias) → footer. Cada sección es un título 9.5 B seguido de una caja con borde. Si una sección no tiene datos, se muestra igual con su estado vacío ("Sin seguimientos registrados"), nunca se oculta: en auditoría importa ver que el campo existía y estaba vacío.

## Reglas de contenido

- Valores vacíos: guion largo "—", nunca "null", "N/A" ni celdas en blanco.
- Fechas: `DD/MM/AAAA · HH:MM:SS`. Duraciones: `5 h 50 min`, `0 min`, `10 h 32 min` (no "10 hora(s), 32 minuto(s).").
- Montos: `$100,400.00` con dos decimales, también cuando es cero (`$0.00`).
- Etiquetas en MAYÚSCULAS; títulos de sección en tipo oración ("Información del incidente").
- Títulos de documento en tipo oración: "Bitácora de rondines", no "BITÁCORA DE RONDINES".
- Fotos recortadas al centro para llenar su caja; nunca deformadas.

## Checklist antes de entregar

- [ ] Logo, título centrado, FOLIO a la derecha y línea `tinta` de 1 pt.
- [ ] Solo los colores de la tabla de tokens (nada de azul brillante #0A5395 ni bordes negros).
- [ ] Footer con slogan y paginación alineada al margen derecho; total de páginas correcto.
- [ ] Ninguna caja ni texto invade la zona del footer.
- [ ] Estados vacíos y "—" donde no hay datos.
- [ ] Formatos de fecha, duración y monto según las reglas.

Detalle de cada componente con medidas exactas: `references/componentes.md`.
