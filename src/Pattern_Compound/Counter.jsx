import { createContext, useContext, useState } from "react";

const CounterContext = createContext();

function Counter({ children }) {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decreaseCount = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <CounterContext.Provider
      value={{
        count: count,
        increaseCount: increaseCount,
        decreaseCount: decreaseCount,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}

function Count() {
  const { count } = useContext(CounterContext);

  return <p>{count}</p>;
}

function Label({ children }) {
  return <h3>{children}</h3>;
}

function IncreaseCount({ children }) {
  const { increaseCount } = useContext(CounterContext);

  return <button onClick={increaseCount}>{children}</button>;
}

function DecreaseCount({ children }) {
  const { decreaseCount } = useContext(CounterContext);

  return <button onClick={decreaseCount}>{children}</button>;
}

Counter.Count = Count;
Counter.Label = Label;
Counter.IncreaseCount = IncreaseCount;
Counter.DecreaseCount = DecreaseCount;

export default function CounterDisplay() {
  return (
    <Counter>
      <Counter.Label>The counter app</Counter.Label>
      <Counter.Count></Counter.Count>
      <Counter.IncreaseCount>+</Counter.IncreaseCount>
      <Counter.DecreaseCount>-</Counter.DecreaseCount>
    </Counter>
  );
}
