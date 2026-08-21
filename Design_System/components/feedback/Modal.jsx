import React from "react";

export function Modal({open=true,title,description,width=512,onClose,footer,style,children}) {
  if (!open) return null;
  return (
    <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
      background:"rgba(0,0,0,.8)",zIndex:50,fontFamily:"var(--font-sans)"}}>
      <div style={{position:"relative",width:"100%",maxWidth:width+"px",boxSizing:"border-box",background:"var(--c10-surface)",
        border:"1px solid var(--c10-border)",borderRadius:"var(--radius-lg)",boxShadow:"var(--shadow-lg)",padding:"24px",
        display:"grid",gap:"16px",...style}}>
        <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
          {title ? <h2 style={{margin:0,fontSize:"var(--font-size-md)",fontWeight:"var(--font-weight-semibold)",letterSpacing:"var(--tracking-tight)",color:"var(--c10-text-primary)"}}>{title}</h2> : null}
          {description ? <p style={{margin:0,fontSize:"var(--font-size-sm)",color:"var(--c10-text-secondary)"}}>{description}</p> : null}
        </div>
        {children}
        {footer ? <div style={{display:"flex",justifyContent:"flex-end",gap:"8px"}}>{footer}</div> : null}
        <button onClick={onClose} aria-label="Cerrar"
          style={{position:"absolute",right:16,top:16,border:"none",background:"transparent",cursor:"pointer",
            color:"var(--c10-text-secondary)",opacity:.7,fontSize:"14px",lineHeight:1}}>✕</button>
      </div>
    </div>
  );
}
