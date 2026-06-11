import { useSelector } from 'react-redux'
import { selectUser, selectToken } from '../features/auth/authSlice'
import Navbar from '../components/Navbar'

// Employee profile view displaying personal details and token
const EmployeeProfile = () => {
  const user = useSelector(selectUser)
  const token = useSelector(selectToken)

  if (!user) {
    return (
      <div style={{ color: 'var(--text-secondary)', padding: 20 }}>
        Loading user session...
      </div>
    )
  }

  return (
    <div className="app-shell">
      <Navbar />
      <div className="main-content">
        <header className="topbar">
          <span className="topbar-title">My Profile</span>
        </header>

        <main className="page-container fade-in">
          <div className="content-grid">
            {/* Account Details */}
            <div className="card">
              <h2 style={{ marginBottom: 16, color: 'var(--text-primary)' }}>Account Information</h2>
              <div className="info-row">
                <span className="info-label">Full Name</span>
                <span className="info-value">{user.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email Address</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Department</span>
                <span className="info-value">{user.department}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Role Authority</span>
                <span className="info-value" style={{ textTransform: 'capitalize' }}>{user.role}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Registration Date</span>
                <span className="info-value">{user.joinDate}</span>
              </div>
            </div>

            {/* Token Details */}
            <div className="card">
              <h2 style={{ marginBottom: 16, color: 'var(--text-primary)' }}>Session Details</h2>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Raw Token String:</div>
                <div className="token-box" style={{ wordBreak: 'break-all' }}>
                  {token}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'var(--text-muted)', background: 'rgba(52, 211, 153, 0.05)', padding: '6px 10px', borderRadius: 4, border: '1px dashed rgba(52, 211, 153, 0.2)' }}>
                <span>Verification Status:</span>
                <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>ACTIVE_SESSION_OK</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EmployeeProfile
