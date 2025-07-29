import React, { useState } from "react";

function CurrencyInput() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const raw = e.target.value;

    // Remove all non-digit characters
    const cleaned = raw.replace(/[^0-9]/g, "");

    const number = parseFloat(cleaned);
    debugger;

    if (isNaN(number)) {
      return;
    }

    // Format and update
    const formatted = number.toLocaleString("en-IN");
    setValue(formatted);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Enter amount"
    />
  );
}

export default CurrencyInput;
