import React from "react";

export function Progress({value=0,height=16,tone="brand",style}) {
  const color = tone==="success"?"var(--c10-success)":tone==="warning"?"var(--c10-warning)":tone==="danger"?"var(--c10-danger)":"var(--c10-blue)";
  return (
    <div style={{position:"relative",height,width:"100%",overflow:"hidden",borderRadius:"var(--radius-full)",background:"var(--c10-surface-sunken)",...style}}>
      <div style={{height:"100%",width:Math.max(0,Math.min(100,value))+"%",background:color,transition:"var(--transition-normal)"}} />
    </div>
  );
}
