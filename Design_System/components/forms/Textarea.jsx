import React from "react";

export function Textarea({value,defaultValue,placeholder,rows=4,disabled=false,onChange,style}) {
  const [focus,setFocus] = React.useState(false);
  return (
    <textarea value={value} defaultValue={defaultValue} placeholder={placeholder} rows={rows} disabled={disabled} onChange={onChange}
      onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
      style={{width:"100%",boxSizing:"border-box",minHeight:"80px",padding:"10px 8px",resize:"vertical",
        fontFamily:"var(--font-sans)",fontSize:"var(--font-size-sm)",lineHeight:"var(--line-height-normal)",
        color:"var(--c10-text-primary)",background:"var(--c10-surface)",borderRadius:"var(--radius-md)",outline:"none",
        border:"1px solid "+(focus?"var(--c10-blue)":"var(--c10-border)"),boxShadow:focus?"var(--ring-focus)":"none",
        opacity:disabled?0.5:1,transition:"var(--transition-fast)",...style}} />
  );
}
