import React from "react";

/**
 * KPI de sección: chip pequeño a la derecha del título principal.
 * Reemplaza cualquier tarjeta de KPI en pantallas de listado.
 */
export function KpiChip({value,label="registros",tone="brand",style}) {
  const TONES = {
    brand:{background:"var(--c10-blue)",color:"#fff"},
    neutral:{background:"var(--c10-surface-sunken)",color:"var(--c10-text-secondary)"},
    danger:{background:"var(--c10-danger)",color:"#fff"},
    success:{background:"#16A34A",color:"#fff"},
  };
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:"4px",padding:"2px 8px",borderRadius:"var(--radius-sm)",
      fontFamily:"var(--font-sans)",fontSize:"var(--font-size-sm)",fontWeight:"var(--font-weight-medium)",
      lineHeight:1.45,whiteSpace:"nowrap",fontVariantNumeric:"tabular-nums",...(TONES[tone]||TONES.brand),...style}}>
      {value}{label ? " " + label : ""}
    </span>
  );
}
