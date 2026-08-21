Status pill that colour-codes a Spanish status string exactly as the product does — pass the raw value, it normalises accents and case.

```jsx
<EstatusBadge estatus="En proceso" />
```

Green: corriendo, realizado, entregado, devuelto, entrada, "sin incidencias". Yellow: pausado, guardado. Blue: en proceso. Purple: programado. Red: abierto, pendiente, salida, any "incidencia". Slate: eliminado, cerrado, unknown. Amber: parcial.