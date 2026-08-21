import React from "react";
import { Avatar } from "../core/Avatar.jsx";

/* Lucide path data — lucide-react is the product's icon set. */
const Svg = ({children,size=18,strokeWidth=2,style}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,...style}}>{children}</svg>
);
const Building = (p) => <Svg {...p}><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></Svg>;
const Chevron = ({open,...p}) => <Svg {...p} size={16}><path d={open?"m18 15-6-6-6 6":"m6 9 6 6 6-6"}/></Svg>;
const Bell = (p) => <Svg {...p} size={20}><path d="M10.268 21a2 2 0 0 0 3.464 0M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></Svg>;

/**
 * Barra principal de todas las pantallas autenticadas.
 * Izquierda: logo + selector de ubicación. Derecha: mega menú, notificaciones y avatar.
 */
export function AppHeader({logoSrc,logoAlt="Clave 10",location="Seleccionar ubicación",items=[],activeItem,
  notificationCount=0,user,onSelect,onLocationClick,onNotificationsClick,style}) {
  const [open,setOpen] = React.useState(null);
  const norm = items.map(it => typeof it === "string" ? {label:it} : it);
  const current = norm.find(it => it.label === open);
  return (
    <header onMouseLeave={()=>setOpen(null)}
      style={{position:"sticky",top:0,zIndex:50,width:"100%",boxSizing:"border-box",background:"var(--c10-surface)",
        borderBottom:"1px solid var(--c10-border)",boxShadow:"var(--shadow-sm)",padding:"10px 24px",
        fontFamily:"var(--font-sans)",...style}}>
      <div style={{display:"flex",alignItems:"center",gap:"24px"}}>
        {logoSrc
          ? <img src={logoSrc} alt={logoAlt} style={{height:"30px",width:"auto",objectFit:"contain",flexShrink:0}}/>
          : <span style={{fontSize:"var(--font-size-lg)",fontWeight:"var(--font-weight-bold)",letterSpacing:"var(--tracking-tight)",color:"var(--c10-navy)",flexShrink:0}}>CLAVE 10</span>}

        <button onClick={onLocationClick}
          style={{display:"inline-flex",alignItems:"center",gap:"8px",height:"36px",padding:"0 12px",border:"none",
            background:"transparent",borderRadius:"var(--radius-md)",cursor:"pointer",flexShrink:0,
            fontFamily:"var(--font-sans)",fontSize:"var(--font-size-sm)",fontWeight:"var(--font-weight-normal)",
            color:"#171717"}}>
          <Building size={18} style={{color:"var(--c10-text-secondary)"}}/>{location}
          <Chevron style={{color:"var(--c10-text-secondary)"}}/>
        </button>

        <nav style={{display:"flex",alignItems:"center",gap:"2px",marginLeft:"auto"}}>
          {norm.map(it=>{
            const isOpen = open === it.label;
            const active = it.label === activeItem;
            return (
              <button key={it.label} onMouseEnter={()=>setOpen(it.sections?it.label:null)}
                onClick={()=>{onSelect&&onSelect(it.label);setOpen(it.sections&&!isOpen?it.label:null);}}
                style={{display:"inline-flex",alignItems:"center",gap:"6px",height:"36px",padding:"0 12px",border:"none",
                  borderRadius:"var(--radius-md)",cursor:"pointer",whiteSpace:"nowrap",transition:"var(--transition-fast)",
                  fontFamily:"var(--font-sans)",fontSize:"var(--font-size-sm)",
                  fontWeight:active||isOpen?"var(--font-weight-medium)":"var(--font-weight-normal)",
                  background:isOpen?"var(--c10-surface-sunken)":"transparent",
                  color:active?"var(--c10-blue)":"#171717"}}>
                {it.label}{it.sections ? <Chevron open={isOpen} style={{color:"var(--c10-text-secondary)"}}/> : null}
              </button>
            );
          })}
        </nav>

        <button onClick={onNotificationsClick} aria-label="Notificaciones"
          style={{position:"relative",width:36,height:36,display:"inline-flex",alignItems:"center",justifyContent:"center",
            border:"none",background:"transparent",borderRadius:"var(--radius-full)",cursor:"pointer",flexShrink:0,
            color:"var(--c10-text-secondary)"}}>
          <Bell/>
          {notificationCount > 0 ? (
            <span style={{position:"absolute",top:4,right:4,minWidth:16,height:16,padding:"0 4px",boxSizing:"border-box",
              display:"inline-flex",alignItems:"center",justifyContent:"center",borderRadius:"var(--radius-full)",
              background:"var(--c10-danger)",color:"#fff",fontSize:"10px",fontWeight:"var(--font-weight-bold)",
              lineHeight:1,border:"2px solid var(--c10-surface)"}}>{notificationCount > 9 ? "9+" : notificationCount}</span>
          ) : null}
        </button>

        <Avatar src={user&&user.avatar} name={user&&user.name} size={40}
          style={{flexShrink:0,boxShadow:"0 0 0 2px var(--c10-border)",background:"#CFE2FF"}}/>
      </div>

      {current && current.sections ? (
        <div style={{position:"absolute",left:0,right:0,top:"100%",display:"flex",justifyContent:"center",pointerEvents:"none"}}>
          <div style={{pointerEvents:"auto",display:"flex",gap:"48px",padding:"24px 32px",background:"var(--c10-surface)",
            border:"1px solid var(--c10-border)",borderTop:"none",borderRadius:"0 0 var(--radius-md) var(--radius-md)",
            boxShadow:"var(--shadow-lg)",minWidth:"440px"}}>
            {current.sections.map(sec=>(
              <div key={sec.title} style={{display:"flex",flexDirection:"column",gap:"14px",minWidth:"180px"}}>
                <span style={{fontSize:"var(--font-size-base)",fontWeight:"var(--font-weight-bold)",color:"var(--c10-text-primary)"}}>{sec.title}</span>
                {sec.links.map(l=>(
                  <a key={l} href="#" onClick={e=>{e.preventDefault();onSelect&&onSelect(l);setOpen(null);}}
                    style={{fontSize:"var(--font-size-base)",color:"var(--c10-text-primary)",textDecoration:"none"}}>{l}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
