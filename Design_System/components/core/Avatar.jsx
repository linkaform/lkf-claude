import React from "react";

export function Avatar({src,name="",size=40,ring=false,style}) {
  const initials = (name||"").split(" ").filter(Boolean).map(w=>w[0]).join("").slice(0,2).toUpperCase();
  return (
    <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:size,height:size,
      borderRadius:"var(--radius-full)",overflow:"hidden",flexShrink:0,background:"var(--c10-surface-sunken)",
      color:"var(--c10-text-secondary)",fontFamily:"var(--font-sans)",fontSize:Math.round(size*0.35),
      fontWeight:"var(--font-weight-semibold)",
      boxShadow:ring?"var(--shadow-avatar)":"none",...style}}>
      {src ? <img src={src} alt={name} style={{width:"100%",height:"100%",objectFit:"cover"}}/> : (initials || null)}
    </span>
  );
}
