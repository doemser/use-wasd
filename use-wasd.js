import { useState, useEffect } from "react";

export default function useWASD(initialValue = {}) {
  const [keyboard, setKeyboard] = useState(initialValue);

  useEffect(() => {
    function handleKeyUp(event) {
      handleKey(event, false);
    }

    function handleKeyDown(event) {
      handleKey(event, true);
    }

    function handleKey(event, bool) {
      const pressedKey = event.key.toLowerCase();
      if (event.code === "Space") {
        setKeyboard(previousState => ({ ...previousState, space: bool }));
      } else {
        setKeyboard(previousState =>({ ...previousState, [pressedKey]: bool }));
      }
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
