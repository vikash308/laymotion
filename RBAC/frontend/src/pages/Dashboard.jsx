import { useSelector } from 'react-redux'
import { selectUser, selectToken } from '../features/auth/authSlice'
import Navbar from '../components/Navbar'

// Dashboard page with minimal content
const Dashboard = () => {
  const user = useSelector(selectUser)
  const token = useSelector(selectToken)

  return (
    <div className="app-shell">
      <Navbar />
      <div className="main-content">
        <header className="topbar">
          <span className="topbar-title">Dashboard</span>
        </header>

        <main className="page-container fade-in">
          <div className="card">
            <h1 style={{ marginBottom: 10, color: 'var(--text-primary)' }}>
              Welcome, {user?.name || 'User'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
              Role: <span className="role-badge" style={{ textTransform: 'capitalize' }}>{user?.role}</span>
            </p>

            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
              <h3 style={{ marginBottom: 8, color: 'var(--text-primary)' }}>Authentication Token:</h3>
              <div className="token-box" style={{ wordBreak: 'break-all' }}>
                {token || 'No token found'}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
