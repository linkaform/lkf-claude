import React from "react";

export function Card({elevation="sm",padding="20px",interactive=false,selected=false,style,children}) {
  const [hover,setHover] = React.useState(false);
  const shadow = elevation==="none" ? "none" : elevation==="md" ? "var(--shadow-md)" : elevation==="lg" ? "var(--shadow-lg)" : "var(--shadow-sm)";
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{background:"var(--surface-card)",
        border:"1px solid "+(selected?"var(--c10-blue-select)":"var(--c10-border)"),
        borderRadius:"var(--radius-lg)",boxShadow:interactive&&hover?"var(--shadow-lg)":shadow,
        padding,transition:"var(--transition-normal)",cursor:interactive?"pointer":"default",
        fontFamily:"var(--font-sans)",color:"var(--c10-text-primary)",...style}}>
      {children}
    </div>
  );
}

export function CardTitle({children,style}) {
  return <div style={{fontSize:"var(--font-size-md)",fontWeight:"var(--font-weight-semibold)",letterSpacing:"var(--tracking-tight)",color:"var(--c10-text-primary)",...style}}>{children}</div>;
}

export function CardDescription({children,style}) {
  return <p style={{fontSize:"var(--font-size-sm)",color:"var(--c10-text-secondary)",margin:"4px 0 0",...style}}>{children}</p>;
}
