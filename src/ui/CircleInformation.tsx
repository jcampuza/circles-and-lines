import React from "react";
import { Circle, State } from "../lib/getInitialState";
import { isCircleFocused } from "../lib/utils";

interface CircleInformationProps {
  state: State;
  onCircleFocused: (circle: Circle) => void;
}

export const CircleInformation = (props: CircleInformationProps) => {
  const handleClick = (circle: Circle) => (
    e: React.MouseEvent<HTMLLIElement>
  ) => {
    props.onCircleFocused(circle);
    e.stopPropagation();
  };

  return (
    <div className="info-panel" style={{ bottom: 0, right: 0 }}>
      <ul>
        {Object.values(props.state.circles).map(circle => (
          <li
            onClick={handleClick(circle)}
            key={circle.id}
            style={
              isCircleFocused(props.state, circle)
                ? {
                    backgroundColor: "#21cac6"
                  }
                : {}
            }
          >
            <p>x: {circle.x}</p>
            <p>y: {circle.y}</p>
            <p>vx: {circle.velocity.x}</p>
            <p>vy: {circle.velocity.y}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
