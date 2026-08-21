El KPI de una sección de listado — chip pequeño inmediatamente a la derecha del título. **Las pantallas con tabla no llevan tarjetas de KPI**: la cifra vive en este chip o en los chips contados del panel de filtros.

```jsx
<KpiChip value={715} />            {/* "715 registros" en azul */}
<KpiChip value={12} label="abiertas" tone="danger" />
```

`SectionHeader` lo pinta solo con pasar `totalRecords`.