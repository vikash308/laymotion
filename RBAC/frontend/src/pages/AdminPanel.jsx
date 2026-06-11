import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/auth/authSlice'
import Navbar from '../components/Navbar'

const INITIAL_USERS = [
  { id: 1, name: 'Alex Johnson', email: 'alex@laymotion.io', role: 'admin' },
  { id: 2, name: 'Morgan Chen', email: 'morgan@laymotion.io', role: 'manager' },
  { id: 3, name: 'Jordan Smith', email: 'jordan@laymotion.io', role: 'employee' },
  { id: 4, name: 'Taylor Reed', email: 'taylor@laymotion.io', role: 'employee' },
]

// Admin Panel showing interactive user configuration with side drawer modal form
const AdminPanel = () => {
  const currentUser = useSelector(selectUser)
  const [users, setUsers] = useState(INITIAL_USERS)
  
  // Drawer open state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  
  // Form input states
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newRole, setNewRole] = useState('employee')

  // Add user logic
  const handleAddUser = (e) => {
    e.preventDefault()
    if (!newName || !newEmail) return

    const newUser = {
      id: Date.now(),
      name: newName,
      email: newEmail,
      role: newRole
    }

    setUsers([...users, newUser])
    setNewName('')
    setNewEmail('')
    setNewRole('employee')
    setIsDrawerOpen(false)
  }

  // Remove user logic
  const handleRemoveUser = (id) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div className="app-shell">
      <Navbar />
      <div className="main-content">
        <header className="topbar">
          <span className="topbar-title">Admin Panel</span>
        </header>

        <main className="page-container fade-in">
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h1 className="card-title" style={{ margin: 0 }}>User Administration</h1>
              
              {/* Sleek, small Trigger Button */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                style={{
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  background: 'rgba(167, 139, 250, 0.12)',
                  border: '1px solid rgba(167, 139, 250, 0.25)',
                  borderRadius: '6px',
                  color: 'var(--accent-purple)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                + Add User
              </button>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
              Logged in as: <b>{currentUser?.name}</b> ({currentUser?.role})
            </p>

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>{user.role}</span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemoveUser(user.id)}
                          disabled={user.email === currentUser?.email}
                          style={{
                            padding: '4px 8px',
                            fontSize: '11px',
                            background: 'rgba(244,63,94,0.1)',
                            border: '1px solid rgba(244,63,94,0.3)',
                            borderRadius: '4px',
                            color: 'var(--accent-pink)',
                            cursor: user.email === currentUser?.email ? 'not-allowed' : 'pointer',
                            opacity: user.email === currentUser?.email ? 0.5 : 1
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* ── SIDE DRAWER MODAL ── */}
      {isDrawerOpen && (
        <>
          {/* Blur Backdrop */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 1000,
              animation: 'fadeIn 0.2s ease-out'
            }}
          />

          {/* Drawer Panel */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '360px',
              maxWidth: '90vw',
              background: 'var(--bg-card)',
              borderLeft: '1px solid var(--border)',
              padding: '28px 24px',
              zIndex: 1001,
              boxShadow: '-8px 0 32px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Add New User</h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                &times;
              </button>
            </div>

            {/* Drawer Form */}
            <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px', marginBottom: '6px' }}>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="form-input"
                  style={{ width: '100%', padding: '10px 12px' }}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px', marginBottom: '6px' }}>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="form-input"
                  style={{ width: '100%', padding: '10px 12px' }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px', marginBottom: '6px' }}>Assign Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="form-input"
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-glass)' }}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </select>
              </div>

              <button
                type="submit"
                className="login-btn"
                style={{ width: '100%', padding: '12px', marginTop: '12px' }}
              >
                Create User
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminPanel
