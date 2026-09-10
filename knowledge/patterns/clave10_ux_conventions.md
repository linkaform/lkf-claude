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

## Ver también
- `clave10_design_system.md` — reglas visuales (color, tipografía, radios).
- `clave10_qr_preview_publico.md` — otro gotcha de las mismas vistas
  `preview` públicas (formato del valor codificado en el QR).
