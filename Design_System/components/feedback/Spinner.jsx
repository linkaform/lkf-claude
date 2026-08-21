import React from "react";

export function Spinner({size=96,thickness=8,style}) {
  return (
    <span style={{display:"inline-block",width:size,height:size,borderRadius:"var(--radius-full)",
      border:thickness+"px solid #D1D5DB",borderTopColor:"var(--c10-blue)",
      animation:"c10-spin 1s linear infinite",...style}}>
      <style>{"@keyframes c10-spin{to{transform:rotate(360deg)}}"}</style>
    </span>
  );
}
