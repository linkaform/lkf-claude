Modo **lista de tarjetas**: fila de ancho completo con la foto a la izquierda (más su tira de miniaturas) y a la derecha el nombre, los chips de estatus / perfil / folio y una rejilla de tres columnas con campos etiquetados en mayúsculas.

```jsx
<RecordListItem image={r.img} thumbnails={[r.img, r.iden]} title="Margarita Gomez Velazquez" subtitle="Linkaform"
  estatus="Entrada" perfil="Auditor de Gobierno" folio="8612-10" selectable
  fields={[
    {label:"Caseta",value:"Caseta Principal"},
    {label:"Visita a",value:"Juan Escutia"},
    {label:"Fecha de entrada",value:"2026-07-31 12:14:56"},
    {label:"Fecha de salida"},
    {label:"Gafete",value:"No asignado"},
  ]}
  actions={<RowAction label="Imprimir" icon={<IconPrint/>} shape="circle"/>} />
```

Un campo sin valor imprime `---`: el hueco se declara, no se oculta. El estatus va en versión sólida (`solid`) porque compite con los otros dos chips.