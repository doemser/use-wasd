# use-wasd

Easy and agnostic react hook to handle keys and key-combinations on your keyboard.

```bash
npm install use-wasd
```

This hook returns an object containing the keys and combos states of being pressed on the keyboard.

```js
import useWASD from "use-wasd";

export default function App() {
  const keyboard = useWASD();

  return (
    <pre>
      <code>{JSON.stringify(keyboard)}</code>
    </pre>
  );
}
```

---

## Options

You can pass an optional `options` object.

```js
const options = { allow: ["w", "a", "s", "d"] };

export default function App() {
  const {w, a ,s ,d} = useWASD(options);
  ...
}
```

Available options are:

- allow
- block
- combos
- initialValue
- preventDefault
- ref

---

## allow/block

You can and should explicitly allow or block keys.

```js
const options = {
  // either
  allow: ["w", "shift", "c"],
  // or
  block: ["c"],
};
```

> Do not use both.

---

## combos

You can define custom combos.

```js
const options = {
  allow: ["w", "shift", "space"],
  combos: { sprint: ["w", "shift"], sprintJump: ["w", "shift", "space"] }
};

export default function App() {
  const { sprint, sprintJump } = useWASD(options);
  ...
}
```

> You don´t need to also allow combos, it´s enough if the keys for the combo are allowed and not blocked.

---

## initialValue

You can initially fill the object.

```js
const options = {
  initialValue: { w: true, shift: false, sprint: false },
};
```

> Note that the `"keydown"` event will always set keys `true`, while the `"keyup"` event will always set to `false`. Initially setting a key to `true` will not reverse the mechanism.

---

## preventDefault

You can call `event.preventDefault()` to prevent default actions for keys.

```js
const options = { preventDefault: ["arrowup", "arrowdown"] };
```

> You can pass "all" to the array to prevent the default function for every key.

---

## ref

By default the EventListener will be added to the `document`, if you want it to be added to another element, you can pass it as `ref`.

```js
export default function App() {
  const ref = useRef();
  const keyboard = useWASD({...options, ref});
  ...
}
```

---

## Perfomance

There are 3 ways to pass the options object:

1. Declare it outside the Component.

```js
const options = {...};

export default function App() {
  const keyboard = useWASD(options);
  ...
}
```

2. Using useMemo hook.

```js

export default function App() {
  const options = useMemo(() => ({...}), []);
  const keyboard = useWASD(options);
  ...
}
```

3. Using useRef hook.

```js

export default function App() {
  const options = useRef(() => ({...}));
  const keyboard = useWASD(options);
  ...
}
```

Do not pass object directly into hook, this would cause unnecessary rerenders.

```js

export default function App() {
  const keyboard = useWASD({...});
  ...
}
```

---

## Examples

[Some examples](https://codesandbox.io/s/usewasd-hook-jwvks5?file=/src/App.js)

[r3f example](https://codesandbox.io/s/use-wasd-hook-in-r3f-s0pomg?file=/src/App.js)
