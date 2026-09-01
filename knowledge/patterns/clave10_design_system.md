# Clave10 Design System

> Dónde vive el sistema de diseño oficial de Clave 10 y qué tokens/reglas aplicar en cualquier UI nueva o retocada del front (`clave10/src/**`). Consulta este documento antes de elegir colores, radios, tipografía o redacción a mano.

## 0. Ubicación

El sistema de diseño **ya no vive en este repo**. Está en su propio plugin,
`clave10-design` (repo `linkaform/clave10-design-system`), publicado en el
mismo marketplace que `lkf-claude`:

```
/plugin install clave10-design@lkf-claude
```

Se separó porque es un activo de producto que se deriva de `linkaform/clave10`
y sincroniza contra ese repo, mientras que `lkf-claude` sirve a cualquier front
montado sobre el BaaS. Este documento se queda aquí: es el **resumen aplicado**
—los puntos que más se han necesitado— y sigue siendo buscable vía
`lkf_search`. **Esta clase de conocimiento va en `lkf-claude/knowledge/`, nunca
en la memoria genérica de Claude Code** (`~/.claude/projects/**/memory/`): ese
directorio es privado por sesión/usuario y no es lo que el equipo consulta.

Rutas relativas a la raíz de la skill `clave10-design`:

- `readme.md` — documento completo (color, tipografía, copy, anatomía de tabla,
  headers, animación, etc.). Léelo entero antes de un trabajo de UI grande.
- `tokens/*.css` — `colors.css`, `typography.css`, `spacing.css`, `radii.css`,
  `elevation.css`, `motion.css`, `fonts.css`.
- `components/{core,forms,data,navigation,feedback}/*.jsx` + `.prompt.md` —
  primitivos de referencia (no son los componentes reales del repo, son la
  especificación visual).
- `guidelines/*.card.html` — specímenes visuales individuales.
- `uploads/design-system.css` — la guía de marca oficial v1.0.0 de la que se
  generó todo, junto con `linkaform/clave10` rama `master`.

## 1. El azul de acción único ya existe en el código real

`--c10-blue:#2F80ED` (hover `#1E6FDB`, fondo sutil `#EFF6FF`) es el **único**
azul de acción del sistema. Ya está expuesto en `clave10/src/app/globals.css`
como `--button-primary: #2F80ED` y registrado en `tailwind.config.ts` bajo
`colors.button.primary` — es decir, ya puedes usar las clases Tailwind
`bg-button-primary` / `border-button-primary` / `text-button-primary`
directo, sin inventar un color ni usar arbitrary values para el azul base.
Para el hover (`#1E6FDB`, no tiene alias Tailwind propio) usa arbitrary
value: `hover:bg-[#1E6FDB]`.

El código heredado usa mucho `blue-600`/`blue-500`/`blue-400` de Tailwind
(vienen del paleta default, no del design system) — el propio sistema de
diseño los marca como **retirados, a migrar a `button-primary`**. Es deuda
amplia y transversal a decenas de archivos: no migrar todo de golpe sin que
lo pidan explícitamente; sí preferir `button-primary` en cualquier botón/UI
nueva que se escriba, y migrar un componente puntual cuando el usuario pida
"aplica los colores del sistema de diseño a X".

## 2. La acción de "crear" es siempre verde, nunca azul

`--action-create:#16A34A` (hover ~`#15803D`). Tailwind's `green-600`/`green-700`
calzan exacto con esos hex, así que en código simplemente `bg-green-600
hover:bg-green-700`. Cualquier botón de submit que literalmente crea un
registro (ej. "Crear Visita", "Nuevo Pase", "Generar Pase") debe ir en verde
— si en el código heredado aparece en azul (`bg-blue-500`, etc.), es una
desviación del sistema de diseño, no una decisión de diseño intencional.

## 3. Radio de controles: cuidado con el nombre `rounded-md` en este repo

El design system dice "Botones e inputs 8px". En `clave10/tailwind.config.ts`
el radio base (`--radius` en `globals.css`) es `0.5rem` (8px), pero la
config mapea:

```
borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' }
```

Es decir `rounded-lg` = 8px (el radio de botón/input del design system),
`rounded-md` = 6px, `rounded-sm` = 4px. El código heredado usa `rounded-md`
por costumbre/copy-paste en muchos botones custom — para calzar exacto con
el design system, los botones deberían usar `rounded-lg`, no `rounded-md`.
Ojo con este desfase de nombre-vs-valor al retocar radios.

