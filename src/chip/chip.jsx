/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./styles.css";

function ChipsInput() {
  const [input, setInput] = useState();
  const [chips, setChips] = useState([]);
  const [id, setId] = useState(0);

  function handleKeyDown(e) {
    if (e.key === "Enter" && input.trim() !== "") {
      let newInput = {
        inputId: id,
        inputValue: input.trim(),
      };

      setChips([...chips, newInput]);
      setInput("");
      setId(id + 1);
    }
  }

  function handleDelete(id) {
    let filteredChips = chips.filter((chip) => chip.inputId !== id);
    setChips(filteredChips);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "40px 0",
      }}
    >
      <h2>Chips Input</h2>
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Type a chip and press tag"
        style={{ padding: "8px", width: "200px" }}
      />
      {console.log(chips)}
      <div
        style={{
          margin: "20px",
          display: "flex",
        }}
      >
        {chips.map((chip) => (
          <span
            key={chip.inputId}
            style={{
              background: "LightGray",
              "border-radius": "15px",
              padding: "10px",
              margin: "10px",
              display: "flex",
              gap: "10px",
            }}
          >
            {chip.inputValue}
            {chips.length > 0 && (
              <button
                style={{
                  background: "none",
                  color: "red",
                  border: "none",
                  padding: "0",
                  font: "inherit",
                  cursor: "pointer",
                  outline: "inherit",
                }}
                onClick={() => handleDelete(chip.inputId)}
              >
                X
              </button>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ChipsInput;
