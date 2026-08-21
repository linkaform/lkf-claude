Detalle de un registro de bitácora — panel lateral estilo Notion: entra desde la derecha, **deja la tabla visible** y se ensancha arrastrando su borde izquierdo (el ancho se recuerda en `localStorage`). Úsalo en lugar de `Modal` para ver un registro; `Modal` queda para crear y confirmar.

```jsx
<DetailPanel open={!!registro} eyebrow="Detalle del registro" title={"#" + registro.folio}
  badge={<EstatusBadge estatus={registro.estatus} />}
  actions={<RowAction label="Imprimir" icon={<IconPrint/>} />}
  storageKey="c10.bitacoras.detalle.ancho"
  footerNote="Bitácora completa disponible en el expediente del folio"
  footer={<Button variant="secondary" onClick={cerrar}>Cerrar</Button>}
  onClose={cerrar}>
  <DetailSection title="Seguimiento" meta="Etapa 1 de 4 · Pendiente de autorización" collapsible defaultOpen={false} />
  <DetailSection title="Ruta del material">
    <div style={{display:"flex",gap:48}}>
      <DetailField label="Origen" value="Planta Puebla" />
      <DetailField label="Destino" value="Planta Mérida" />
    </div>
  </DetailSection>
  <DetailSection title="Materiales" meta="2 línea(s)" padding="0px"><DataTable columns={cols} rows={lineas} /></DetailSection>
</DetailPanel>
```

El cuerpo se compone de `DetailSection` (tarjetas blancas sobre fondo `#F8FAFC`, plegables cuando el bloque es secundario) y `DetailField` para pares etiqueta/valor. Ancho por defecto 1040px, mínimo 480, máximo 1440.