Grupo de celdas unidas para subnavegación y modo de visualización; la celda activa se pinta en azul de acción con texto blanco.

```jsx
<SegmentedControl value={tab} onChange={setTab}
  options={[{value:"personal",label:"Personal"},{value:"vehiculos",label:"Vehículos"},{value:"equipos",label:"Equipos"}]} />
```

Con `iconOnly` las celdas son cuadradas: así se construye el conmutador de vistas (tarjetas / lista / tabla).