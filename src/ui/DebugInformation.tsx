import React from "react";
import { useMemo } from "react";
import { getLineCount, getCircleCount, getCurrentFps } from "../lib/debugUtils";
import { State } from "../lib/getInitialState";
import { Panel } from "./Panel";

export const DebugInformation = ({ state }: { state: State }) => {
  const lineCount = useMemo(() => getLineCount(state.lines), [state.lines]);

  const circleCount = useMemo(() => getCircleCount(state.circles), [
    state.circles
  ]);

  const fps = getCurrentFps(state);

  return (
    <Panel
      style={{
        top: 0,
        right: 0
      }}
    >
      <ul>
        <li>FPS: {fps}</li>
        <li>Line Count: {lineCount}</li>
        <li>Circle Count: {circleCount}</li>
      </ul>
    </Panel>
  );
};
