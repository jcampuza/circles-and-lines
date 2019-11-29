export interface VelocityVector {
  x: number;
  y: number;
}

export interface Circle {
  id: number;
  x: number;
  y: number;
  velocity: VelocityVector;
}

export interface Line {
  id: number;
  from: number;
  to: number;
}

export interface WindowDimensions {
  height: number;
  width: number;
}

export interface DebugState {
  frameTimestampList: number[];
}

export interface UIState {
  focus: null | number;
}

export interface State {
  circles: Record<number, Circle>;
  lines: Record<number, Line>;
  window: WindowDimensions;
  debug: DebugState;
  ui: UIState;
}

export const getInitialState = (): State => ({
  window: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  ui: {
    focus: null
  },
  circles: {},
  lines: {},
  debug: {
    frameTimestampList: []
  }
});
