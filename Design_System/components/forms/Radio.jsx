import React from "react";

export function Radio({checked=false,label,disabled=false,onChange,style}) {
  return (
    <label style={{display:"inline-flex",alignItems:"center",gap:"8px",fontFamily:"var(--font-sans)",
      fontSize:"var(--font-size-sm)",color:"var(--c10-text-primary)",cursor:disabled?"not-allowed":"pointer",
      opacity:disabled?0.5:1,...style}}>
      <span onClick={()=>!disabled&&onChange&&onChange(true)}
        style={{width:16,height:16,display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,
          borderRadius:"var(--radius-full)",border:"1px solid "+(checked?"var(--c10-blue)":"var(--c10-border-strong)"),
          background:"var(--c10-surface)",transition:"var(--transition-fast)"}}>
        {checked ? <span style={{width:8,height:8,borderRadius:"var(--radius-full)",background:"var(--c10-blue)"}}/> : null}
      </span>
      {label}
    </label>
  );
}
