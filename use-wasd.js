import { useState, useEffect } from "react";

export default function useWASD(initialValue = {}) {
  const [keyboard, setKeyboard] = useState(initialValue);

  useEffect(() => {
    function handleKeyUp(event) {
      handleKey(event.key, false);
    }

    function handleKeyDown(event) {
      handleKey(event.key, true);
    }

    function handleKey(key, bool) {
      // Key might be "" in case of the space bar being pressed
      const key_ = key.toLowerCase().trim() || "space";

      setKeyboard((previousState) => ({
        ...previousState,
        [key_]: bool
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
