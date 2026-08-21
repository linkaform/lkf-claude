import React from "react";
import { EstatusBadge } from "../core/EstatusBadge.jsx";
import { Badge } from "../core/Badge.jsx";

/**
 * Modo "tarjetas": foto grande arriba con folio y estatus superpuestos,
 * cuerpo con nombre, empresa, chip de perfil, lista de metadatos y fila de acciones.
 */
export function PhotoCard({image,title,subtitle,folio,estatus,perfil,details=[],actions,
  selected=false,onClick,style}) {
  const [hover,setHover] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{width:"280px",display:"flex",flexDirection:"column",overflow:"hidden",cursor:"pointer",
        background:"var(--c10-surface)",borderRadius:"var(--radius-lg)",
        border:"1px solid "+(selected?"var(--c10-blue)":"var(--c10-border)"),
        boxShadow:hover?"var(--shadow-lg)":"var(--shadow-sm)",transition:"var(--transition-normal)",
        fontFamily:"var(--font-sans)",...style}}>

      <div style={{position:"relative",height:"340px",overflow:"hidden",background:"var(--c10-surface-sunken)"}}>
        {image
          ? <img src={image} alt={title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          : <div style={{display:"flex",height:"100%",alignItems:"center",justifyContent:"center",color:"#94A3B8",
              fontStyle:"italic",fontSize:"var(--font-size-xs)"}}>Sin imagen</div>}
        <div style={{position:"absolute",top:10,right:10,display:"flex",flexDirection:"column",gap:"6px",alignItems:"flex-end"}}>
          {folio ? <Badge tone="process" style={{fontVariantNumeric:"tabular-nums"}}>{folio}</Badge> : null}
          {estatus ? <EstatusBadge estatus={estatus}/> : null}
        </div>
      </div>

      <div style={{display:"flex",flexDirection:"column",padding:"16px"}}>
        <span style={{fontSize:"var(--font-size-sm)",fontWeight:"var(--font-weight-bold)",color:"#0F172A",lineHeight:1.35}}>{title}</span>
        {subtitle ? <span style={{marginTop:"2px",fontSize:"var(--font-size-sm)",color:"var(--c10-text-secondary)"}}>{subtitle}</span> : null}
        {perfil ? <span style={{marginTop:"12px"}}><Badge tone="purple" shape="square">{perfil}</Badge></span> : null}

        {details.length ? (
          <div style={{marginTop:"14px",paddingTop:"14px",borderTop:"1px solid var(--c10-border)",
            display:"flex",flexDirection:"column",gap:"8px"}}>
            {details.map((d,i)=>(
              <span key={i} style={{display:"flex",alignItems:"center",gap:"8px",fontSize:"var(--font-size-sm)",
                color:d.tone==="danger"?"var(--c10-danger)":"var(--c10-text-secondary)"}}>
                <span style={{display:"flex",flexShrink:0,color:d.tone==="danger"?"var(--c10-danger)":"var(--c10-text-muted)"}}>{d.icon}</span>
                <span style={{fontVariantNumeric:"tabular-nums"}}>{d.label ? d.label + ": " : ""}{d.value}</span>
              </span>
            ))}
          </div>
        ) : null}

        {actions ? (
          <div style={{marginTop:"14px",paddingTop:"14px",borderTop:"1px solid var(--c10-border)",
            display:"flex",alignItems:"center",gap:"6px"}}>{actions}</div>
        ) : null}
      </div>
    </div>
  );
}
