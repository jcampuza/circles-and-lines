import React from "react";

interface ViewProps {
  grow?: boolean;
  scrollable?: boolean;
  children: React.ReactNode;
}

export const View = (props: ViewProps) => {
  const styles = {
    overflow: props.scrollable ? "auto" : "visible",
    position: "relative",
    height: props.grow ? "100%" : "auto",
    width: props.grow ? "100%" : "auto"
  };

  return <div {...styles}>{props.children}</div>;
};
