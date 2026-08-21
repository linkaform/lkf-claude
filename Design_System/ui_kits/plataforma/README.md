# UI kit — Plataforma web Clave 10

Recreación navegable de la consola de seguridad (`linkaform/clave10`, Next.js 15 + shadcn/ui + Tailwind).

| Pantalla | Archivo | Fuente en el repo |
|---|---|---|
| Login | `LoginScreen.jsx` | `src/app/auth/login/page.tsx` |
| Menú de módulos | `InicioScreen.jsx` | `src/app/page.tsx` + `public/*.svg` |
| Historial de pases | `PasesScreen.jsx` | `src/app/dashboard/pases/page.tsx`, `src/components/table/pases-entrada/table.tsx`, `src/components/common/PageHeader.tsx` (unificado en `SectionHeader`) |
| Turnos | `TurnosScreen.jsx` | `src/app/dashboard/turnos/page.tsx`, `src/components/pages/turnos/{sidebar,turn-status}.tsx` |
| Bitácoras | `BitacorasScreen.jsx` | `src/app/dashboard/bitacoras/page.tsx`, `src/components/Bitacoras/PhotoGrid/PhotoGridCard.tsx` |

Cada pantalla monta el header principal (`AppHeader`: logo y ubicación a la izquierda; mega menú, notificaciones y avatar a la derecha) y su header secundario (`SectionHeader`). Flujo interactivo: iniciar sesión → mosaico de módulos → mega menú hacia cada módulo. En Pases se alternan los tres modos de visualización y las tabs Personal / Vehículos / Equipos; en Turnos se abre y cierra turno con confirmación y toast; en Bitácoras se filtra por tipo y se alterna cuadrícula/lista.

Todo se compone con los primitivos del sistema (`window.Clave10DesignSystem_b774bd`); ningún primitivo se reimplementa aquí.
