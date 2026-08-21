import React from "react";

const Sliders = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 5H3M20 5h-5M7 5v2.5M7 2.5V5"/><path d="M14 12H3M21 12h-3M18 12v2.5M18 9.5V12"/><path d="M9 19H3M21 19h-8M12 19v2.5M12 16.5V19"/></svg>
);

/**
 * Tabla de registros: encabezado azul claro en mayúsculas, filas con hover slate
 * y la pestaña flotante de filtros anclada al costado izquierdo.
 */
export function DataTable({columns=[],rows=[],dense=true,emptyLabel="No se encontraron registros",
  onFilterToggle,filterOpen=false,filterCount=0,style}) {
  const [hover,setHover] = React.useState(-1);
  const [tabHover,setTabHover] = React.useState(false);
  return (
    <div style={{position:"relative",...style}}>
      {onFilterToggle ? (
        <button onClick={onFilterToggle} aria-label="Filtros" aria-expanded={filterOpen}
          onMouseEnter={()=>setTabHover(true)} onMouseLeave={()=>setTabHover(false)}
          style={{position:"absolute",left:"-10px",top:"50%",transform:"translateY(-50%)",zIndex:20,
            width:"38px",height:"52px",display:"inline-flex",alignItems:"center",justifyContent:"center",
            padding:0,border:"none",cursor:"pointer",borderRadius:"0 var(--radius-full) var(--radius-full) 0",
            background:tabHover||filterOpen?"var(--c10-blue-hover)":"var(--c10-blue)",color:"#fff",
            boxShadow:"var(--shadow-md)",transition:"var(--transition-fast)"}}>
          <Sliders/>
          {filterCount > 0 ? (
            <span style={{position:"absolute",top:"-6px",right:"-6px",minWidth:"20px",height:"20px",padding:"0 5px",
              boxSizing:"border-box",display:"inline-flex",alignItems:"center",justifyContent:"center",
              borderRadius:"var(--radius-full)",background:"#fff",color:"var(--c10-blue)",
              fontSize:"var(--font-size-xs)",fontWeight:"var(--font-weight-bold)",lineHeight:1,
              boxShadow:"var(--shadow-md)"}}>{filterCount}</span>
          ) : null}
        </button>
      ) : null}

      <div style={{border:"1px solid var(--c10-border)",borderRadius:"var(--radius-md)",overflow:"hidden",
        background:"var(--c10-surface)",boxShadow:"var(--shadow-sm)",fontFamily:"var(--font-sans)"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:dense?"var(--font-size-xs)":"var(--font-size-sm)",textAlign:"left"}}>
          <thead>
            <tr style={{background:"#DBEAFE",borderBottom:"1px solid #E2E8F0"}}>
              {columns.map((c,i)=>(
                <th key={i} style={{height:"40px",padding:"8px 12px",color:"#475569",fontWeight:"var(--font-weight-medium)",
                  textTransform:"uppercase",letterSpacing:"0.05em",whiteSpace:"nowrap",width:c.width}}>{c.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length} style={{height:"128px",textAlign:"center",color:"#CBD5E1",fontSize:"var(--font-size-xs)"}}>{emptyLabel}</td></tr>
            ) : rows.map((r,ri)=>(
              <tr key={ri} onMouseEnter={()=>setHover(ri)} onMouseLeave={()=>setHover(-1)}
                style={{background:hover===ri?"#F1F5F9":"transparent",borderBottom:"1px solid #F8FAFC",transition:"var(--transition-fast)"}}>
                {columns.map((c,ci)=>(
                  <td key={ci} style={{padding:"8px 12px",verticalAlign:"middle",color:"var(--c10-text-primary)",
                    borderRight:ci===columns.length-1?"none":"1px solid #F1F5F9"}}>
                    {typeof c.cell === "function" ? c.cell(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function UserCell({name,sub,src}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
      <span style={{width:36,height:36,borderRadius:"var(--radius-full)",overflow:"hidden",background:"var(--c10-border)",flexShrink:0,display:"inline-block"}}>
        {src ? <img src={src} alt={name} style={{width:"100%",height:"100%",objectFit:"cover"}}/> : null}
      </span>
      <span style={{display:"flex",flexDirection:"column"}}>
        <span style={{fontWeight:"var(--font-weight-semibold)",color:"var(--c10-text-primary)"}}>{name}</span>
        {sub ? <span style={{fontSize:"var(--font-size-xs)",color:"var(--c10-text-secondary)"}}>{sub}</span> : null}
      </span>
    </div>
  );
}
