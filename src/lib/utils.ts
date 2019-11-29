import { State, Circle, Line } from "./getInitialState";

const random = (start: number, end: number) => {
  const range = end - start;

  return Math.random() * range + start;
};

let id = 10;
export const addCircle = (state: State, position: { x: number; y: number }) => {
  const circle = {
    id,
    x: position.x,
    y: position.y,
    velocity: {
      x: random(-5, 5),
      y: random(-5, 5)
    }
  };

  state.circles[id] = circle;

  for (const circle of Object.values(state.circles)) {
    const lineId = Math.random() * 12400;
    state.lines[lineId] = { id: lineId, from: circle.id, to: id };
  }

  id += 1;

  return state;
};

/**
 * Remove current focus
 * Remove the circle matching the focus id
 * Remove all lines that pointed to or from this focus
 */
export const removeCircle = (state: State, focusId: number | null) => {
  if (!focusId) {
    return state;
  }

  state.ui.focus = null;

  delete state.circles[focusId];

  for (const line of Object.values(state.lines)) {
    if (line.from === focusId || line.to === focusId) {
      delete state.lines[line.id];
    }
  }

  return state;
};

export const isCircleFocused = (state: State, circle: Circle) => {
  const id = circle.id;

  return state.ui.focus === id;
};

export const setCircleFocus = (state: State, circle: Circle) => {
  state.ui.focus = circle.id;
};

export const isLineFocused = (state: State, line: Line) => {
  const focus = state.ui.focus;

  return line.from === focus || line.to === focus;
};

export const groupCirclesByFocus = (state: State) => {
  const circles = Object.values(state.circles);

  return circles.sort((a, b) => {
    const aFocused = isCircleFocused(state, a);
    const bFocused = isCircleFocused(state, b);

    if (aFocused && !bFocused) return 1;
    if (bFocused && !aFocused) return -1;
    return 0;
  });
};

export const groupLinesByFocus = (state: State) => {
  const lines = Object.values(state.lines);

  return lines.sort((a, b) => {
    const aFocused = isLineFocused(state, a);
    const bFocused = isLineFocused(state, b);

    if (aFocused && !bFocused) return 1;
    if (bFocused && !aFocused) return -1;
    return 0;
  });
};

const findNextFocus = (state: State, rankedCircles: Circle[]) => {
  if (!rankedCircles.length) {
    return null;
  }

  if (!state.ui.focus) {
    return rankedCircles[0];
  }

  const currentFocus = state.circles[state.ui.focus];

  if (!currentFocus) {
    return rankedCircles[0];
  }

  const currentFocusIndex = rankedCircles.findIndex(circle => {
    return circle.id === currentFocus.id;
  });

  const nextFocus = rankedCircles[currentFocusIndex + 1];

  return nextFocus || rankedCircles[0];
};

export const focusNearestUp = (state: State) => {
  const ranked = Object.values(state.circles).sort((a, b) => b.y - a.y);
  const nextFocus = findNextFocus(state, ranked);

  state.ui.focus = nextFocus ? nextFocus.id : null;

  return state;
};

export const focusNearestDown = (state: State) => {
  const ranked = Object.values(state.circles).sort((a, b) => a.y - b.y);
  const nextFocus = findNextFocus(state, ranked);

  state.ui.focus = nextFocus ? nextFocus.id : null;

  return state;
};

export const focusNearestLeft = (state: State) => {
  const ranked = Object.values(state.circles).sort((a, b) => b.x - a.x);
  const nextFocus = findNextFocus(state, ranked);

  state.ui.focus = nextFocus ? nextFocus.id : null;

  return state;
};

export const focusNearestRight = (state: State) => {
  const ranked = Object.values(state.circles).sort((a, b) => a.x - b.x);
  const nextFocus = findNextFocus(state, ranked);

  state.ui.focus = nextFocus ? nextFocus.id : null;

  return state;
};
