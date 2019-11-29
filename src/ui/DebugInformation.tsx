import React from "react";
import { useMemo } from "react";
import { getLineCount, getCircleCount, getCurrentFps } from "../lib/debugUtils";
import { State } from "../lib/getInitialState";

export const DebugInformation = ({ state }: { state: State }) => {
  const lineCount = useMemo(() => getLineCount(state.lines), [state.lines]);

  const circleCount = useMemo(() => getCircleCount(state.circles), [
    state.circles
  ]);

  return (
    <div
      className="info-panel"
      style={{
        top: 0,
        right: 0
      }}
    >
      <ul>
        <li>Elapsed: {getCurrentFps(state)}</li>
        <li>Line Count: {lineCount}</li>
        <li>Circle Count: {circleCount}</li>
      </ul>
    </div>
  );
};
