repo: linkaform/clave10
branch: master
path: src, public

## Last sync
date: 2026-07-31T23:58:00Z

### Updated in this project
- Tokens de color, tipografía, espaciado, radios, sombras y movimiento derivados de `globals.css`, `tailwind.config.ts` y la guía de marca subida.
- 27 primitivos React reconstruidos a partir de `src/components/ui/` y de los componentes propios del producto.
- Headers reconstruidos según el diseño de referencia: mega menú alineado a la derecha con notificaciones y avatar; header secundario unificado en `SectionHeader`.
- UI kit navegable de la consola web (login, menú, pases, turnos, bitácoras).
- Assets importados: `logo.png`, 21 iconos SVG de módulo, tipografía Arial / Helvetica (sin webfonts), imágenes de ejemplo.

## Screen map
| Pantalla del proyecto | Archivos del repositorio |
|---|---|
| ui_kits/plataforma — Login | src/app/auth/login/page.tsx |
| ui_kits/plataforma — Inicio | src/app/page.tsx, public/*.svg |
| ui_kits/plataforma — Pases | src/app/dashboard/pases/page.tsx, src/components/table/pases-entrada/table.tsx, src/components/common/PageHeader.tsx, src/components/navigation/mega-menu.tsx, src/components/pages/pases/PaginationPases.tsx |
| ui_kits/plataforma — Turnos | src/app/dashboard/turnos/page.tsx, src/components/pages/turnos/sidebar.tsx, src/components/pages/turnos/turn-status.tsx |
| ui_kits/plataforma — Bitácoras | src/app/dashboard/bitacoras/page.tsx, src/components/Bitacoras/PhotoGrid/PhotoGridCard.tsx, src/components/estatus-badge.tsx |
| components/* (primitivos) | src/components/ui/*.tsx, src/components/navigation/{header,mega-menu}.tsx, src/components/common/PageHeader.tsx, src/components/pages/notas/StatCard.tsx |
| tokens/* | src/app/globals.css, tailwind.config.ts, uploads/design-system.css |
