import { forwardRef, useImperativeHandle, useRef } from "react";

const Child = forwardRef((props, ref) => {
  const childRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      applyFocus: () => childRef.current.focus(),
      someValue: () => console.log("Testing"),
    };
  });
  return <input ref={childRef}></input>;
});

export default Child;
