# Clave10 Front Explorer Screen

> Cómo construir una "Pantalla Explorador" (lista/tabla/tarjetas) en el front Next.js de clave10, reusando convenciones y endpoints existentes en vez de crear de cero.

## 0. Nombre acordado: "Pantalla Explorador"

El equipo acordó llamarle **"Pantalla Explorador"** a este estilo de pantalla:
header con buscador + tabs + toggle de vista (tarjeta/lista/tabla), panel de
filtros con `dynamic_filters` resueltos en el backend (no en cliente), y
botones de acción por registro (imprimir, cambiar estatus, etc.). Áreas
(`/dashboard/areas`) es el primer ejemplo construido con este patrón. Cuando
el usuario pida "una pantalla explorador para X", este documento es el punto
de partida — no hay que rederivar el patrón desde cero ni preguntar de nuevo
qué componentes usar.

## 1. clave10 (front) ≠ clave10-app (móvil)

`clave10` (repo del front, hermano de `lkf-claude` en tu workspace) es Next.js + shadcn/ui (`src/app/dashboard/**`),
**NO Expo**. La app React Native/Expo con pantallas equivalentes vive en
`clave10-app`. Sirve como referencia de UX/flujo (qué campos mostrar, qué
interacciones soporta), pero su capa de datos (CouchDB/SQLite offline-first,
sync en background) no es portable — hay que rehacerla contra el backend real
vía REST.

## 2. Busca el endpoint antes de crear uno

Antes de escribir un endpoint nuevo en `lkf-addons`, greppea los campos que
necesitas proyectar (ej. `foto_area`, `tipo_de_area`, `tag_id`) en **todo** el
repo, no solo en el módulo obvio — el método correcto puede vivir en un
módulo hermano (`rondines.py` en vez de `accesos/app.py`/`location/app.py`).

Y del lado del front: puede que ya exista un service/hook llamando ese mismo
endpoint para otro propósito (ej. un modal picker de áreas al configurar un
rondín). Revisa `src/lib/*.ts`/`src/hooks/**/*.ts` antes de escribir un
service nuevo — reusar el call existente evita duplicar la lógica de
auth/error-handling.

## 3. Convención de ruta

```
src/app/dashboard/<seccion>/
  page.tsx     ← "use client", envuelto en <Suspense> si usa useSearchParams
  layout.tsx   ← <MainLayout>{children}</MainLayout> + export const metadata: Metadata = { title: "..." }
```

Los `href` en `src/config/menu-config.ts` van **sin** el prefijo `/dashboard`
— `MegaMenu` (`src/components/navigation/mega-menu.tsx`) lo antepone vía
`basePath="/dashboard"`. Un item de menú navegable usa `type: "link"` +
`href`; un placeholder usa `type: "option"` sin `href`.

## 4. Convención de header (`PageHeader`)

`src/components/common/PageHeader.tsx`: título + contador de registros a la
izquierda, buscador nativo integrado (nunca crear un input de búsqueda
nuevo) + `children` a la derecha. Los `children` típicos son:

