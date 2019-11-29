import React from "react";

interface HeadsUpMessageProps {}

export const HeadsUpMessage = (props: HeadsUpMessageProps) => {
  return (
    <div className="info-panel" style={{ bottom: 0, left: 0, width: 350 }}>
      <p>Click the screen to add circles</p>

      <br />

      <p>While Paused you can drag and drop circles</p>

      <br />

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
  );
};
