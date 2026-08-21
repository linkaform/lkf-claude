import React from "react";

const VARIANTS = {
  primary:{background:"var(--c10-blue)",color:"#fff",border:"1px solid transparent"},
  secondary:{background:"var(--c10-surface)",color:"var(--c10-text-primary)",border:"1px solid var(--c10-border)"},
  ghost:{background:"transparent",color:"var(--c10-text-primary)",border:"1px solid transparent"},
  destructive:{background:"var(--c10-danger)",color:"#fff",border:"1px solid transparent"},
  success:{background:"var(--action-create)",color:"#fff",border:"1px solid transparent"},
  link:{background:"transparent",color:"var(--c10-blue)",border:"1px solid transparent",textDecoration:"none"},
};
const HOVER = {
  primary:"var(--c10-blue-hover)",secondary:"var(--c10-bg-app)",ghost:"var(--c10-blue)",
  destructive:"#B91C1C",success:"#15803D",link:"transparent",
};
const SIZES = {
  sm:{height:"36px",padding:"0 12px"},
  md:{height:"40px",padding:"0 16px"},
  lg:{height:"44px",padding:"0 32px"},
  xl:{height:"48px",padding:"0 16px"},
  icon:{height:"40px",width:"40px",padding:0},
};

export function Button({variant="primary",size="md",disabled=false,fullWidth=false,iconLeft,iconRight,onClick,type="button",style,children}) {
  const [hover,setHover] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const hoverStyle = hover && !disabled
    ? (variant === "ghost"
        ? {background:"var(--c10-blue)",color:"#fff"}
        : variant === "link" ? {textDecoration:"underline"} : {background:HOVER[variant]})
    : null;
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"8px",whiteSpace:"nowrap",
        fontFamily:"var(--font-sans)",fontSize:"var(--font-size-sm)",fontWeight:"var(--font-weight-medium)",
        borderRadius:"var(--radius-md)",cursor:disabled?"not-allowed":"pointer",transition:"var(--transition-fast)",
        opacity:disabled?0.5:1,width:fullWidth?"100%":s.width||"auto",userSelect:"none",...v,...s,...hoverStyle,...style}}>
      {iconLeft}{children}{iconRight}
    </button>
  );
}
