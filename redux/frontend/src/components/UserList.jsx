import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersList } from "../usersListSlice";

export default function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.usersList);
  const theme = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchUsersList());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchUsersList());
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.company.name.toLowerCase().includes(term)
    );
  });

  // Helper to get initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <section className="user-list-section" style={{ borderColor: theme.primaryColor }}>
      <div className="section-header">
        <div>
          <h2>API Users Directory</h2>
          <p className="section-description">
            Loaded asynchronously using Redux Toolkit `createAsyncThunk`
          </p>
        </div>
        <div className="actions-wrapper">
          <input
            type="text"
            placeholder="Search by name, email or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="refresh-btn" onClick={handleRetry} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="loading-container">
          <div className="spinner" style={{ borderTopColor: theme.primaryColor }}></div>
          <p className="loading-text">Fetching latest users from API...</p>
        </div>
      )}

      {/* Error Alert */}
      {!loading && error && (
        <div className="error-container">
          <div className="error-card">
            <div className="error-icon">⚠️</div>
            <h3>Oops! Fetch Failed</h3>
            <p className="error-message">{error}</p>
            <button className="retry-btn" style={{ background: theme.primaryColor }} onClick={handleRetry}>
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* User Grid */}
      {!loading && !error && (
        <>
          {filteredUsers.length === 0 ? (
            <div className="no-results">
              <p>No users found matching "{searchTerm}"</p>
            </div>
          ) : (
            <div className="user-grid">
              {filteredUsers.map((u) => (
                <div key={u.id} className="user-card">
                  <div className="card-top-gradient" style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, #818cf8)` }}></div>
                  <div className="user-avatar-wrapper">
                    <div className="user-initials-avatar" style={{ border: `3px solid ${theme.backgroundColor}` }}>
                      {getInitials(u.name)}
                    </div>
                  </div>

                  <div className="user-card-content">
                    <h3 className="user-fullname">{u.name}</h3>
                    <p className="user-username">@{u.username}</p>

                    <div className="user-meta-details">
                      {/* Email */}
                      <a href={`mailto:${u.email}`} className="meta-link" title="Send Email">
                        <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{u.email}</span>
                      </a>

                      {/* Phone */}
                      <a href={`tel:${u.phone}`} className="meta-link" title="Call User">
                        <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 00.096.867l-1.1 1.486a10.053 10.053 0 004.872 4.872l1.486-1.1a1 1 0 01.867-.096l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{u.phone}</span>
                      </a>

                      {/* Website */}
                      <a href={`https://${u.website}`} target="_blank" rel="noopener noreferrer" className="meta-link" title="Visit Website">
                        <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <span>{u.website}</span>
                      </a>

                      {/* Company */}
                      <div className="meta-static">
                        <svg className="meta-icon text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <div className="company-text">
                          <strong className="company-name">{u.company.name}</strong>
                          <span className="company-phrase">"{u.company.catchPhrase}"</span>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="meta-static">
                        <svg className="meta-icon text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{u.address.suite}, {u.address.street}, {u.address.city}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
