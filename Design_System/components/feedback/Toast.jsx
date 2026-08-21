import React from "react";

const TONES = {
  success:{color:"var(--c10-success)",glyph:"✓"},
  error:{color:"var(--c10-danger)",glyph:"!"},
  info:{color:"var(--c10-blue)",glyph:"i"},
};

export function Toast({tone="success",title,description,style}) {
  const t = TONES[tone] || TONES.info;
  return (
    <div style={{display:"flex",alignItems:"flex-start",gap:"10px",width:"356px",boxSizing:"border-box",padding:"16px",
      background:"var(--c10-surface)",border:"1px solid var(--c10-border)",borderRadius:"var(--radius-md)",
      boxShadow:"var(--shadow-lg)",fontFamily:"var(--font-sans)",...style}}>
      <span style={{width:18,height:18,borderRadius:"var(--radius-full)",background:t.color,color:"#fff",flexShrink:0,
        display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:700,marginTop:1}}>{t.glyph}</span>
      <span>
        <span style={{display:"block",fontSize:"var(--font-size-sm)",fontWeight:"var(--font-weight-medium)",color:"var(--c10-text-primary)"}}>{title}</span>
        {description ? <span style={{display:"block",marginTop:2,fontSize:"var(--font-size-sm)",color:"var(--c10-text-secondary)"}}>{description}</span> : null}
      </span>
    </div>
  );
}
