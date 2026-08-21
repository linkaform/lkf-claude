Chip de filtro con contador — el KPI real de las pantallas de listado vive aquí, dentro del panel de filtros.

```jsx
<FilterChip label="Entrada" count={58} selected={estatus==="entrada"} onClick={()=>setEstatus("entrada")} />
<FilterChip label="Salida" count={0} />
```

Seleccionado: azul de acción con el contador en cápsula translúcida. En reposo: gris claro. Un chip con contador 0 sigue visible: comunica ausencia, no se oculta.