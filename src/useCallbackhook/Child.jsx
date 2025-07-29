import React from "react";

const Child = React.memo(({ name, onNameChange }) => {
  console.log("child component");
  return (
    <>
      <p>Child component</p>
      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      ></input>
    </>
  );
});

export default Child;
