import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, reset } from "./counterSlice";
import { updateUser, resetUser } from "./userSlice";
import { toggleMode } from "./themeSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    location: user.location,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(form));
  };

  const handleReset = () => {
    dispatch(resetUser());
    setForm({
      name: "Aman Sharma",
      email: "aman.sharma@example.com",
      role: "Employee",
      phone: "+91 98765 43210",
      location: "Mumbai, India",
    });
  };


  return (
    <main
      id="center"
      style={{ background: theme.backgroundColor, color: theme.textColor }}
    >
      <section
        className="dashboard-card"
        style={{ borderColor: theme.primaryColor }}
      >
        <div
          className="dashboard-header"
          style={{ background: theme.primaryColor, color: "#fff" }}
        >
          <div>
            <p className="eyebrow">User profile</p>
            <h1>User Profile Dashboard</h1>
          </div>
          <button
            type="button"
            className="theme-btn"
            onClick={() => dispatch(toggleMode())}
          >
            {theme.mode === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>

        <div className="profile-grid">
          <div className="profile-panel">
            <div className="profile-summary">
              <div
                className="profile-avatar"
                style={{ background: theme.primaryColor }}
              >
              </div>
              <div>
                <p className="profile-role">{user.role}</p>
                <h2>{user.name}</h2>
                <p className="profile-email">{user.email}</p>
              </div>
            </div>

            <div className="profile-info">
              <div className="info-row">
                <span>Phone</span>
                <strong>{user.phone}</strong>
              </div>
              <div className="info-row">
                <span>Location</span>
                <strong>{user.location}</strong>
              </div>
              <div className="info-row">
                <span>Member since</span>
                <strong>2024</strong>
              </div>
              <div className="info-row">
                <span>Status</span>
                <strong>Active</strong>
              </div>
            </div>
          </div>

          <div className="edit-panel">
            <h2>Edit User</h2>
            <p className="panel-copy">
              Update the user profile details directly and use the reset button
              to restore default values.
            </p>
            <form onSubmit={handleSubmit}>
              <label>
                Name
                <input name="name" value={form.name} onChange={handleChange} />
              </label>
              <label>
                Email
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Role
                <input name="role" value={form.role} onChange={handleChange} />
              </label>
              <label>
                Phone
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Location
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                />
              </label>
              <div className="button-row">
                <button type="submit">Save Changes</button>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={handleReset}
                >
                  Reset Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

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
          <span className="badge" style={{ background: theme.primaryColor }}>
            {theme.mode} mode
          </span>
        </div>

        <div className="counter-display">
          <span className="counter-value">{count}</span>
          <p>Current value</p>
        </div>

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
      </section>
    </main>
  );
}

export default App;