## 4. Otras reglas rápidas de referencia (ver `readme.md` para el detalle)

- Tipografía: Arial/Helvetica únicamente (el código carga Geist Sans — deuda
  técnica conocida y documentada en el propio sistema, la referencia manda
  Arial). Base 14px en casi todo control.
- Controles a 40px de alto estándar, 36px en acciones compactas.
- Copy en español México: sentence case en títulos/labels, botones en Camel
  Case verbo+objeto ("Iniciar Turno"), confirmaciones impersonales con "se"
  ("Se guardó el registro"), nunca emojis.
- Detalle de registro = panel lateral tipo Notion (`Sheet`), nunca modal —
  ver `clave10_panel_lateral_detalle.md`. `Modal` queda solo para
  crear/confirmar.
- Hover de "botón fantasma" (borde + texto de color, fondo transparente): se
  invierte a fondo sólido del color de acción con texto blanco — gesto
  propio de Clave 10, no el hover-shadow genérico que aparece en varios
  botones custom heredados (`hover:shadow-[0_3px_6px_rgba(0,0,0,.2)]`).

## 5. Nunca hardcodear hex en el JSX — todo pasa por `globals.css` + `tailwind.config.ts`

Si necesitas un color del design system que todavía no tiene alias, **no**
escribas `bg-[#1E6FDB]`/`text-[#171717]` directo en el componente (arbitrary
value de Tailwind con el hex quemado) — eso es exactamente lo que este
sistema busca evitar. En vez de eso:

1. Agrega la variable a `clave10/src/app/globals.css` (junto a
   `--button-primary`, dentro de `:root`), usando **el mismo nombre** que
   trae `tokens/colors.css` de `clave10-design` (prefijo `c10-`) para que sea
   trivial relacionar uno a uno.
2. Regístrala en `clave10/tailwind.config.ts` → `theme.extend.colors` para
   que exista como clase de Tailwind real (`bg-c10-xxx`, `text-c10-xxx`,
   `border-c10-xxx`).
3. Úsala en el componente con la clase, no con el hex.

## Aplicado en

- `src/components/modals/add-visit-modal.tsx` — botones de selección (tipo
  de visita, vigencia, días de acceso) migrados a `button-primary` +
  `rounded-lg` + hover de inversión; botón de submit ("Crear Visita")
  migrado de azul a verde por ser una acción de creación; botón "Cancelar"
  migrado a `border-c10-border`/`text-c10-text`.

## 6. Migración parcial — **continuar aquí**

Solo se migraron los tokens puntuales que se necesitaron hasta ahora:

- `--button-primary` / `--button-primary-hover` (azul de acción + su hover)
- `--c10-border` (`#E2E8F0`) / `--c10-text-primary` (`#171717`)

Todo esto vive en `clave10/src/app/globals.css` (bloque `:root`, con un
comentario ahí mismo que apunta de vuelta a este documento) y se registra en
`clave10/tailwind.config.ts` bajo `theme.extend.colors` (`button.*` y
`c10.*`).

**Falta migrar el resto de la paleta** — `--c10-navy`, `--c10-success`
(verde de crear, hoy resuelto con el `green-600`/`green-700` de Tailwind
porque coinciden exacto en hex, pero sin alias propio), `--c10-danger`,
`--c10-warning`, `--c10-purple`, `--c10-magenta`, los `--c10-chip-*` de
`EstatusBadge`, y los neutros (`--c10-surface-muted`, `--c10-surface-sunken`,
`--c10-text-secondary`, `--c10-text-muted`). Fuente exacta de valores:
`tokens/colors.css` de la skill `clave10-design` (cópialos literal, mismos
nombres). Sigue el mismo patrón de la sección 5 arriba: variable en
`globals.css` → alias en `tailwind.config.ts` → usar la clase, nunca el hex
suelto. Buen momento para hacerlo es la próxima vez que se toque un
componente con `EstatusBadge`/chips de color o cualquier botón/superficie
que hoy use un `blue-*`/`gray-*`/hex de Tailwind por defecto en vez de un
token del sistema.

## Ver también

- `clave10_front_explorer_screen.md` — convenciones de pantalla completa
  (header, filtros, vistas).
- `clave10_panel_lateral_detalle.md` — patrón de panel lateral de detalle.
