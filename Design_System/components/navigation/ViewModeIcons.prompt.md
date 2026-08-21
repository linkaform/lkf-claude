Constante con los tres modos de visualización estándar (tarjetas, tarjetas en lista, tabla) y sus iconos lucide, lista para pasar a `SectionHeader`.

```jsx
const { VIEW_MODES } = window.Clave10DesignSystem_b774bd;
<SectionHeader viewModes={VIEW_MODES} viewMode={view} onViewModeChange={setView} title="Bitácora de entradas y salidas" />
```