import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, reset } from "../counterSlice";

export default function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const theme = useSelector((state) => state.theme);

  return (
    <section
      className="counter-panel"
      style={{ borderColor: theme.primaryColor }}
    >
      <div className="counter-header">
        <div>
          <h2>Redux Counter</h2>
          <p className="counter-description">
            Simple state demo with actions
          </p>
        </div>
      </div>

      <div className="counter-display">
        <span className="counter-value" style={{ color: theme.primaryColor }}>
          {count}
        </span>
        <p>Current value</p>
      </div>

      <div className="button-row">
        <button type="button" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <button type="button" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <button type="button" className="secondary-btn" onClick={() => dispatch(reset())}>
          Reset
        </button>
      </div>
    </section>
  );
}
