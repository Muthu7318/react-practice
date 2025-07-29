import { Provider } from "react-redux";
import store from "./Store";
import Counter from "./Counter";

function StartComponent() {
  return (
    <Provider store={store}>
      <Counter></Counter>
    </Provider>
  );
}

export default StartComponent;
