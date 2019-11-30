import React from "react";

interface PanelProps {
  style: React.CSSProperties;
  children: React.ReactNode;
}

export const Panel = (props: PanelProps) => {
  return (
    <div
      className="info-panel"
      style={props.style}
      onClick={e => e.stopPropagation()}
    >
      {props.children}
    </div>
  );
};
