import React from "react";

export function Tabs({value,items=[],onChange,style}) {
  return (
    <div style={{display:"inline-flex",alignItems:"center",height:"40px",padding:"4px",boxSizing:"border-box",
      background:"var(--c10-surface-sunken)",borderRadius:"var(--radius-md)",gap:"4px",fontFamily:"var(--font-sans)",...style}}>
      {items.map(it=>{
        const v = typeof it === "string" ? it : it.value;
        const l = typeof it === "string" ? it : it.label;
        const active = v === value;
        return (
          <button key={v} onClick={()=>onChange&&onChange(v)}
            style={{height:"100%",padding:"0 12px",border:"none",borderRadius:"var(--radius-sm)",cursor:"pointer",
              fontFamily:"var(--font-sans)",fontSize:"var(--font-size-sm)",fontWeight:"var(--font-weight-normal)",
              transition:"var(--transition-fast)",
              background:active?"var(--c10-surface)":"transparent",
              color:active?"var(--c10-text-primary)":"var(--c10-text-secondary)",
              boxShadow:active?"var(--shadow-sm)":"none"}}>{l}</button>
        );
      })}
    </div>
  );
}
