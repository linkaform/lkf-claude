import React from "react";
import { SegmentedControl } from "./SegmentedControl.jsx";

const Search = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

/**
 * Header secundario de sección: título + KPI de registros a la izquierda;
 * buscador, acción verde, subnavegación y modo de visualización a la derecha.
 */
export function SectionHeader({title,totalRecords,recordsLabel="registros",searchPlaceholder="Buscar...",onSearch,
  actionLabel,onAction,subTabs,subTab,onSubTabChange,viewModes,viewMode,onViewModeChange,children,style}) {
  const [focus,setFocus] = React.useState(false);
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",
      width:"100%",boxSizing:"border-box",padding:"20px",fontFamily:"var(--font-sans)",...style}}>
      <div style={{display:"flex",alignItems:"baseline",gap:"10px",minWidth:"fit-content"}}>
        <h1 style={{margin:0,fontSize:"var(--font-size-lg)",fontWeight:"var(--font-weight-semibold)",
          letterSpacing:"var(--tracking-tight)",color:"#0F172A",whiteSpace:"nowrap"}}>{title}</h1>
        {totalRecords !== undefined ? (
          <span style={{display:"inline-flex",alignItems:"center",gap:"4px",padding:"2px 8px",
            fontFamily:"var(--font-sans)",fontSize:"var(--font-size-sm)",fontWeight:"var(--font-weight-medium)",
            lineHeight:1.45,whiteSpace:"nowrap",fontVariantNumeric:"tabular-nums",color:"#64748B"}}>{totalRecords} {recordsLabel}</span>
        ) : null}
      </div>

      <div style={{display:"flex",alignItems:"center",gap:"16px",flexWrap:"wrap",justifyContent:"flex-end"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",width:"236px",height:"40px",boxSizing:"border-box",
          padding:"0 8px",borderRadius:"var(--radius-md)",background:"var(--c10-surface)",transition:"var(--transition-fast)",
          border:"1px solid "+(focus?"var(--c10-blue)":"#E2E8F0"),boxShadow:focus?"var(--ring-focus)":"none"}}>
          <span style={{display:"flex",color:"#94A3B8"}}><Search/></span>
          <input placeholder={searchPlaceholder} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
            onChange={e=>onSearch&&onSearch(e.target.value)}
            style={{width:"100%",border:"none",outline:"none",background:"transparent",fontFamily:"var(--font-sans)",
              fontSize:"var(--font-size-sm)",color:"#475569"}}/>
        </div>

        {actionLabel ? (
          <button onClick={onAction}
            style={{display:"inline-flex",alignItems:"center",gap:"8px",height:"40px",padding:"0 16px",border:"none",
              borderRadius:"var(--radius-md)",background:"#16A34A",color:"#fff",cursor:"pointer",whiteSpace:"nowrap",
              fontFamily:"var(--font-sans)",fontSize:"var(--font-size-sm)",fontWeight:"var(--font-weight-medium)",
              transition:"var(--transition-fast)"}}>
            <span style={{fontSize:"var(--font-size-lg)",fontWeight:"var(--font-weight-medium)",lineHeight:1,marginTop:"-1px"}}>+</span>{actionLabel}
          </button>
        ) : null}

        {subTabs && subTabs.length ? (
          <SegmentedControl value={subTab} options={subTabs} onChange={onSubTabChange}/>
        ) : null}

        {viewModes && viewModes.length ? (
          <SegmentedControl value={viewMode} options={viewModes} onChange={onViewModeChange} iconOnly/>
        ) : null}

        {children}
      </div>
    </div>
  );
}
