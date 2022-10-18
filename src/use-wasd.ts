import { MutableRefObject, useEffect, useRef, useState } from "react";

export interface UseWASDOptions {
  allowed?: string[];
  blocked?: string[];
  combos?: Record<string, string[]>;
  initialValue?: Record<string, boolean>;
  preventDefault?: boolean | string[];
  ref?: MutableRefObject<Element>;
}

function shouldTrack(options: UseWASDOptions, key: string) {
  const allowAll = !options.allowed;
  const isBlocked = options.blocked?.includes(key);
  const isAllowed = allowAll || options.allowed?.includes(key);

  return !(isBlocked || !isAllowed);
}

function shouldPreventDefault(
  preventDefault: UseWASDOptions["preventDefault"],
  key: string
) {
  if (Array.isArray(preventDefault)) {
    return preventDefault?.includes(key);
  }
  return Boolean(preventDefault);
}

export default function useWASD(options: UseWASDOptions = {}) {
  const [keyboard, setKeyboard] = useState(options.initialValue || {});

  const keys = useRef({ ...keyboard });

  useEffect(() => {
    function update() {
      const matchingCombos = options.combos
        ? Object.entries(options.combos).reduce(
            (previousValue, [name, characters]) => ({
              ...previousValue,
              [name]: characters.every((character) => keys.current[character]),
            }),
            {}
          )
        : {};
      setKeyboard({ ...keys.current, ...matchingCombos });
    }

    function handleDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase().trim() || "space";
      if (shouldPreventDefault(options.preventDefault, key)) {
        event.preventDefault();
      }
      if (shouldTrack(options, key)) {
        keys.current[key] = true;
        update();
      }
    }

    function handleUp(event: KeyboardEvent) {
      const key = event.key.toLowerCase().trim() || "space";
      if (shouldPreventDefault(options.preventDefault, key)) {
        event.preventDefault();
      }
      if (shouldTrack(options, key)) {
        keys.current[key] = false;
        update();
      }
    }

    const context = options.ref?.current ?? document;

    context.addEventListener("keydown", handleDown);
    context.addEventListener("keyup", handleUp);

    return () => {
      context.removeEventListener("keydown", handleDown);
      context.removeEventListener("keyup", handleUp);
    };
  }, [options]);

  return keyboard;
}
