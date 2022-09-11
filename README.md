# use-wasd

a super easy hook to check which keys are currently pressed on your keyboard

```js
import useWASD from "use-wasd";

export default function KeysPressed() {
  // you can initialize it, or you just leave it empty
  const keys = useWASD({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  return (
    <>
      <h2>Keys pressed</h2>
      {Object.keys(keys).map((key) => {
        return (
          <span key={key} style={{ margin: "10px" }}>
            {key}: {keys[key] ? "true" : "false"}
          </span>
        );
      })}
    </>
  );
}
```

[some more examples]("https://codesandbox.io/s/usewasd-hook-jwvks5?file=/src/App.js")
