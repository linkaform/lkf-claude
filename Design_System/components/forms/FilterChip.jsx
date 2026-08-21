import React from "react";

/**
 * Chip de filtro con contador. Seleccionado: azul de acción con el contador en
 * cápsula translúcida. En reposo: gris claro con contador en azul.
 */
export function FilterChip({label,count,selected=false,onClick,style}) {
  const [hover,setHover] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{display:"inline-flex",alignItems:"center",gap:"8px",height:"36px",padding:"0 14px",border:"none",
        borderRadius:"var(--radius-full)",cursor:"pointer",whiteSpace:"nowrap",transition:"var(--transition-fast)",
        fontFamily:"var(--font-sans)",fontSize:"var(--font-size-sm)",
        fontWeight:selected?"var(--font-weight-semibold)":"var(--font-weight-normal)",
        background:selected?"var(--c10-blue)":hover?"#E5E7EB":"#F1F5F9",
        color:selected?"#fff":"var(--c10-text-primary)",...style}}>
      {label}
      {count !== undefined ? (
        <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",minWidth:"20px",height:"18px",
          padding:"0 5px",boxSizing:"border-box",borderRadius:"var(--radius-full)",fontSize:"var(--font-size-xs)",
          fontWeight:"var(--font-weight-semibold)",fontVariantNumeric:"tabular-nums",lineHeight:1,
          background:selected?"rgba(255,255,255,.25)":"transparent",
          color:selected?"#fff":"var(--c10-text-muted)"}}>{count}</span>
      ) : null}
    </button>
  );
}
