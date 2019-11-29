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

    document.addEventListener("mouseup", mouseupHandler);
    document.addEventListener("mousemove", mousemoveHandler);

    return () => {
      document.removeEventListener("mouseup", mouseupHandler);
      document.removeEventListener("mousemove", mousemoveHandler);
    };
  }, [isDragging, setIsDragging, onDragEnd, onDrag]);

  const gProps = { onMouseDown: handleMouseDown };

  return <g {...gProps}>{children}</g>;
};
