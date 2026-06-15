import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, reset } from "./counterSlice";
import "./App.css";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <main id="center">
      <h1>Redux Counter</h1>
      <p>Current value: {count}</p>
      <div className="button-row">
        <button type="button" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <button type="button" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <button type="button" onClick={() => dispatch(reset())}>
          Reset
        </button>
      </div>
    </main>
  );
}

export default App;
