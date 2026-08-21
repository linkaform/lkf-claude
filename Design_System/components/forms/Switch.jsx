import React from "react";

export function Switch({checked=false,label,disabled=false,onChange,style}) {
  return (
    <label style={{display:"inline-flex",alignItems:"center",gap:"10px",fontFamily:"var(--font-sans)",
      fontSize:"var(--font-size-sm)",color:"var(--c10-text-primary)",cursor:disabled?"not-allowed":"pointer",
      opacity:disabled?0.5:1,...style}}>
      <span onClick={()=>!disabled&&onChange&&onChange(!checked)}
        style={{width:44,height:24,borderRadius:"var(--radius-full)",padding:2,boxSizing:"border-box",
          display:"inline-flex",alignItems:"center",flexShrink:0,transition:"var(--transition-fast)",
          background:checked?"var(--c10-blue)":"var(--c10-border-strong)"}}>
        <span style={{width:20,height:20,borderRadius:"var(--radius-full)",background:"#fff",boxShadow:"var(--shadow-md)",
          transform:checked?"translateX(20px)":"translateX(0)",transition:"transform var(--duration-fast) var(--ease-standard)"}}/>
      </span>
      {label}
    </label>
  );
}
