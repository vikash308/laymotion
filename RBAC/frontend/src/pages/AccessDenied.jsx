import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated, selectRole } from '../features/auth/authSlice'
import { ROLE_META } from '../utils/roles'

// 403 Access Denied page view for unauthorized users
const AccessDenied = () => {
  const navigate = useNavigate()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const role = useSelector(selectRole)
  const roleMeta = role ? ROLE_META[role] : null

  return (
    <div className="access-denied-page">
      <div className="access-denied-box fade-in">
        <div className="access-denied-code">403</div>
        <h1 className="access-denied-title">Access Denied</h1>

        <p className="access-denied-msg">
          You don&apos;t have permission to view this page.
          {roleMeta && (
            <>
              {' '}Your current role is{' '}
              <span className={`role-badge ${role}`}>
                {roleMeta.label}
              </span>
              {' '}which does not have access to this resource.
            </>
          )}
        </p>

        <div className="access-denied-btns">
          <button
            className="btn-primary"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </button>

          <button
            className="btn-ghost"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>

          {!isAuthenticated && (
            <button
              className="btn-ghost"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          )}
        </div>

        <div className="access-denied-info">
          <strong style={{ color: 'var(--accent-pink)' }}>
            Why am I seeing this?
          </strong>
          <br />
          This page is protected by role-based access control (RBAC).
          If you believe this is an error, please contact your administrator.
        </div>
      </div>
    </div>
  )
}

export default AccessDenied
