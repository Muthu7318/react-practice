import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "./CounterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increase())}>+</button>
      <p>{count}</p>
      <button onClick={() => dispatch(decrease())}>-</button>
    </div>
  );
}

export default Counter;
