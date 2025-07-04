import useToggle from "./useToggle";

function Toggle() {
  const [on, setOn] = useToggle(false);

  function hanldeToggle() {
    setOn((prevValue) => !prevValue);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button
        style={{
          outline: "none",
          border: "none",
          background: `${on ? "LightBlue" : "LightGray"}`,
          padding: "10px",
          width: "50px",
          borderRadius: "10px",
        }}
        onClick={hanldeToggle}
      >
        {on ? "On" : "Off"}
      </button>
    </div>
  );
}

export default Toggle;
