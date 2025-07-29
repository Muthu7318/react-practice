import { useState } from "react";

function Input() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const EnhancedComponent = withOperation(ResultComponent);

  return (
    <div>
      <input
        type="text"
        value={value1}
        onChange={(e) => setValue1(e.target.value)}
      ></input>
      <input
        type="text"
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
      ></input>

      <EnhancedComponent
        value1={value1}
        value2={value2}
        operator="+"
      ></EnhancedComponent>

      <EnhancedComponent
        value1={value1}
        value2={value2}
        operator="-"
      ></EnhancedComponent>
    </div>
  );
}

export default Input;

function ResultComponent({ result }) {
  return <p>The result is {result}</p>;
}

function withOperation(WrappedComponent) {
  return function (props) {
    let result = "";
    if (props.operator === "+") {
      result = +props.value1 + +props.value2;
    } else if (props.operator === "-") {
      result = +props.value1 - +props.value2;
    }

    return <WrappedComponent result={result}></WrappedComponent>;
  };
}
