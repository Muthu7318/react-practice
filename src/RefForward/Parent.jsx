import { useEffect, useRef } from "react";
import Child from "./Child";

function Parent() {
  const parentRef = useRef();

  useEffect(() => {
    if (parentRef.current) {
      console.log(parentRef.current);
      parentRef.current.applyFocus();
      parentRef.current.someValue();
    }
  }, []);

  return (
    <div>
      <Child ref={parentRef}></Child>
    </div>
  );
}

export default Parent;
