import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, resetUser } from "../userSlice";

export default function UserProfileDashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    location: user.location,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync form state when redux user state changes (e.g., on reset)
  useEffect(() => {
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      location: user.location,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(form));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    dispatch(resetUser());
    setSavedSuccess(false);
  };

  return (
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
      </div>

      <div className="profile-grid">
        <div className="profile-panel">
          <div className="profile-summary">
            <div
              className="profile-avatar"
              style={{ background: theme.primaryColor }}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
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
              <strong className="status-active">Active</strong>
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
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Role
              <input name="role" value={form.role} onChange={handleChange} required />
            </label>
            <label>
              Phone
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Location
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
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
              {savedSuccess && <span className="save-notice">✓ Saved successfully!</span>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
