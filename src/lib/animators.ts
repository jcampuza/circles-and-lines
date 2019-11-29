import { State } from "./getInitialState";

export const linearStep = (state: State, dt: number) => {
  const { width, height } = state.window;
  const { circles } = state;

  for (const circle of Object.values(circles)) {
    if (circle.x < 0) {
      circle.velocity.x *= -1;
      circle.x = 0;
    }

    if (circle.x > width) {
      circle.velocity.x *= -1;
      circle.x = width;
    }

    if (circle.y < 0) {
      circle.velocity.y *= -1;
      circle.y = 0;
    }

    if (circle.y > height) {
      circle.velocity.y *= -1;
      circle.y = height;
    }

    circle.x += (circle.velocity.x * dt) / 4;
    circle.y += (circle.velocity.y * dt) / 4;
  }

  return state;
};
