import React from "react";

export function Select({value,defaultValue,options=[],placeholder="Seleccionar",disabled=false,onChange,style}) {
  const [focus,setFocus] = React.useState(false);
  return (
    <div style={{position:"relative",width:"100%"}}>
      <select value={value} defaultValue={defaultValue} disabled={disabled}
        onChange={onChange} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
        style={{width:"100%",height:"40px",boxSizing:"border-box",padding:"0 32px 0 8px",appearance:"none",
          fontFamily:"var(--font-sans)",fontSize:"var(--font-size-sm)",color:"#475569",
          background:"var(--c10-surface)",borderRadius:"var(--radius-md)",outline:"none",
          border:"1px solid "+(focus?"var(--c10-blue)":"var(--c10-border)"),boxShadow:focus?"var(--ring-focus)":"none",
          opacity:disabled?0.5:1,cursor:disabled?"not-allowed":"pointer",transition:"var(--transition-fast)",...style}}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map(o=>{const v=typeof o==="string"?o:o.value;const l=typeof o==="string"?o:o.label;
          return <option key={v} value={v}>{l}</option>;})}
      </select>
      <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",
        color:"var(--c10-text-muted)",fontSize:"10px"}}>▼</span>
    </div>
  );
}
