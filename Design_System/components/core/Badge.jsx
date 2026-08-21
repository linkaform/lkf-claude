import React from "react";

const TONES = {
  brand:{background:"var(--c10-blue)",color:"#fff",border:"1px solid transparent"},
  navy:{background:"var(--c10-navy)",color:"#fff",border:"1px solid transparent"},
  neutral:{background:"var(--c10-surface-sunken)",color:"var(--c10-text-secondary)",border:"1px solid transparent"},
  outline:{background:"transparent",color:"var(--c10-text-primary)",border:"1px solid var(--c10-border)"},
  success:{background:"var(--c10-success-bg)",color:"var(--c10-success-text)",border:"1px solid transparent"},
  warning:{background:"var(--c10-warning-bg)",color:"var(--c10-warning-text)",border:"1px solid transparent"},
  process:{background:"var(--c10-process-bg)",color:"var(--c10-process-text)",border:"1px solid transparent"},
  purple:{background:"var(--c10-purple-bg)",color:"var(--c10-purple-text)",border:"1px solid transparent"},
  magenta:{background:"var(--c10-magenta-bg)",color:"var(--c10-magenta-text)",border:"1px solid transparent"},
  danger:{background:"var(--c10-danger-bg)",color:"var(--c10-danger-text)",border:"1px solid transparent"},
};

export function Badge({tone="brand",shape="pill",style,children}) {
  return (
    <span style={{display:"inline-flex",alignItems:"center",padding:"2px 10px",
      fontFamily:"var(--font-sans)",fontSize:"var(--font-size-xs)",fontWeight:"var(--font-weight-semibold)",
      lineHeight:1.5,whiteSpace:"nowrap",
      borderRadius:shape==="pill"?"var(--radius-full)":"var(--radius-sm)",...(TONES[tone]||TONES.brand),...style}}>
      {children}
    </span>
  );
}
