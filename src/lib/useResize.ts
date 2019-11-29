import { useEffect } from "react";

export interface Dimensions {
  width: number;
  height: number;
  devicePixelRatio: number;
  fontScale: number;
}

export const useResize = (callback: (dimensions: Dimensions) => void) => {
  useEffect(() => {
    const handler = () => {
      callback({
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio || 1,
        fontScale: 1
      });
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [callback]);
};
