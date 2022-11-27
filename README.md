<p align="center"><img src="https://github.com/doemser/dead-simple-react/blob/main/assets/png/use-wasd.png?raw=true"/></p>

# use-wasd

[![Version](https://img.shields.io/npm/v/use-wasd?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/use-wasd)
[![Build Size](https://img.shields.io/bundlephobia/minzip/use-wasd?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](<[https://bundlephobia.com/result?p=use-wasd](https://bundlephobia.com/package/use-wasd@2.0.1)>)
[![Downloads](https://img.shields.io/npm/dt/use-wasd.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/use-wasd)

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

<a href="https://codesandbox.io/s/github/doemser/dead-simple-react/tree/main/examples/use-wasd/use-wasd-basic" target="_blank">![Try it yourself.](https://github.com/doemser/dead-simple-react/blob/main/assets/png/use-wasd-try-it-yourself.png?raw=true)</a>

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

<a href="https://codesandbox.io/s/github/doemser/dead-simple-react/tree/main/examples/use-wasd/use-wasd-combos" target="_blank">![Try it yourself.](https://github.com/doemser/dead-simple-react/blob/main/assets/png/use-wasd-try-it-yourself.png?raw=true)</a>

---

### initialValue

You can initially fill the object.

```js
const options = {
  initialValue: { w: true, shift: false, sprint: false },
};
```

> Note that the `"keydown"` event will always set keys `true`, while the `"keyup"` event will always set to `false`. Initially setting a key to `true` will not reverse the mechanism.

<a href="https://codesandbox.io/s/github/doemser/dead-simple-react/tree/main/examples/use-wasd/use-wasd-initial-value" target="_blank">![Try it yourself.](https://github.com/doemser/dead-simple-react/blob/main/assets/png/use-wasd-try-it-yourself.png?raw=true)</a>

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

<a href="https://codesandbox.io/s/github/doemser/dead-simple-react/tree/main/examples/use-wasd/use-wasd-prevent-default" target="_blank">![Try it yourself.](https://github.com/doemser/dead-simple-react/blob/main/assets/png/use-wasd-try-it-yourself.png?raw=true)</a>

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

<a href="https://codesandbox.io/s/github/doemser/dead-simple-react/tree/main/examples/use-wasd/use-wasd-ref" target="_blank">![Try it yourself.](https://github.com/doemser/dead-simple-react/blob/main/assets/png/use-wasd-try-it-yourself.png?raw=true)</a>

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

[Basic Example](https://codesandbox.io/s/github/doemser/dead-simple-react/tree/main/examples/use-wasd/use-wasd-basic)

[combos Example](https://codesandbox.io/s/github/doemser/dead-simple-react/tree/main/examples/use-wasd/use-wasd-combos)

[initialValue Example](https://codesandbox.io/s/github/doemser/dead-simple-react/tree/main/examples/use-wasd/use-wasd-initial-value)

[preventDefault Example](https://codesandbox.io/s/github/doemser/dead-simple-react/tree/main/examples/use-wasd/use-wasd-prevent-default)

[ref Example](https://codesandbox.io/s/github/doemser/dead-simple-react/tree/main/examples/use-wasd/use-wasd-ref)

---

## Learn

[useWASD vanilla source](https://codesandbox.io/s/github/doemser/dead-simple-react/tree/main/examples/use-wasd/use-wasd-vanilla)

> if you are familiar with typescript, you can also find the source code on [github](https://github.com/doemser/use-wasd/blob/main/src/use-wasd.ts).
