import React, { useEffect, useState } from "react";

interface DraggableSVGProps {
  onDrag: (position: { x: number; y: number }) => void;
  onDragEnd?: () => void;
  children: React.ReactNode;
}

export const DraggableSVG = ({
  children,
  onDrag,
  onDragEnd
}: DraggableSVGProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const mouseupHandler = (e: MouseEvent) => {
      if (isDragging) {
        onDragEnd && onDragEnd();
      }

      setIsDragging(false);
    };

    const mousemoveHandler = (e: MouseEvent) => {
      if (isDragging) {
        onDrag({ x: e.clientX, y: e.clientY });
      }
    };

    const touchEndHandler = (e: TouchEvent) => {
      if (isDragging) {
        onDragEnd && onDragEnd();
      }

      setIsDragging(false);
    };

    const touchMoveHandler = (e: TouchEvent) => {
      if (isDragging) {
        onDrag({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    document.addEventListener("touchend", touchEndHandler, { passive: false });
    document.addEventListener("touchmove", touchMoveHandler, {
      passive: false
    });
    document.addEventListener("mouseup", mouseupHandler);
    document.addEventListener("mousemove", mousemoveHandler);

    return () => {
      document.removeEventListener("mouseup", mouseupHandler);
      document.removeEventListener("mousemove", mousemoveHandler);
      document.removeEventListener("touchend", touchEndHandler);
      document.removeEventListener("touchmove", touchMoveHandler);
    };
  }, [isDragging, setIsDragging, onDragEnd, onDrag]);

  return (
    <g onMouseDown={handleMouseDown} onTouchStart={handleMouseDown}>
      {children}
    </g>
  );
};
