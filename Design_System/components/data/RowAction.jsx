import React from "react";

/**
 * Acción de fila: botón cuadrado de solo icono con fondo gris; al hover pasa al
 * azul claro del encabezado de la tabla con el icono en azul y muestra el tooltip.
 */
export function RowAction({label,icon,shape="square",tone="default",disabled=false,onClick,size=32,style}) {
  const [hover,setHover] = React.useState(false);
  const on = hover && !disabled;
  return (
    <span style={{position:"relative",display:"inline-flex"}}
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      <button onClick={onClick} disabled={disabled} aria-label={label}
        style={{width:size,height:size,display:"inline-flex",alignItems:"center",justifyContent:"center",padding:0,
          border:shape==="circle"?"1px solid "+(on?"#BFDBFE":"var(--c10-border)"):"none",
          borderRadius:shape==="square"?"var(--radius-md)":"var(--radius-full)",
          cursor:disabled?"not-allowed":"pointer",transition:"var(--transition-fast)",opacity:disabled?0.35:1,
          background:shape==="plain"?"transparent":on?"#DBEAFE":shape==="circle"?"var(--c10-surface)":"var(--c10-surface-sunken)",
          color:tone==="accent"?"#F97316":on?"var(--c10-blue)":"var(--c10-text-secondary)",...style}}>
        {icon}
      </button>
      {on && label ? (
        <span style={{position:"absolute",top:"calc(100% + 6px)",left:"50%",transform:"translateX(-50%)",zIndex:30,
          padding:"6px 10px",whiteSpace:"nowrap",pointerEvents:"none",background:"var(--c10-surface)",
          border:"1px solid var(--c10-border)",borderRadius:"var(--radius-md)",boxShadow:"var(--shadow-lg)",
          fontFamily:"var(--font-sans)",fontSize:"var(--font-size-xs)",color:"var(--c10-text-primary)"}}>{label}</span>
      ) : null}
    </span>
  );
}

export function RowActions({children,style}) {
  return <span style={{display:"inline-flex",alignItems:"center",gap:"6px",...style}}>{children}</span>;
}
