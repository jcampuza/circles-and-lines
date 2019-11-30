import React from "react";
import { memo } from "react";

interface CircleSVGProps {
  x: number;
  y: number;
  isFocused: boolean;
}

export const CircleSVG = memo(({ x, y, isFocused }: CircleSVGProps) => (
  <circle
    r="10"
    cx={x}
    cy={y}
    fill={isFocused ? "#21cac6" : "green"}
    stroke={isFocused ? "black" : "none"}
    strokeWidth={isFocused ? 2 : 0}
    style={{
      touchAction: "none"
    }}
  />
));
