import React, { useState, useMemo } from "react";

function heavyComputation(num) {
  console.log("Running heavy computation...");
  return Math.pow(num, 2);
}

export default function MemoComp() {
  const [count, setCount] = useState(1);
  const [name, setName] = useState("John");

  // Memoize heavy computation result
  const computedValue = useMemo(() => heavyComputation(count), [count]);

  return (
    <div>
      <h2>useMemo Example</h2>

      <div>
        <label>
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <p>Name: {name}</p>
      </div>

      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
        <p>Computed Value: {computedValue}</p>
      </div>
    </div>
  );
}
