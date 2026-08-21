import React from "react";

export function Field({label,hint,error,required=false,htmlFor,style,children}) {
  return (
    <div style={{marginBottom:"20px",fontFamily:"var(--font-sans)",...style}}>
      {label ? (
        <label htmlFor={htmlFor} style={{display:"block",marginBottom:"6px",fontSize:"var(--font-size-sm)",
          fontWeight:"var(--font-weight-medium)",color:"var(--c10-text-secondary)"}}>
          {label}{required ? <span style={{color:"var(--c10-danger)"}}> *</span> : null}
        </label>
      ) : null}
      {children}
      {error ? <div style={{marginTop:"6px",fontSize:"var(--font-size-xs)",color:"var(--c10-danger)"}}>{error}</div>
             : hint ? <div style={{marginTop:"6px",fontSize:"var(--font-size-xs)",color:"var(--c10-text-muted)"}}>{hint}</div> : null}
    </div>
  );
}
