import React from "react";

export function Tooltip({content,placement="top",style,children}) {
  const [open,setOpen] = React.useState(false);
  const pos = placement === "bottom" ? {top:"calc(100% + 8px)"} : {bottom:"calc(100% + 8px)"};
  return (
    <span style={{position:"relative",display:"inline-block",...style}}
      onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
      {children}
      {open ? (
        <span style={{position:"absolute",left:"50%",transform:"translateX(-50%)",...pos,zIndex:9999,
          minWidth:"160px",padding:"12px",background:"var(--c10-surface)",border:"1px solid var(--c10-border)",
          borderRadius:"var(--radius-lg)",boxShadow:"var(--shadow-lg)",fontFamily:"var(--font-sans)",
          fontSize:"var(--font-size-xs)",color:"var(--c10-text-primary)",pointerEvents:"none"}}>{content}</span>
      ) : null}
    </span>
  );
}
