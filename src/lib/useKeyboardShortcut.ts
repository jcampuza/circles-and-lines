import { useEffect } from "react";

type KeyboardShortcupMap = Record<string, (key: string) => void>;

export const useKeyboardShortcuts = (keymap: KeyboardShortcupMap) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (keymap[e.code]) {
        keymap[e.code](e.code);
      }
    };

    window.addEventListener("keypress", handler);

    return () => {
      window.removeEventListener("keypress", handler);
    };
  }, [keymap]);
};
