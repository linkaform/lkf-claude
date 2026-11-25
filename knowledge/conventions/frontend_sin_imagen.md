# Front (`clave10`): imagen "sin foto"

## Regla
Cuando un registro, área, evidencia, miniatura o marcador **no tiene foto** (o la foto no carga),
usar siempre la imagen `public/sin_imagen.png` (ruta `"/sin_imagen.png"`), en **cualquier módulo**
(Rondines, Áreas, Ubicaciones, Incidencias, Fallas, Paquetería, Concesionados, etc.).

## Cómo
- Texto directo: `"/sin_imagen.png"`; en componentes de rondines hay también la constante
  `NO_IMAGE` (`@/components/common/SlideCarousel`) que apunta a la misma ruta.
- `<Image>` / `<img>`: además del fallback por dato vacío, poner `onError` que cambie `src` a
  `"/sin_imagen.png"` (imagen rota ≠ sin dato).
- Mapas Leaflet (`components/map-v2.tsx`): el icono con foto lleva `onerror` hacia la misma ruta.
- Galería (`GaleriaFotosModal`): las miniaturas caen a la original y, si tampoco carga, a esta imagen.

## No hacer
- No usar `/placeholder.svg`, ni crear otro placeholder por módulo.
- No usar el nombre antiguo `sin_imagen_rondines.png` (se renombró a `sin_imagen.png`; ya no existe).
- No dibujar iconos de "imagen rota" ni círculos de color como sustituto de la foto.
