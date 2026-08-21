import React from "react";
import { Button } from "../core/Button.jsx";

export function Pagination({page=1,totalPages=1,recordsOnPage=0,totalRecords=0,limit=25,onPageChange,style}) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"16px",width:"100%",
      border:"1px solid var(--c10-border)",borderRadius:"var(--radius-md)",padding:"12px",marginTop:"8px",
      fontFamily:"var(--font-sans)",fontSize:"var(--font-size-sm)",color:"var(--c10-text-secondary)",boxSizing:"border-box",...style}}>
      <div style={{display:"flex",alignItems:"center",gap:"16px"}}>
        <span style={{display:"inline-flex",alignItems:"center",gap:"8px"}}>Registros por página
          <span style={{display:"inline-flex",alignItems:"center",justifyContent:"space-between",width:"100px",height:"40px",
            padding:"0 12px",boxSizing:"border-box",border:"1px solid var(--c10-border)",borderRadius:"var(--radius-md)",
            color:"var(--c10-text-primary)"}}>{limit}<span style={{fontSize:"10px",opacity:.5}}>▼</span></span>
        </span>
        <span>1 - {recordsOnPage} de {totalRecords} registros</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
        <Button variant="primary" disabled={page<=1} onClick={()=>onPageChange&&onPageChange(page-1)}>Anterior</Button>
        <span style={{color:"var(--c10-text-primary)"}}>Página {page} de {totalPages}</span>
        <Button variant="primary" disabled={page>=totalPages} onClick={()=>onPageChange&&onPageChange(page+1)}>Siguiente</Button>
      </div>
    </div>
  );
}
