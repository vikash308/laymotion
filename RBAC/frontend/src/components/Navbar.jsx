import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, selectRole, logoutUser } from '../features/auth/authSlice'
import { NAV_ITEMS, ROLE_META } from '../utils/roles'

// Left sidebar navigation panel
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const role = useSelector(selectRole)
  const roleMeta = role ? ROLE_META[role] : null

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate('/login', { replace: true })
  }

  const visibleNavItems = NAV_ITEMS.filter(
    (item) => item.roles.includes(role)
  )

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-name">LayMotion</span>
      </div>

      {user && (
        <div className="sidebar-user-card">
          <div className="sidebar-user-top">
            <div
              className="sidebar-avatar"
              style={{ background: roleMeta?.gradient }}
            >
              {user.avatar}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div className="sidebar-user-name">{user.name}</div>
              <div className="sidebar-user-email">{user.email}</div>
            </div>
          </div>
          <span className={`role-badge ${role}`}>
            {roleMeta?.label}
          </span>
        </div>
      )}

      <nav className="sidebar-nav">
        <div className="nav-section-label">Navigation</div>
        {visibleNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </aside>
  )
}

export default Navbar
