import React from "react";

export function EmptyState({title="No se encontraron registros",description,icon,action,style}) {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"12px",
      padding:"48px 24px",textAlign:"center",borderRadius:"var(--radius-lg)",border:"1px dashed var(--c10-border)",
      fontFamily:"var(--font-sans)",...style}}>
      {icon ? <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:40,height:40,
        borderRadius:"var(--radius-md)",background:"var(--c10-surface-sunken)",color:"var(--c10-text-secondary)"}}>{icon}</div> : null}
      <div style={{fontSize:"var(--font-size-md)",fontWeight:"var(--font-weight-medium)",color:"var(--c10-text-primary)",letterSpacing:"var(--tracking-tight)"}}>{title}</div>
      {description ? <div style={{fontSize:"var(--font-size-sm)",color:"var(--c10-text-secondary)",maxWidth:"340px"}}>{description}</div> : null}
      {action}
    </div>
  );
}
