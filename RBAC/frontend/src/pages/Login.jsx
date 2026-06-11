import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { loginUser, clearError, selectIsLoading, selectError } from '../features/auth/authSlice'

const DEMO_ACCOUNTS = [
  {
    role: 'admin',
    name: 'Alex Johnson',
    username: 'admin',
    password: 'admin123',
  },
  {
    role: 'manager',
    name: 'Morgan Chen',
    username: 'manager',
    password: 'manager123',
  },
  {
    role: 'employee',
    name: 'Jordan Smith',
    username: 'employee',
    password: 'employee123',
  },
]

// Login page view supporting manual login and demo credentials
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectError)

  const redirectTo = location.state?.from?.pathname || '/dashboard'

  const fillDemoAccount = (account) => {
    setUsername(account.username)
    setPassword(account.password)
    dispatch(clearError())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearError())

    const result = await dispatch(loginUser({ username, password }))
    if (loginUser.fulfilled.match(result)) {
      navigate(redirectTo, { replace: true })
    }
  }

  return (
    <main className="login-page">
      {/* Left Branding Panel */}
      <div className="login-left">
        <div className="login-brand">
          <h1 className="login-brand-name">LayMotion</h1>
          <p className="login-brand-tagline">Role-Based Access Control Portal</p>
        </div>

        <div className="login-features">
          <div className="login-feature-item">
            <span className="login-feature-text">Role-based route protection</span>
          </div>
          <div className="login-feature-item">
            <span className="login-feature-text">Token-based authentication</span>
          </div>
          <div className="login-feature-item">
            <span className="login-feature-text">Persistent sessions</span>
          </div>
          <div className="login-feature-item">
            <span className="login-feature-text">Redux state management</span>
          </div>
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div className="login-right">
        <div className="login-form-box fade-in">
          <h2 className="login-heading">Welcome back</h2>
          <p className="login-subheading">Sign in to your account to continue</p>

          {error && (
            <div className="login-error">
              Error: {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="form-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={!username || !password || isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Quick demo credentials filler */}
          <div className="demo-section">
            <p className="demo-title">Quick Demo — Click to fill</p>

            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.role}
                className="demo-card"
                type="button"
                onClick={() => fillDemoAccount(account)}
              >
                <div style={{ flex: 1 }}>
                  <div className="demo-card-name">{account.name}</div>
                  <div className="demo-card-creds">
                    {account.username} / {account.password}
                  </div>
                </div>

                <span className={`role-badge ${account.role}`}>
                  {account.role}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login
