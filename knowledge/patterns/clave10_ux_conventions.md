# Convenciones de UX/producto de Clave10

> Decisiones de producto no obvias, confirmadas explícitamente por el
> dueño de producto, que aplican a cualquier feature nueva del front
> `clave10/src/**` — no son reglas visuales (ver `clave10_design_system.md`
> para eso), son reglas de qué acción va dónde y cómo se estructuran los
> flujos.

## 1. Una acción que confirma algo físico solo vive en pantallas autenticadas

Cualquier acción que aseveré que alguien verificó algo en el mundo real
(dar acceso, confirmar llegada/arribo, registrar entrada) es una
declaración de que un guardia/usuario autorizado lo comprobó físicamente
— nunca debe poder dispararse desde una pantalla pública sin login.

**Caso real que motivó la regla**: un botón "Dar acceso" se agregó a una
vista `preview` pública (la que abre el QR de un pase, alcanzable sin
login por cualquiera con el link — el contratista, o el transportista si
se lo reenvían). Se corrigió: "el contratista no puede darle acceso" —
cualquiera con el QR podría confirmar la llegada de un camión que
físicamente no ha llegado, rompiendo el control de acceso real de la
caseta.

**Cómo aplicar**: antes de agregar un botón de "confirmar/registrar" a
cualquier pantalla, verifica si esa pantalla exige login + turno abierto.
Si es una pantalla pública o accesible por link/QR (cualquier ruta
`/preview/`, `/submit/` o equivalente), esa acción no va ahí — debe vivir
en una pantalla separada del lado autenticado que consulte/opere sobre el
mismo registro.

## 2. Flujos conceptualmente distintos nunca se mezclan en el mismo modal

Aunque dos flujos terminen llamando al mismo backend, si el usuario los
distingue como dos cosas diferentes, la UI debe reflejarlo con
componentes/modales separados — no con un campo opcional agregado al
modal del otro flujo.

**Caso real que motivó la regla**: el modal de alta manual/walk-in
("Nuevo Acceso Transportista", para un camión que llega sin registro
previo) y la acción de ligar un pase ya creado con su llegada física son
conceptualmente distintos para el usuario, aunque ambos terminen llamando
la misma función de backend (`create_visit_transportista`). Se agregó un
campo de "Buscar pase" dentro del modal de alta manual y se corrigió
explícitamente: "nuevo acceso y ese pase son 2 cosas diferentes así que
aquí en ese modal no metas nada de buscar pase ni lo modifiques".

**Cómo aplicar**: cuando una feature nueva conecta un pase/reserva
pre-existente con un registro operativo (bitácora, acceso, etc.), crea un
botón y modal/pantalla **dedicados** en vez de añadir campos de búsqueda
opcionales a un flujo de alta manual ya existente — incluso si reusar el
mismo modal ahorra código. Si tienes duda de si dos flujos son "el mismo"
o "distintos" para el usuario, pregunta antes de fusionarlos en la UI —
compartir backend no implica compartir modal.

## Ver también
- `clave10_design_system.md` — reglas visuales (color, tipografía, radios).
- `clave10_qr_preview_publico.md` — otro gotcha de las mismas vistas
  `preview` públicas (formato del valor codificado en el QR).
