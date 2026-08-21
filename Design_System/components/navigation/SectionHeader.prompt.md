Header secundario de cada sección del sistema — título con el KPI de registros a la izquierda; a la derecha buscador, acción verde (cuando la sección permite crear), tabs de subnavegación y tabs de modo de visualización.

```jsx
<SectionHeader title="Artículos perdidos" totalRecords={25}
  actionLabel="Nuevo Artículo Perdido" onAction={crear}
  subTabs={[{value:"paqueteria",label:"Paquetería"},{value:"concesionados",label:"Concesionados"},{value:"perdidos",label:"Perdidos"}]}
  subTab={tab} onSubTabChange={setTab}
  viewModes={VIEW_MODES} viewMode={view} onViewModeChange={setView} />
```

El orden de derecha a izquierda es fijo: buscador → acción → subnavegación → modo de visualización. Los modos de visualización son casi siempre tres: tarjetas (default), tarjetas en lista y tabla.