Tabla de registros densa — la vista "tabla" de toda pantalla de listado.

```jsx
<DataTable onFilterToggle={()=>setFiltros(!filtros)} filterOpen={filtros}
  columns={[
    {header:"Opciones",cell:r=><RowActions><RowAction label="Ver detalle" icon={<Eye size={16}/>}/></RowActions>},
    {header:"Folio",key:"folio"},
    {header:"Estatus",cell:r=><EstatusBadge estatus={r.status}/>},
  ]} rows={rows} />
```

Encabezado #DBEAFE con etiquetas slate en mayúsculas; filas al hover #F1F5F9 con divisores hairline. **Toda tabla lleva la pestaña flotante de filtros** (media pastilla azul anclada al centro del costado izquierdo): pasa `onFilterToggle`. La primera columna es siempre OPCIONES con `RowAction` de solo icono. `UserCell` arma la pila avatar + nombre/subtítulo de las columnas de persona.