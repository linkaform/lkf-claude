import React from "react";

const Chevron = ({open}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={open?"m18 15-6-6-6 6":"m6 9 6 6 6-6"}/></svg>
);

/** Bloque plegable del cuerpo del panel: tarjeta blanca con título y contador opcional. */
export function DetailSection({title,meta,collapsible=false,defaultOpen=true,padding="20px",children,style}) {
  const [open,setOpen] = React.useState(defaultOpen);
  const header = (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
      <span style={{display:"inline-flex",alignItems:"baseline",gap:"10px"}}>
        <span style={{fontSize:"var(--font-size-md)",fontWeight:"var(--font-weight-semibold)",color:"var(--c10-text-primary)"}}>{title}</span>
        {meta ? <span style={{fontSize:"var(--font-size-sm)",color:"var(--c10-text-secondary)"}}>{meta}</span> : null}
      </span>
      {collapsible ? <span style={{display:"flex",color:"var(--c10-text-secondary)"}}><Chevron open={open}/></span> : null}
    </div>
  );
  return (
    <div style={{background:"var(--c10-surface)",border:"1px solid var(--c10-border)",borderRadius:"var(--radius-lg)",
      overflow:"hidden",fontFamily:"var(--font-sans)",...style}}>
      {collapsible
        ? <button onClick={()=>setOpen(!open)} style={{display:"block",width:"100%",boxSizing:"border-box",padding,
            border:"none",background:"transparent",cursor:"pointer",textAlign:"left",fontFamily:"var(--font-sans)"}}>{header}</button>
        : <div style={{padding,paddingBottom:children?"12px":padding}}>{header}</div>}
      {open && children ? <div style={{padding:"0 "+padding+" "+padding}}>{children}</div> : null}
    </div>
  );
}

/** Par etiqueta / valor del cuerpo del panel. */
export function DetailField({label,value,style}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"2px",...style}}>
      <span style={{fontSize:"var(--font-size-xs)",textTransform:"uppercase",letterSpacing:"0.05em",color:"var(--c10-text-muted)"}}>{label}</span>
      <span style={{fontSize:"var(--font-size-base)",fontWeight:"var(--font-weight-semibold)",color:"var(--c10-text-primary)"}}>{value}</span>
    </div>
  );
}

/**
 * Panel lateral de detalle de registro, estilo Notion: entra desde la derecha,
 * mantiene la tabla visible y se puede ensanchar arrastrando el borde izquierdo.
 * El ancho elegido se recuerda en localStorage.
 */
export function DetailPanel({open=false,eyebrow,title,badge,actions,footerNote,footer,
  defaultWidth=1040,minWidth=480,maxWidth=1440,storageKey,onClose,children,style}) {
  const [width,setWidth] = React.useState(defaultWidth);
  const [dragging,setDragging] = React.useState(false);
  const [hint,setHint] = React.useState(false);

  React.useEffect(()=>{
    if (!storageKey) return;
    try { const v = parseInt(window.localStorage.getItem(storageKey),10); if (v) setWidth(v); } catch(e){}
  },[storageKey]);

  React.useEffect(()=>{
    if (!dragging) return;
    const move = (e) => {
      const next = Math.min(maxWidth, Math.max(minWidth, window.innerWidth - e.clientX));
      setWidth(next);
    };
    const up = () => {
      setDragging(false);
      if (storageKey) { try { window.localStorage.setItem(storageKey, String(width)); } catch(e){} }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  },[dragging,width,minWidth,maxWidth,storageKey]);

  if (!open) return null;
  return (
    <aside role="dialog" aria-label={title}
      style={{position:"fixed",top:0,right:0,bottom:0,width:width+"px",maxWidth:"100vw",zIndex:70,display:"flex",
        background:"#F8FAFC",boxShadow:"-8px 0 24px rgba(15,23,42,.12)",fontFamily:"var(--font-sans)",...style}}>

      <div onMouseDown={()=>setDragging(true)} onMouseEnter={()=>setHint(true)} onMouseLeave={()=>setHint(false)}
        title="Arrastra para ajustar el ancho"
        style={{position:"relative",width:"8px",flexShrink:0,cursor:"col-resize",
          background:dragging||hint?"var(--c10-blue)":"transparent",transition:"background var(--duration-fast) var(--ease-standard)"}}>
        <span style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:"4px",height:"36px",
          borderRadius:"var(--radius-full)",background:dragging||hint?"#fff":"var(--c10-border-strong)"}}/>
        {hint && !dragging ? (
          <span style={{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",whiteSpace:"nowrap",
            padding:"6px 10px",borderRadius:"var(--radius-sm)",background:"#0F172A",color:"#fff",
            fontSize:"var(--font-size-xs)",pointerEvents:"none",zIndex:2}}>Arrastra para ajustar el ancho</span>
        ) : null}
      </div>

      <div style={{flex:1,minWidth:0,display:"flex",flexDirection:"column"}}>
        <header style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"16px",flexShrink:0,
          padding:"20px 24px",background:"var(--c10-surface)",borderBottom:"1px solid var(--c10-border)"}}>
          <div style={{minWidth:0}}>
            {eyebrow ? <div style={{fontSize:"var(--font-size-xs)",textTransform:"uppercase",letterSpacing:"0.08em",
              color:"var(--c10-text-muted)",marginBottom:"4px"}}>{eyebrow}</div> : null}
            <div style={{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}}>
              <span style={{fontSize:"var(--font-size-xl)",fontWeight:"var(--font-weight-bold)",
                letterSpacing:"var(--tracking-tight)",fontVariantNumeric:"tabular-nums",color:"#0F172A"}}>{title}</span>
              {badge}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"8px",flexShrink:0}}>
            {actions}
            <button onClick={onClose} aria-label="Cerrar"
              style={{width:"36px",height:"36px",display:"inline-flex",alignItems:"center",justifyContent:"center",
                border:"1px solid var(--c10-border)",borderRadius:"var(--radius-md)",background:"var(--c10-surface)",
                cursor:"pointer",color:"var(--c10-text-secondary)",fontSize:"14px",lineHeight:1}}>✕</button>
          </div>
        </header>

        <div style={{flex:1,minHeight:0,overflowY:"auto",padding:"20px 24px",display:"flex",flexDirection:"column",gap:"12px"}}>
          {children}
        </div>

        {footer || footerNote ? (
          <footer style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"16px",flexShrink:0,
            padding:"16px 24px",background:"var(--c10-surface)",borderTop:"1px solid var(--c10-border)"}}>
            <span style={{fontSize:"var(--font-size-sm)",color:"var(--c10-text-secondary)"}}>{footerNote}</span>
            <span style={{display:"inline-flex",gap:"8px"}}>{footer}</span>
          </footer>
        ) : null}
      </div>
    </aside>
  );
}
