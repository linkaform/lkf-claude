import React from "react";

/* Grupo de celdas unidas con borde compartido; la activa se pinta en azul de acción. */
export function SegmentedControl({value,options=[],onChange,iconOnly=false,height=40,style}) {
  return (
    <div style={{display:"inline-flex",alignItems:"stretch",height,borderRadius:"var(--radius-md)",overflow:"hidden",
      border:"1px solid #E2E8F0",background:"var(--c10-surface)",...style}}>
      {options.map((o,i)=>{
        const active = o.value === value;
        return (
          <button key={o.value} onClick={()=>onChange&&onChange(o.value)} title={o.label}
            style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"6px",
              width:iconOnly?height:"auto",padding:iconOnly?0:"0 24px",border:"none",
              borderLeft:i===0?"none":"1px solid #E2E8F0",cursor:"pointer",whiteSpace:"nowrap",
              transition:"var(--transition-fast)",fontFamily:"var(--font-sans)",fontSize:"var(--font-size-sm)",
              fontWeight:active?"var(--font-weight-medium)":"var(--font-weight-normal)",
              background:active?"var(--c10-blue)":"transparent",
              color:active?"#fff":"#475569"}}>
            {o.icon}{iconOnly?null:o.label}
          </button>
        );
      })}
    </div>
  );
}
