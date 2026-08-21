Barra principal de toda pantalla autenticada — logo y selector de ubicación a la izquierda; mega menú, campana de notificaciones y avatar **alineados a la derecha** (el código en producción los centra; el diseño de referencia los ajusta a la derecha).

```jsx
<AppHeader logoSrc="assets/logo.png" location="Planta Monterrey" notificationCount={3}
  activeItem="Pases de entrada"
  items={[
    {label:"Accesos", sections:[{title:"Accesos",links:["Bitácora de entradas y salidas","Personal","Vehículos"]}]},
    {label:"Pases de entrada", sections:[
      {title:"Pases de entrada",links:["+ Nuevo pase","Activos","Por autorizar","En proceso","Todos"]},
      {title:"Transportistas",links:["+ Nuevo pase transportista"]}]},
    {label:"Caseta"},{label:"Seguridad"},{label:"Activos"},{label:"Ubicaciones"},
  ]}
  user={{name:"Emiliano Zapata",avatar:"assets/imagery/profile.png"}} />
```

Un item con `sections` obtiene chevron y abre el panel de mega menú al hover o al clic; sin `sections` es un enlace simple. `notificationCount` pinta el punto rojo con el conteo.