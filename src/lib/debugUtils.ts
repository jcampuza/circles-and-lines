import { State } from "./getInitialState";

export const debugStep = (state: State, dt: number) => {
  const timestamps = state.debug.frameTimestampList;
  timestamps.push(dt);
  state.debug.frameTimestampList = timestamps.slice(-10);

  return state;
};

export const getCurrentFps = (state: State) => {
  const { frameTimestampList } = state.debug;

  return (
    frameTimestampList
      .map(el => (1 / el) * 1000)
      .reduce((acc, value) => acc + value, 0) / frameTimestampList.length
  ).toFixed(4);
};

export const getLineCount = (lines: State["lines"]) =>
  Object.keys(lines).length;

export const getCircleCount = (circles: State["circles"]) =>
  Object.keys(circles).length;
