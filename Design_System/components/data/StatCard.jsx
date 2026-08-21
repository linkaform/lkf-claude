import React from "react";

/* Guard-console KPI tile: big numeral, icon, two-tone rule, label. */
export function StatCard({label,value=0,icon,selected=false,selectable=false,onClick,style}) {
  const [hover,setHover] = React.useState(false);
  return (
    <div onClick={selectable?onClick:undefined} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{width:"224px",padding:"16px",borderRadius:"var(--radius-lg)",boxShadow:"var(--shadow-md)",
        border:"1px solid "+(selected?"var(--c10-blue-select)":"var(--c10-border)"),
        background:selected?"#DBEAFE":hover&&selectable?"#F3F4F6":"var(--c10-surface)",
        cursor:selectable?"pointer":"default",transition:"var(--transition-fast)",
        fontFamily:"var(--font-sans)",color:"var(--c10-text-primary)",...style}}>
      <div style={{display:"flex",gap:"24px",alignItems:"center"}}>
        <span style={{display:"flex",width:40,height:40,alignItems:"center",justifyContent:"center",
          color:selected?"var(--c10-navy)":"var(--c10-blue)"}}>{icon}</span>
        <span style={{fontWeight:"var(--font-weight-bold)",fontSize:"var(--font-size-2xl)",lineHeight:1}}>{value}</span>
      </div>
      <div style={{display:"flex",marginTop:"12px"}}>
        <span style={{height:4,width:"50%",background:"#CFFAFE"}}/>
        <span style={{height:4,width:"50%",background:"var(--c10-blue)"}}/>
      </div>
      <div style={{marginTop:"8px",fontSize:"var(--font-size-base)"}}>{label}</div>
    </div>
  );
}
