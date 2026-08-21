Modo **tarjetas** (el modo por defecto) de una sección de listado: foto de 340px arriba con el folio y el estatus superpuestos, cuerpo con nombre, empresa, chip de perfil, metadatos con icono y fila de acciones al pie.

```jsx
<PhotoCard image={r.img} title="Margarita Gomez Velazquez" subtitle="Linkaform"
  folio="8612-10" estatus="Entrada" perfil="Auditor de Gobierno"
  details={[
    {icon:<IconPin/>,label:"Ubicación",value:"Planta Monterrey"},
    {icon:<IconUser/>,label:"Visita a",value:"Juan Escutia"},
    {icon:<IconCalendar/>,label:"Entrada",value:"2026-07-31 12:14"},
    {icon:<IconCalendar/>,label:"Salida",value:"2026-07-28 18:51",tone:"danger"},
  ]}
  actions={<><RowAction label="Vehículo" icon={<IconCar/>} shape="circle"/><RowAction label="Imprimir" icon={<IconPrint/>} shape="circle"/></>} />
```

La fecha de salida se marca `tone:"danger"` — en rojo — porque cierra el registro. Las acciones van en `shape="circle"`.