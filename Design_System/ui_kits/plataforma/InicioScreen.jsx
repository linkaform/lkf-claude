const MODULES = [
  {id:"pases",label:"Pases de entrada"},{id:"turnos",label:"Turnos"},{id:"accesos",label:"Accesos"},
  {id:"bitacoras",label:"Bitácoras"},{id:"incidencias",label:"Incidencias"},{id:"rondines",label:"Rondines"},
  {id:"articulos",label:"Artículos"},{id:"reportes",label:"Reportes"},{id:"inspecciones",label:"Inspecciones"},
];

function ModuleTile({ id, label, onClick }) {
  const [h,setH] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{width:256,height:160,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
        gap:8,padding:16,boxSizing:"border-box",borderRadius:"var(--radius-lg)",cursor:"pointer",
        background:h?"#E5E7EB":"#F3F4F6",boxShadow:h?"0 4px 4px rgba(0,0,0,.2)":"var(--shadow-md)",
        transform:h?"scale(1.05)":"scale(1)",transition:"var(--transition-normal)"}}>
      <img src={"../../assets/icons/"+id+".svg"} alt={label} style={{height:48,opacity:h?.75:1}} />
      <p style={{margin:"8px 0 0",fontSize:"var(--font-size-md)"}}>{label}</p>
    </div>
  );
}

function InicioScreen({ onOpen }) {
  return (
    <div style={{display:"flex",justifyContent:"center",padding:"32px 16px"}}>
      <div style={{display:"flex",flexWrap:"wrap",gap:20,justifyContent:"center",maxWidth:860}}>
        {MODULES.map(m => <ModuleTile key={m.id} {...m} onClick={()=>onOpen&&onOpen(m.id)} />)}
      </div>
    </div>
  );
}
Object.assign(window, { InicioScreen });
