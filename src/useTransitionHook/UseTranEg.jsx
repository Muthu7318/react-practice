import React, { useState, useMemo, useTransition } from "react";

const ITEMS = Array.from({ length: 1000000 }, (_, i) => `Item ${i + 1}`);

export default function UseTranEg() {
  const [input, setInput] = useState(""); // always up‑to‑date, urgent
  const [filter, setFilter] = useState(""); // can lag behind, non‑urgent
  const [isPending, startTransition] = useTransition();

  // 1️⃣ Handle typing
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value); // URGENT update: shows instantly

    startTransition(() => {
      setFilter(value); // NON‑URGENT update: may lag
    });
  };

  // 2️⃣ Expensive filtering, recalculates only on `filter` change
  const filtered = useMemo(() => {
    // Simulate heavy work (100 ms CPU block)
    const t0 = performance.now();
    while (performance.now() - t0 < 100) {}
    return ITEMS.filter((item) => item.includes(filter));
  }, [filter]);

  // 3️⃣ Render
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h2>useTransition demo</h2>

      <input
        placeholder="Type to search..."
        value={input}
        onChange={handleChange}
      />

      {isPending && <p style={{ color: "orange" }}>Filtering…</p>}

      <ul>
        {filtered.slice(0, 100).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
