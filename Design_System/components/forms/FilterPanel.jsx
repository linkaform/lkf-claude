import React from "react";

const Chevron = ({open}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={open?"m18 15-6-6-6 6":"m6 9 6 6 6-6"}/></svg>
);

export function FilterSection({title,count,children,defaultOpen=true}) {
  const [open,setOpen] = React.useState(defaultOpen);
  return (
    <div style={{marginBottom:"24px"}}>
      <button onClick={()=>setOpen(!open)}
        style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:0,border:"none",
          background:"transparent",cursor:"pointer",fontFamily:"var(--font-sans)"}}>
        <span style={{display:"inline-flex",alignItems:"center",gap:"8px",fontSize:"var(--font-size-base)",
          fontWeight:"var(--font-weight-bold)",color:"var(--c10-text-primary)"}}>
          {title}
          {count ? (
            <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"20px",height:"20px",
              borderRadius:"var(--radius-full)",background:"var(--c10-blue)",color:"#fff",fontSize:"var(--font-size-xs)",
              fontWeight:"var(--font-weight-semibold)",lineHeight:1}}>{count}</span>
          ) : null}
        </span>
        <span style={{display:"flex",color:"var(--c10-text-secondary)"}}><Chevron open={open}/></span>
      </button>
      {open ? <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"14px"}}>{children}</div> : null}
    </div>
  );
}

/** Cajón de filtros que entra desde la izquierda y atenúa la tabla detrás. */
export function FilterPanel({open=true,activeCount,width=316,onClear,onClose,children,style}) {
  if (!open) return null;
  return (
    <div style={{position:"absolute",inset:0,zIndex:60,display:"flex"}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(255,255,255,.72)"}}/>
      <aside style={{position:"relative",width:width+"px",boxSizing:"border-box",padding:"24px",overflowY:"auto",
        background:"var(--c10-surface)",boxShadow:"var(--shadow-lg)",fontFamily:"var(--font-sans)",...style}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px",marginBottom:"8px"}}>
          <span style={{display:"inline-flex",alignItems:"center",gap:"8px",fontSize:"var(--font-size-xl)",
            fontWeight:"var(--font-weight-bold)",color:"var(--c10-text-primary)"}}>
            Filtros
            {activeCount ? (
              <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"22px",height:"22px",
                borderRadius:"var(--radius-full)",background:"var(--c10-blue)",color:"#fff",fontSize:"var(--font-size-xs)",
                fontWeight:"var(--font-weight-semibold)",lineHeight:1}}>{activeCount}</span>
            ) : null}
          </span>
          <span style={{display:"inline-flex",alignItems:"center",gap:"14px"}}>
            <button onClick={onClear} style={{border:"none",background:"transparent",cursor:"pointer",padding:0,
              fontFamily:"var(--font-sans)",fontSize:"var(--font-size-sm)",color:"var(--c10-blue)"}}>Limpiar</button>
            <button onClick={onClose} aria-label="Cerrar" style={{border:"none",background:"transparent",cursor:"pointer",
              padding:0,color:"var(--c10-text-secondary)",fontSize:"16px",lineHeight:1}}>✕</button>
          </span>
        </div>
        <div style={{borderTop:"1px solid var(--c10-border)",marginBottom:"24px"}}/>
        {children}
      </aside>
    </div>
  );
}
