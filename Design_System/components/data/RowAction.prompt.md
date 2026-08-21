Acción de fila de tabla: **solo icono**, botón cuadrado con fondo gris; al hover toma el azul claro del encabezado (#DBEAFE) con el icono en azul de acción y muestra el tooltip. Agrupa varias con `RowActions`. En tarjetas y listas usa `shape="circle"`; en tablas muy densas `shape="plain"`. `tone="accent"` da el icono naranja de traslado/salida.

```jsx
<RowActions>
  <RowAction label="Ver detalle" icon={<Eye size={16}/>} onClick={ver} />
  <RowAction label="Editar" icon={<Pencil size={16}/>} onClick={editar} />
  <RowAction label="Descargar" icon={<Download size={16}/>} disabled />
</RowActions>
```

Nunca pongas texto en estas acciones: la columna OPCIONES es solo iconos. Las acciones no disponibles para el registro se dejan `disabled` (visibles al 40%), no se ocultan.