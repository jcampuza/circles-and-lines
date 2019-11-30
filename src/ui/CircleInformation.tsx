import React from "react";
import { Circle, State } from "../lib/getInitialState";
import { isCircleFocused, trimValue } from "../lib/utils";
import { Panel } from "./Panel";

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

  const circles = Object.values(props.state.circles);

  return (
    <Panel style={{ bottom: 0, right: 0 }}>
      <p>Circle Information</p>
      <br />
      {circles.length ? (
        <>
          <p>Click on an item here to focus it</p>
          <br />
          <ul>
            {circles.map(circle => (
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
                <p>x: {trimValue(circle.x)}</p>
                <p>y: {trimValue(circle.y)}</p>
                <p>vx: {trimValue(circle.velocity.x)}</p>
                <p>vy: {trimValue(circle.velocity.y)}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Detailed info about the state of every circle will be listed here</p>
      )}
    </Panel>
  );
};
