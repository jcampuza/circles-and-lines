import React, { memo } from "react";
import { Line, State, Circle } from "../lib/getInitialState";

interface LineSVG {
  line: Line;
  state: State;
  isFocused?: boolean;
}

const getLineCoordinates = (line: Line, circles: Record<number, Circle>) => {
  const fromCircle = circles[line.from];
  const toCircle = circles[line.to];
  const x1 = fromCircle.x;
  const y1 = fromCircle.y;
  const x2 = toCircle.x;
  const y2 = toCircle.y;

  return { x1, y1, x2, y2 };
};

export const LineSVG = memo(({ line, state, isFocused }: LineSVG) => {
  const { x1, y1, x2, y2 } = getLineCoordinates(line, state.circles);

  return (
    <path
      d={`M ${x1} ${y1} L ${x2} ${y2}`}
      stroke={isFocused ? "#21cac6" : "green"}
      strokeWidth={2}
      strokeDasharray={isFocused ? "4" : ""}
    />
  );
});
