import React from "react";

export function Separator({orientation="horizontal",style}) {
  return <div style={orientation==="vertical"
    ? {width:1,alignSelf:"stretch",background:"var(--c10-border)",...style}
    : {height:1,width:"100%",background:"var(--c10-border)",...style}} />;
}
