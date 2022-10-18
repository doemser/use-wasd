# use-wasd

Easy and agnostic react hook to handle keys and key-combinations on your keyboard.

```bash
npm install use-wasd
```

This hook returns an object with the keys and combos and their pressed state.

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

[Basic Example](https://codesandbox.io/s/usewasd-basic-ljmqtr?file=/src/App.js)

---

### Table of Content

- [Options](#options)
  - [allow/block](#allowblock)
  - [combos](#combos)
  - [initialValue](#initialvalue)
  - [preventDefault](#preventdefault)
  - [ref](#ref)
- [Performance](#performance)
  - [Destructuring](#destructuring)
  - [Memoization](#memoization)
- [Examples](#examples)
- [Learn](#learn)

---

## Options

You can pass an optional `options` object.

```js
const options = { allow: ["w", "a", "s", "d"] };

export default function App() {
  const { w, a ,s ,d }  = useWASD(options);
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

### allow/block

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

### combos

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

[combos Example](https://codesandbox.io/s/usewasd-combos-z9cvbe?file=/src/App.js)

---

### initialValue

You can initially fill the object.

```js
const options = {
  initialValue: { w: true, shift: false, sprint: false },
};
```

> Note that the `"keydown"` event will always set keys `true`, while the `"keyup"` event will always set to `false`. Initially setting a key to `true` will not reverse the mechanism.

[initialValue Example](https://codesandbox.io/s/usewasd-initialvalue-duc6ez?file=/src/App.js)

---

### preventDefault

You can call `event.preventDefault()` to prevent default actions for keys.

```js
const options = { preventDefault: ["arrowup", "arrowdown"] };
```

You can also set it to `true` to prevent the default function for every key.

```js
const options = { preventDefault: true };
```

> Be aware that by doing so you can jeopardize the a11y

[preventDefault Example](https://codesandbox.io/s/usewasd-preventdefault-i5jb7x?file=/src/App.js)

---

### ref

By default the EventListener will be added to the `document`, if you want it to be added to another element, you can pass it as `ref`.

```js
export default function App() {
  const ref = useRef();
  const keyboard = useWASD({...options, ref});
  ...
}
```

[ref Example](https://codesandbox.io/s/usewasd-ref-6d52sn?file=/src/App.js)

---

## Performance

### Destructuring

> We recommend destructuring the object returned by useWASD.

```diff

export default function App() {
-  const keyboard  = useWASD();
+  const { w, a ,s ,d }  = useWASD();
  ...
}
```

### Memoization

> We recommend memoizing the options object.

Here are 3 common examples of passing the options object:

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
  const options = useRef({...});
  const keyboard  = useWASD(options.current);
  ...
}
```

Do not pass the object directly into the hook, this would cause unnecessary rerenders.

```js

export default function App() {
  const keyboard = useWASD({...});
  ...
}
```

---

## Examples

[Basic Example](https://codesandbox.io/s/usewasd-basic-ljmqtr?file=/src/App.js)

[combos Example](https://codesandbox.io/s/usewasd-combos-z9cvbe?file=/src/App.js)

[initialValue Example](https://codesandbox.io/s/usewasd-initialvalue-duc6ez?file=/src/App.js)

[preventDefault Example](https://codesandbox.io/s/usewasd-preventdefault-i5jb7x?file=/src/App.js)

[ref Example](https://codesandbox.io/s/usewasd-ref-6d52sn?file=/src/App.js)

[react-three-fiber / r3f Example](https://codesandbox.io/s/use-wasd-hook-in-r3f-s0pomg?file=/src/App.js)

---

## Learn

[useWASD source](https://codesandbox.io/s/usewasd-plain-js-source-qm29co?file=/src/use-wasd.js)

> if you are familiar with typescript, you can also find the source code on [github](https://github.com/doemser/use-wasd/blob/main/src/use-wasd.ts).
