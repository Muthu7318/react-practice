import { useEffect, useState } from "react";

function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.style.background = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.background = "white";
      document.body.style.color = "black";
    }
  }, [darkMode]);
  return (
    <div>
      <div>Dark mode toggle</div>
      <button
        style={{
          outline: "none",
        }}
        onClick={() => setDarkMode(!darkMode)}
      >
        Dark mode : {darkMode ? "On" : "Off"}
      </button>
    </div>
  );
}

export default DarkMode;
