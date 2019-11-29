import { State, WindowDimensions } from "./getInitialState";

export const windowResizeHandler = (
  state: State,
  dimensions: WindowDimensions
) => {
  state.window = dimensions;

  // Adjust current circles that are now outside the dimensions
  for (const circle of Object.values(state.circles)) {
    if (circle.x > state.window.width) {
      circle.x = state.window.width;
    }

    if (circle.y > state.window.height) {
      circle.y = state.window.height;
    }
  }

  return state;
};
