import React from "react";
import { Panel } from "./Panel";

interface HeadsUpAction {
  label: string;
  action: () => void;
}

interface HeadsUpMessageProps {
  onSpeedChanged: (value: string) => void;
  speed: number;
  actions: Array<HeadsUpAction>;
}

enum SpeedCoefficient {
  VERY_SLOW = 0.25,
  SLOW = 0.5,
  NORMAL = 1,
  FAST = 2,
  VERY_FAST = 4
}

export const HeadsUpMessage = (props: HeadsUpMessageProps) => {
  return (
    <Panel style={{ bottom: 0, left: 0 }}>
      <p>Click the screen to add circles</p>

      <br />

      <p>While Paused you can drag and drop circles</p>

      <br />

      <p>Speed Coefficient</p>
      <select
        value={props.speed}
        onChange={e => props.onSpeedChanged(e.target.value)}
      >
        <option value={SpeedCoefficient.VERY_SLOW}>0.25</option>
        <option value={SpeedCoefficient.SLOW}>0.5</option>
        <option value={SpeedCoefficient.NORMAL}>1</option>
        <option value={SpeedCoefficient.FAST}>2</option>
        <option value={SpeedCoefficient.VERY_FAST}>4</option>
      </select>

      <br />
      <br />

      <div className="desktop-info">
        <p>Keyboard Shortcuts:</p>
        <ul>
          <li>Spacebar: Add Circle</li>
          <li>P: Pause</li>
          <li>R: Reset State</li>
          <li>I: Hide debug information</li>
          <li>D: Delete Focused Circle</li>
          <li>Arrow Keys: Focus nearest circle in key direction</li>
        </ul>
      </div>

      <div className="mobile-info">
        <ul>
          {props.actions.map(action => (
            <li key={action.label}>
              <button onClick={action.action}>{action.label}</button>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
};
