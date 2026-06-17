import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "./themeSlice";
import UserProfileDashboard from "./components/UserProfileDashboard";
import Counter from "./components/Counter";
import UserList from "./components/UserList";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [activeTab, setActiveTab] = useState("api-users");

  return (
    <main
      id="center"
      className={`theme-${theme.mode}`}
      style={{ background: theme.backgroundColor, color: theme.textColor, transition: "all 0.3s ease" }}
    >
      <header className="app-header" style={{ borderBottom: `1px solid ${theme.mode === "light" ? "#e2e8f0" : "#334155"}` }}>
        <div className="header-brand">
          <div className="logo-icon" style={{ background: theme.primaryColor }}>RTK</div>
          <div>
            <h1>Redux Toolkit Sandbox</h1>
          </div>
        </div>
        
        <div className="header-controls">
          <button
            type="button"
            className="theme-btn"
            style={{ background: theme.primaryColor }}
            onClick={() => dispatch(toggleMode())}
          >
            {theme.mode === "light" ? "🌙 Dark" : "☀️ Light"} Mode
          </button>
        </div>
      </header>

      <nav className="tab-navigation">
        <button
          className={`tab-link ${activeTab === "api-users" ? "active" : ""}`}
          style={activeTab === "api-users" ? { backgroundColor: theme.mode === 'light' ? '#ffffff' : '#1e293b', color: theme.primaryColor } : {}}
          onClick={() => setActiveTab("api-users")}
        >
          🌐 Fetch API Users
        </button>
        <button
          className={`tab-link ${activeTab === "profile" ? "active" : ""}`}
          style={activeTab === "profile" ? { backgroundColor: theme.mode === 'light' ? '#ffffff' : '#1e293b', color: theme.primaryColor } : {}}
          onClick={() => setActiveTab("profile")}
        >
          👤 Profile Dashboard
        </button>
        <button
          className={`tab-link ${activeTab === "counter" ? "active" : ""}`}
          style={activeTab === "counter" ? { backgroundColor: theme.mode === 'light' ? '#ffffff' : '#1e293b', color: theme.primaryColor } : {}}
          onClick={() => setActiveTab("counter")}
        >
          🔢 Counter Demo
        </button>
      </nav>

      <div className="tab-content-wrapper">
        {activeTab === "api-users" && <UserList />}
        {activeTab === "profile" && <UserProfileDashboard />}
        {activeTab === "counter" && <Counter />}
      </div>
    </main>
  );
}

export default App;

