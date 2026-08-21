import React from "react";
import { EstatusBadge } from "../core/EstatusBadge.jsx";
import { Badge } from "../core/Badge.jsx";

/**
 * Modo "lista de tarjetas": tarjeta de ancho completo con la foto a la izquierda,
 * rejilla de campos etiquetados a la derecha y tira de miniaturas al pie de la foto.
 */
export function RecordListItem({image,thumbnails=[],title,subtitle,folio,estatus,perfil,
  fields=[],actions,selectable=false,selected=false,onSelect,onClick,style}) {
  const [hover,setHover] = React.useState(false);
  const [active,setActive] = React.useState(0);
  return (
    <div onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{position:"relative",display:"flex",gap:"28px",padding:"20px",boxSizing:"border-box",width:"100%",
        background:"var(--c10-surface)",borderRadius:"var(--radius-lg)",cursor:"pointer",
        border:"1px solid "+(selected?"var(--c10-blue)":"var(--c10-border)"),
        boxShadow:hover?"var(--shadow-md)":"var(--shadow-sm)",transition:"var(--transition-normal)",
        fontFamily:"var(--font-sans)",...style}}>

      <div style={{width:"300px",flexShrink:0,display:"flex",flexDirection:"column",gap:"10px"}}>
        <div style={{height:"230px",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",
          background:"var(--c10-surface-muted)",border:"1px solid var(--c10-border)",borderRadius:"var(--radius-md)"}}>
          {image
            ? <img src={thumbnails[active] || image} alt={title} style={{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}}/>
            : <span style={{color:"#94A3B8",fontStyle:"italic",fontSize:"var(--font-size-xs)"}}>Sin imagen</span>}
        </div>
        {thumbnails.length > 1 ? (
          <div style={{display:"flex",gap:"8px"}}>
            {thumbnails.map((t,i)=>(
              <span key={i} onClick={e=>{e.stopPropagation();setActive(i);}}
                style={{width:"44px",height:"38px",overflow:"hidden",cursor:"pointer",flexShrink:0,
                  borderRadius:"var(--radius-sm)",background:"var(--c10-surface-sunken)",
                  border:(i===active?"2px solid var(--c10-blue)":"1px solid var(--c10-border)")}}>
                <img src={t} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div style={{flex:1,minWidth:0,display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"16px"}}>
          <span style={{minWidth:0}}>
            <span style={{display:"block",fontSize:"var(--font-size-md)",fontWeight:"var(--font-weight-bold)",color:"#0F172A"}}>{title}</span>
            {subtitle ? <span style={{display:"block",marginTop:"2px",fontSize:"var(--font-size-sm)",color:"#64748B"}}>{subtitle}</span> : null}
          </span>
          <span style={{display:"inline-flex",alignItems:"center",gap:"8px",flexShrink:0}}>
            {estatus ? <EstatusBadge estatus={estatus} solid/> : null}
            {perfil ? <Badge tone="purple">{perfil}</Badge> : null}
            {folio ? <Badge tone="process" style={{fontVariantNumeric:"tabular-nums"}}>{folio}</Badge> : null}
          </span>
        </div>

        {fields.length ? (
          <div style={{marginTop:"18px",display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:"20px 24px"}}>
            {fields.map((f,i)=>(
              <span key={i} style={{display:"flex",flexDirection:"column",gap:"4px",minWidth:0}}>
                <span style={{fontSize:"var(--font-size-xs)",textTransform:"uppercase",letterSpacing:"0.05em",color:"#64748B"}}>{f.label}</span>
                <span style={{fontSize:"var(--font-size-sm)",color:"var(--c10-text-primary)",fontVariantNumeric:"tabular-nums"}}>{f.value || "---"}</span>
              </span>
            ))}
          </div>
        ) : null}

        {actions ? (
          <div style={{marginTop:"auto",paddingTop:"18px",display:"flex",alignItems:"center",gap:"6px"}}>{actions}</div>
        ) : null}
      </div>

      {selectable ? (
        <span onClick={e=>{e.stopPropagation();onSelect&&onSelect(!selected);}}
          style={{position:"absolute",top:"16px",right:"16px",width:16,height:16,borderRadius:"var(--radius-sm)",
            border:"1px solid "+(selected?"var(--c10-blue)":"var(--c10-border-strong)"),
            background:selected?"var(--c10-blue)":"var(--c10-surface)",color:"#fff",fontSize:"11px",lineHeight:"14px",
            textAlign:"center",cursor:"pointer"}}>{selected?"✓":""}</span>
      ) : null}
    </div>
  );
}
