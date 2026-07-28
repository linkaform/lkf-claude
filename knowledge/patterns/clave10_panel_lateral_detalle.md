# Clave10 Panel Lateral De Detalle

> Cómo debe comportarse el "panel lateral" (Sheet) que muestra el detalle de un registro sin salir de la Pantalla Explorador — abrir/cerrar, cambiar de registro con un clic, y qué debe cerrar el panel y qué no.

## 0. Qué es

El panel lateral (`AreaDetallePanel`, `UbicacionDetallePanel`, ambos en
`clave10/src/components/<Recurso>/`) es un `Sheet` (shadcn, sobre Radix
`Dialog`) que se abre desde la derecha para mostrar el detalle de un
registro seleccionado en una Pantalla Explorador (ver
`clave10_front_explorer_screen.md`), sin navegar a otra página. Todo lo de
este doc aplica a cualquier recurso nuevo que use este mismo patrón.

## 1. Visibilidad derivada de un id, no de un boolean

```tsx
const [selectedId, setSelectedId] = useState<string | null>(null);
// ...
<Sheet open={!!selectedId} onOpenChange={(open) => !open && setSelectedId(null)} modal={false}>
```

`modal={false}` + `overlayClassName="pointer-events-none bg-transparent"`
en `SheetContent` — para que la lista de atrás siga siendo clickeable
mientras el panel está abierto (no hay overlay oscuro bloqueando clics).

## 2. `key={selectedId}` en el componente de contenido — si no, arrastra estado viejo

```tsx
{selectedId && <UbicacionDetalle key={selectedId} id={selectedId} />}
```

Sin el `key`, cambiar de un registro a otro (ver punto 3) **reusa la misma
instancia** del componente de detalle — cualquier `useState` interno (tab
activo, texto de un buscador anidado, modal de edición abierto) se queda
con el valor del registro anterior. Con `key={selectedId}`, React
desmonta/remonta el subárbol completo al cambiar de id, así cada registro
arranca limpio (tab "Generales", sin filtros de búsqueda residuales, etc.)
— sin necesidad de resetear cada pieza de estado a mano.

## 3. Cambiar de registro con un solo clic sin cerrar el panel — el gotcha grande

Requisito de producto: con el panel ya abierto (viendo el registro A), el
usuario le da clic al ícono "Ver" de otra fila (registro B) y espera que el
panel **cambie su contenido a B en ese mismo clic**, sin parpadeo de
cierre/apertura.

Esto no funciona solo con `open={!!selectedId}` + actualizar `selectedId`:
Radix Dialog detecta el clic en el ícono "Ver" de la fila B como un clic
**afuera** del `SheetContent` (porque la fila vive en la tabla, no dentro
del panel) y dispara su cierre automático (`onOpenChange(false)`) en el
mismo evento — el efecto observado es "el primer clic cierra el panel, hay
que darle un segundo clic para que abra con la info de B".

### Solución: marcar el/los trigger(s) que deben poder "cambiar sin cerrar"

No sirve prevenir el cierre para *todo* un contenedor amplio (ej. un
`gridContainerRef` que envuelve toda la tabla) — es la primera solución que
se intentó y en la práctica seguía fallando (el primer clic seguía
cerrando). Tampoco sirve el extremo opuesto de deshabilitar el cierre por
clic-afuera *completamente* — el producto sí quiere que clics en blanco,
en el header, en los filtros, etc. cierren el panel; solo el ícono "Ver"
es la excepción.

Lo que sí funciona: marcar con un atributo `data-*` el ícono/botón exacto
que debe poder cambiar el registro sin cerrar, y solo exceptuar ESE
elemento en `onPointerDownOutside`/`onInteractOutside`:

```tsx
// columns.tsx — en la celda de acciones de la tabla
<div data-ubicacion-ver="true" onClick={() => onVerUbicacion(row.original)}>
  <Eye className="w-5 h-5" />
</div>

// UbicacionDetallePanel.tsx
const handleOutsideInteraction = (e: Event) => {
  const target = e.target as HTMLElement | null;
  if (target?.closest?.("[data-ubicacion-ver]")) {
    e.preventDefault(); // no cierres — deja que el propio onClick cambie el id
  }
  // si no matchea, no se hace nada: Radix cierra el panel normalmente
};

<SheetContent
  onPointerDownOutside={handleOutsideInteraction}
  onInteractOutside={handleOutsideInteraction}
  ...
/>
```

Con esto: clic en "Ver" de cualquier fila (incluida una distinta a la ya
abierta) → el panel no se cierra, solo cambia `selectedId` (y por el punto
2, remonta limpio con la info del nuevo registro). Clic en cualquier otro
lado — espacio en blanco de la tabla, el título "Ubicaciones N registros",
los filtros, el ícono de lápiz/editar, el menú superior — cierra el panel
normalmente, sin código adicional (es el comportamiento default de Radix
cuando no se llama `preventDefault()`).

## 4. Ancho del panel

`sm:max-w-3xl` es el default heredado de `AreaDetallePanel`; para
Ubicaciones se subió a `sm:max-w-5xl` a pedido explícito del usuario ("un
poco más grande") — no hay una regla fija, ajusta según cuánto contenido
tenga el detalle (tabs verticales + contenido a la derecha necesita más
ancho que una tarjeta simple de datos).

## Ver también
- `clave10_front_explorer_screen.md` — patrón completo de la Pantalla Explorador donde vive este panel.
