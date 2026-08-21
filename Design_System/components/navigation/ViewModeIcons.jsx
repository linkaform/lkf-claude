import React from "react";

const Icon = ({children}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

/** Los tres modos de visualización estándar de una sección, en orden. */
export function ViewModeIcons() { return null; }

export const VIEW_MODES = [
  {value:"cards",label:"Tarjetas",icon:(
    <Icon><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></Icon>)},
  {value:"list",label:"Tarjetas en lista",icon:(
    <Icon><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7M14 9h7M14 15h7M14 20h7"/></Icon>)},
  {value:"table",label:"Tabla",icon:(
    <Icon><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></Icon>)},
];
