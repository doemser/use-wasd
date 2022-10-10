import { useState, useEffect } from "react";

export default function useWASD(initialValue: Record<string, boolean> = {}) {
  const [keyboard, setKeyboard] = useState(initialValue);

  useEffect(() => {
    function handleKeyUp(event: KeyboardEvent) {
      handleKey(event.key, false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      handleKey(event.key, true);
    }

    function handleKey(key: string, bool: boolean) {
      // Key might be "" in case of the space bar being pressed
      const key_ = key.toLowerCase().trim() || "space";

      setKeyboard((previousState) => ({
        ...previousState,
        [key_]: bool,
      }));
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keyboard;
}
