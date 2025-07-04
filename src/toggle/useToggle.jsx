import { useState } from "react";

function useToggle(initialValue = false) {
  const [isOn = value, toggle = setValue] = useState(initialValue);

  return [isOn, toggle];
}

export default useToggle;