- Un `Tabs`/`TabsList`/`TabsTrigger` tipo segmented-control (ej. "Personal |
  Vehículos | Equipos" en bitácora) para sub-vistas dentro de la misma página.
- Botones de toggle de vista con `LayoutGrid`/`LayoutList`/`Sheet` de
  `lucide-react`, siempre con la misma clase (`h-full w-10 ... ${viewMode ===
  mode ? "bg-blue-600 text-white hover:bg-blue-700" : "text-slate-500"}`).

## 5. Convención de filtros

Mismo componente por debajo (`FiltersPanel`,
`src/components/Bitacoras/PhotoGrid/PhotoGridFiltersPanel.tsx`), dos
envoltorios según `viewMode`:

- `viewMode !== "table"` → `<aside>` estático a la izquierda con
  `<FiltersPanel>` embebido directo en el árbol.
- `viewMode === "table"` → `<FloatingFiltersDrawer>` (botón flotante + drawer
  que se abre encima), mismo `FiltersPanel` por dentro.

Ambos comparten la forma `FilterState { dynamic: Record<string, any>,
dateFilter?, date1?, date2? }` y un `filtersConfig: FilterConfig[]` (`key`,
`label`, `type: "multiple"|"multiselect"`, `options`). `FiltersPanel` trae
built-in un filtro de "Ubicación" activable con la prop `filtroUbicacion`
(lee `useAreasLocationStore`) — pero ver el gotcha de scoping abajo antes de
prenderlo.

## 6. Registry de mappers (`src/utils/formatRecords.tsx`)

Un mapa `tipo -> (raw, base) => PhotoRecord` (`mappers_grid`) / `ListRecord`
(`mappers_list`). Para una feature nueva: escribe tu mapper
(`src/mappers/<feature>.grid.mapper.tsx`), regístralo en `mappers_grid` con
una key nueva, y agrega esa key al union `RegistryType`. Consúmelo siempre
vía `formatPhotoRecord(raw, "tu_tipo")`, no llamando el mapper directo — así
hereda `{id, folio}` del `base` genérico y queda descubrible junto a los
demás mappers.

## 7. Gotcha grande — scoping de ubicación

**Nunca** fetchees "todas las ubicaciones" del catálogo completo
(`useAreasLocationStore().locations`) para poblar una pantalla — puede haber
10, 50 o 100 ubicaciones, y eso son N requests innecesarias al backend.

La fuente de verdad de "qué ubicación(es) está viendo el usuario ahora mismo"
es `useSelectedLocationsStore().selectedLocations` — el checkbox-dropdown del
top-nav (`src/components/navigation/header.tsx`), acotado explícitamente por
el usuario (normalmente 1, a veces un puñado). Si el endpoint del backend
solo acepta una ubicación por llamada, usa `useQueries` de
`@tanstack/react-query` para pedir una por cada ubicación **seleccionada**
(nunca por cada ubicación que exista en el catálogo):

```ts
const queries = useQueries({
  queries: selectedLocations.map((ubicacion) => ({
    queryKey: ["areasCatalog", ubicacion],
    enabled: Boolean(ubicacion),
    queryFn: () => fetchAreasByUbicacion(ubicacion),
  })),
});
```

No uses `useBoothStore().location` (una sola ubicación "activa de turno") ni
un selector propio dentro de la página para esto — el dropdown del top-nav ya
es la UI correcta para elegir ubicación(es), duplicarla dentro de la página
es redundante y confunde.

## 8. Gotcha de unicode en regex

Al escribir un regex que remueve diacríticos vía
`.normalize("NFD").replace(/[U+0300 a U+036F]/g, "")` usando las herramientas
Edit/Write, el escape `\u0300`-`\u036f` a veces se transcodifica a los
caracteres de combinación **literales** (los bytes reales de esos code
points, pegados visualmente al carácter anterior en el archivo) en vez de
quedar como texto escapado plano. El regex sigue funcionando igual en
runtime (el rango de code points cubierto es el mismo), pero el archivo
fuente se ve roto — caracteres pegados/ilegibles alrededor del `replace(...)`.
Si pasa, no reintentes con Edit/Write (el mismo problema se repite); arréglalo
con un script Python que abra el archivo, ubique el string exacto por
posición/contexto, y lo reemplace por la secuencia de escape ASCII correcta
byte a byte.

## 9. Verificar sin credenciales

Si el repo no tiene `.env.local` (`NEXT_PUBLIC_API_BASE_URL` no definida),
`next dev`/`next build` truena en TODAS las rutas, no solo la nueva — no es
un bug tuyo. Para verificar que tu código no tiene errores de render, crea un
`.env.local` temporal con un placeholder (es una var pública, no un secreto)
solo para correr `next dev`/`tsc --noEmit`, confirma que compila sin
excepciones, y bórralo después — no lo dejes como si fuera config real del
proyecto.

## 10. Son 3 vistas, no 2

El toggle de vista del proyecto (`LayoutGrid`/`LayoutList`/`Sheet`,
`ViewMode` en `src/lib/utils.ts`) siempre son **3** modos, no 2:

- `"photos"` → `PhotoGridView` — grid de tarjetas pequeñas (varias por fila).
- `"list"` → `PhotoListView` — tarjetas grandes en fila (foto a la izquierda,
  detalles en columnas a la derecha). **Esta es la "vista de tarjeta
  grande"** — no confundir con `"photos"`, que se ve parecida pero es la
  chica.
- `"table"` → tabla tanstack.

Si el pedido menciona solo "tabla y tarjeta grande" sin más contexto, aun así
conviene implementar los 3 modos con el mismo componente/ícono que el resto
del proyecto (`PhotoGridView`+`PhotoListView`+tabla) en vez de quedarte con
2 — es lo que espera el usuario al comparar contra cualquier pantalla ya
existente (bitácora, rondines, etc.), y agregar el tercero después es
retrabajo evitable. `PhotoListView` consume `ListRecord[]`
(`formatListRecord`, registrado en `mappers_list` de `formatRecords.tsx`) —
si el shape del mapper de grid ya cubre los campos que pide `ListRecord`,
un alias (`export const mapXList = mapXGrid`) es válido y evita duplicar
lógica.

## 11. Filtro default que refleja el estado "vigente" del recurso

Varias pantallas de listado tienen un filtro que arranca preseleccionado a
un valor "vigente" (bitácora arranca en Estatus=Entrada, es decir "gente que
sigue dentro", no en "Todos"). Al construir un explorador nuevo, pregúntate
si el recurso tiene un campo de vigencia/estado análogo (para áreas:
`area_state` Activa/Inactiva) y si el default correcto es "solo lo vigente"
en vez de "todo sin filtrar" — es fácil pasarlo por alto porque no viene
explícito en el pedido original, se infiere por comparación con la pantalla
de referencia. Implementarlo como default en el estado inicial del hook de
filtros (no como un filtro más que el usuario tiene que prender a mano).

## 12. Los filtros se resuelven en el backend, no en el cliente

Igual que `list_bitacora`/`list_bitacora2`, los filtros de una Pantalla
Explorador se aplican con un `$match` de Mongo en el backend, NO filtrando el
array ya cargado en JS. El front solo arma `dynamic_filters` (`{key,
value}[]`, derivado de `externalFilters.dynamic` con un `.filter()` que
descarta vacíos — mismo transform que `useBitacoraFilters.dynamicFiltersArray`)
y lo manda en el body de la petición; ese array entra al `queryKey` de
react-query para que cambiar un filtro dispare un refetch real, no un
re-render local. Si el endpoint del backend solo aceptaba `GET` con query
params simples, cambiar a `POST` para poder mandar `dynamic_filters` (una
lista de dicts no cabe confiablemente en query string — mismo comentario
literal que ya existe en `script_turnos.py` para `list_bitacora`). No dejes
una función `applyXFilters` filtrando en cliente "por si acaso" — si el
backend ya filtra, es código muerto y además duplica el filtrado sin avisar.

## 13. Si el backend de esta pantalla vive en Sanic (`lkf-sanic-apps`)

Cuando el back de una Pantalla Explorador ya se migró a Sanic, sigue el
patrón `<script>_sdk.py` (ej. `rondines_sdk.py`, `filters_sdk.py`): mismo
endpoint (`/api/infosync/scripts/run/`), mismo shape de payload, el front
SOLO cambia el `script_name` — nunca inventes una URL/base nueva. Ver
`[[project_lkf_sanic_apps]]` (memoria) para la arquitectura completa: cómo
extender `addons/accesos/service.py`/`routes.py` con `dynamic_filters`, el
patrón de override por cuenta (`accesos_service.py`/`accesos_routes.py`) para
probar sin rebuild o sin afectar todas las cuentas de producción, y el
gotcha del `default_image` al instalar un script CLI nuevo.

## 14. Pantalla de detalle (`[id]`) para un registro de la Pantalla Explorador

Cuando el pedido es "que desde la vista exploratoria se pueda llegar al
detalle de un registro" (ej. `/dashboard/areas/<record_id>`), el precedente
ya existente en el proyecto es `dashboard/ver-recorrido/[id]/page.tsx` +
`RondinDetalle` — pantalla completa con botón "volver" (`MoveLeft` +
`router.push` a la pantalla explorador), NO modal. Se replicó igual para
Áreas: `dashboard/areas/[id]/page.tsx` + `components/Areas/AreaDetalle.tsx`.

Piezas que hay que tocar, en 3 repos distintos (de atrás hacia adelante):

1. **Legacy (`addons/modules/<modulo>/items/scripts/.../<script>.py`)**: un
   método `get_<recurso>_by_id(record_id)` que hace `$match` por
   `_id: ObjectId(record_id)` + `form_id` + `deleted_at: {"$exists": False}`,
   proyectando los mismos campos que ya usa el método de catálogo/lista del
   mismo recurso (ej. `get_areas_details`/`get_catalog_areas_formatted`) y
   devolviendo el mismo shape que un ítem de esa lista — así el front puede
   reusar el mismo mapper/normalizer sin tocarlo. Si el recurso no existe,
   `raise self.LKFException({'msg': '...', 'status_code': 404})` (regla
   fundamental del SDK, nunca `return {'error': ...}`).
2. **`lkf-sanic-apps` (`app/modules/.../<script>_sdk.py`)**: una función
   `get_<recurso>_by_id(params)` que hace
   `dispatch("get_<recurso>_by_id", params={'record_id': ...}, method='get', **params)`
   y se registra en el diccionario `DISPATCHER` al final del archivo — el
   `dispatch()` simplemente pega por HTTP a
   `http://0.0.0.0:8000/<module>/<end_point>` (mismo nombre de método que en
   el paso 1), no requiere routing adicional.
3. **Front (`clave10`)**: `getXByIdSdk` en `lib/<recurso>-sdk.ts` (mismo
   patrón `script_name`/`option`/`getValidToken` que el resto), hook
   `useGetXById(record_id)` en `hooks/<Recurso>/` (calca
   `useGetRondinById.tsx`: `useQuery` con `enabled: !!record_id`), página
   `[id]/page.tsx` (`"use client"`, `use(params)`, delega todo a un
   componente) y el componente de detalle en `components/<Recurso>/`.

**Cómo entrar al detalle desde la Pantalla Explorador** — hay que cablear
las 3 vistas, no solo la tabla:

- Vista tabla: la columna "Opciones" ya tiene un ícono "Ver" (`Eye`) — su
  handler debe hacer `router.push(...)` en vez de abrir un modal de
  preview.
- Vistas `photos`/`list`: `PhotoGridView`/`PhotoListView` abren un modal de
  preview **interno** al hacer click en la tarjeta (`handleCardClick`), no
  hay forma de desactivarlo por defecto. Se les agregó soporte para un
  `onRecordClick` que, si se pasa, **reemplaza** la apertura del modal (no
  coexiste con ella) — ver el diff en ambos archivos. Como antes de este
  cambio nadie pasaba `onRecordClick`, es retrocompatible para el resto de
  pantallas (bitácora, incidencias, etc.) que siguen sin pasarlo y
  conservan el modal de preview de toda la vida.
- Si se cablea el `onRecordClick` para navegar, el modal de preview que
  antes vivía a nivel de la tabla explorer (ej. `PhotoGridCardModal` para
  el ícono "Ver" de la tabla) queda muerto — hay que borrarlo junto con su
  estado (`selectedRecord`/`isModalOpen`), no dejarlo sin usar.

## Ver también

- `crear_actualizar_area.md` — field-ids y shape de datos del lado backend
  para el módulo de áreas.
