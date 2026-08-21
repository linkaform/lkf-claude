import React from "react";

export function Input({value,defaultValue,placeholder,type="text",disabled=false,invalid=false,iconLeft,size="md",onChange,style}) {
  const [focus,setFocus] = React.useState(false);
  const h = size==="lg" ? "48px" : size==="sm" ? "36px" : "40px";
  return (
    <div style={{position:"relative",width:"100%"}}>
      {iconLeft ? <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",display:"flex",color:"var(--c10-text-muted)"}}>{iconLeft}</span> : null}
      <input type={type} value={value} defaultValue={defaultValue} placeholder={placeholder} disabled={disabled} onChange={onChange}
        onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
        style={{width:"100%",height:h,boxSizing:"border-box",padding:iconLeft?"0 8px 0 32px":"0 8px",
          fontFamily:"var(--font-sans)",fontSize:"var(--font-size-sm)",color:"#475569",
          background:"var(--c10-surface)",borderRadius:"var(--radius-md)",outline:"none",
          border:"1px solid "+(invalid?"var(--c10-danger)":focus?"var(--c10-blue)":"var(--c10-border)"),
          boxShadow:focus?"var(--ring-focus)":"none",opacity:disabled?0.5:1,
          cursor:disabled?"not-allowed":"text",transition:"var(--transition-fast)",...style}} />
    </div>
  );
}
