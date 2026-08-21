Cajón de filtros que abre la pestaña flotante de la tabla: entra por la izquierda, atenúa la tabla con un velo blanco y agrupa los filtros en secciones colapsables de `FilterChip` contados.

```jsx
<FilterPanel open={open} activeCount={1} onClear={limpiar} onClose={()=>setOpen(false)}>
  <FilterSection title="Fecha"><Select options={["Todos","Hoy","Esta semana"]} /></FilterSection>
  <FilterSection title="Estatus" count={1}>
    <FilterChip label="Entrada" count={58} />
    <FilterChip label="Salida" count={0} selected />
  </FilterSection>
  <FilterSection title="Visita a" defaultOpen={false} />
</FilterPanel>
```

Se monta dentro de un contenedor `position:relative` (el área de la pantalla). Aquí viven los KPI de la sección: los contadores de los chips.