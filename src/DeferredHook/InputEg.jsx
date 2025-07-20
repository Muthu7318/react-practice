import React, { useState, useMemo, useDeferredValue } from "react";

const bigList = Array.from({ length: 1000000 }, (_, i) => `Item ${i + 1}`);

export default function InputEg() {
  const [input, setInput] = useState("");

  // 👇 Create a deferred version of input
  const deferredInput = useDeferredValue(input);

  // 👇 Simulate expensive filtering
  const filteredList = useMemo(() => {
    // Simulate delay
    const start = performance.now();
    while (performance.now() - start < 100) {} // block CPU for 100ms

    return bigList.filter((item) =>
      item.toLowerCase().includes(deferredInput.toLowerCase())
    );
  }, [deferredInput]);

  return (
    <div>
      <h2>Search (with useDeferredValue)</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search items..."
      />

      <ul>
        {filteredList.slice(0, 100).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
