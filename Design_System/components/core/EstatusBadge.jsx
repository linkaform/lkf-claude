import React from "react";

const norm = (s) => (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();

const GREEN={bg:"var(--c10-chip-green-bg)",bd:"var(--c10-chip-green-bd)",fg:"var(--c10-chip-green-fg)"};
const YELLOW={bg:"var(--c10-chip-yellow-bg)",bd:"var(--c10-chip-yellow-bd)",fg:"var(--c10-chip-yellow-fg)"};
const BLUE={bg:"var(--c10-chip-blue-bg)",bd:"var(--c10-chip-blue-bd)",fg:"var(--c10-chip-blue-fg)"};
const PURPLE={bg:"var(--c10-chip-purple-bg)",bd:"var(--c10-chip-purple-bd)",fg:"var(--c10-chip-purple-fg)"};
const RED={bg:"var(--c10-chip-red-bg)",bd:"var(--c10-chip-red-bd)",fg:"var(--c10-chip-red-fg)"};
const SLATE={bg:"var(--c10-chip-slate-bg)",bd:"var(--c10-chip-slate-bd)",fg:"var(--c10-chip-slate-fg)"};
const AMBER={bg:"var(--c10-chip-amber-bg)",bd:"var(--c10-chip-amber-bd)",fg:"var(--c10-chip-amber-fg)"};

const MAP = {
  corriendo:GREEN, realizado:GREEN, entregado:GREEN, devuelto:GREEN, entrada:GREEN,
  pausado:YELLOW, guardado:YELLOW,
  "en proceso":BLUE,
  programado:PURPLE,
  abierto:RED, pendiente:RED, salida:RED,
  eliminado:SLATE, cerrado:SLATE,
  parcial:AMBER,
};

export function EstatusBadge({estatus,solid=false,style}) {
  const key = norm(estatus);
  let c = SLATE;
  if (key.includes("sin incidencias")) c = GREEN;
  else if (key.includes("incidencia")) c = RED;
  else c = MAP[key] || SLATE;
  return (
    <span style={{display:"inline-flex",alignItems:"center",padding:"2px 10px",borderRadius:"var(--radius-full)",
      fontFamily:"var(--font-sans)",fontSize:"var(--font-size-xs)",fontWeight:"var(--font-weight-semibold)",
      whiteSpace:"nowrap",lineHeight:1.5,
      background:solid?c.fg:c.bg,color:solid?"#fff":c.fg,border:"1px solid "+(solid?c.fg:c.bd),...style}}>
      {(estatus||"—").replace(/_/g," ")}
    </span>
  );
}
