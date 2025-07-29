import { useCallback, useState } from "react";
import Child from "./Child";

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const handleNameChange = useCallback((newName) => {
    setName(newName);
  }, []);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>
        increase count
      </button>
      <br></br>
      <br></br>
      <Child name={name} onNameChange={handleNameChange}></Child>
    </div>
  );
}

export default Parent;
