import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { useImmerState } from "./lib/useImmerState";
import { getInitialState } from "./lib/getInitialState";
import { linearStep } from "./lib/animators";
import {
  addCircle,
  isCircleFocused,
  setCircleFocus,
  isLineFocused,
  groupLinesByFocus,
  groupCirclesByFocus,
  removeCircle,
  focusNearestUp,
  focusNearestDown,
  focusNearestLeft,
  focusNearestRight
} from "./lib/utils";
import { windowResizeHandler } from "./lib/resize";
import { CircleSVG } from "./ui/CircleSVG";
import { LineSVG } from "./ui/LineSVG";
import { DraggableSVG } from "./ui/DraggableSVG";
import { DebugInformation } from "./ui/DebugInformation";
import { HeadsUpMessage } from "./ui/HeadsUpMessage";
import { debugStep } from "./lib/debugUtils";

import "./App.css";
import { CircleInformation } from "./ui/CircleInformation";
import { useKeyboardShortcuts } from "./lib/useKeyboardShortcut";
import { useResize } from "./lib/useResize";

const App = () => {
  const [state, setState] = useImmerState(getInitialState());
  const [paused, setPaused] = useImmerState(false);
  const [debugEnabled, setDebugEnabled] = useImmerState(true);

  const handleDrag = useCallback(
    circle => ({ x, y }: { x: number; y: number }) => {
      setState(draft => {
        draft.circles[circle.id].x = x;
        draft.circles[circle.id].y = y;
      });
    },
    [setState]
  );

  useResize(dimensions => {
    setState(state => windowResizeHandler(state, dimensions));
  });

  useKeyboardShortcuts({
    // Pause
    KeyP: () => setPaused(prev => !prev),
    // Reset
    KeyR: () => setState(() => getInitialState()),
    // Delete Focused Circle
    KeyD: () => setState(state => removeCircle(state, state.ui.focus)),
    KeyI: () => setDebugEnabled(state => !state),
    // Focus next circle up
    ArrowUp: () => setState(state => focusNearestUp(state)),
    ArrowDown: () => setState(state => focusNearestDown(state)),
    ArrowLeft: () => setState(state => focusNearestLeft(state)),
    ArrowRight: () => setState(state => focusNearestRight(state)),
    Space: () => setState(state => addCircle(state, { x: 0, y: 0 }))
  });

  useEffect(() => {
    if (paused) {
      return;
    }

    let timer: number;
    let start: number | null = null;

    const step = (time: number) => {
      if (!start) {
        start = time;
      }
      setState(state => linearStep(state, time - start!));
      setState(state => debugStep(state, time - start!));

      timer = requestAnimationFrame(step);
      start = time;
    };

    timer = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(timer);
    };
  }, [setState, paused]);

  return (
    <div
      className="App"
      onClick={e => {
        const { clientX, clientY } = e;
        setState(state => addCircle(state, { x: clientX, y: clientY }));
      }}
    >
      <svg width="100%" height="100%">
        {groupLinesByFocus(state).map(line => (
          <LineSVG
            line={line}
            state={state}
            isFocused={isLineFocused(state, line)}
            key={line.id}
          />
        ))}
        {groupCirclesByFocus(state).map(circle => (
          <DraggableSVG onDrag={handleDrag(circle)} key={circle.id}>
            <CircleSVG
              x={circle.x}
              y={circle.y}
              isFocused={isCircleFocused(state, circle)}
            />
          </DraggableSVG>
        ))}
      </svg>

      {debugEnabled ? (
        <>
          <DebugInformation state={state} />
          <CircleInformation
            state={state}
            onCircleFocused={circle =>
              setState(state => setCircleFocus(state, circle))
            }
          />
        </>
      ) : null}
      <HeadsUpMessage />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
