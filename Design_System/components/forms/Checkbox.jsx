import React from "react";

export function Checkbox({checked=false,label,disabled=false,onChange,style}) {
  return (
    <label style={{display:"inline-flex",alignItems:"center",gap:"8px",fontFamily:"var(--font-sans)",
      fontSize:"var(--font-size-sm)",color:"var(--c10-text-primary)",cursor:disabled?"not-allowed":"pointer",
      opacity:disabled?0.5:1,...style}}>
      <span onClick={()=>!disabled&&onChange&&onChange(!checked)}
        style={{width:16,height:16,display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,
          borderRadius:"var(--radius-sm)",transition:"var(--transition-fast)",
          border:"1px solid "+(checked?"var(--c10-blue-select)":"var(--c10-border-strong)"),
          background:checked?"var(--c10-blue-select)":"var(--c10-surface)",color:"#fff",fontSize:"11px",lineHeight:1}}>
        {checked ? "✓" : ""}
      </span>
      {label}
    </label>
  );
}
