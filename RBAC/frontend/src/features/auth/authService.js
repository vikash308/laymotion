const MOCK_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Alex Johnson',
    email: 'alex@laymotion.io',
    avatar: 'AJ',
    department: 'Engineering',
    joinDate: '2022-01-15',
    permissions: ['read', 'write', 'delete', 'manage_users', 'view_reports'],
  },
  {
    id: 2,
    username: 'manager',
    password: 'manager123',
    role: 'manager',
    name: 'Morgan Chen',
    email: 'morgan@laymotion.io',
    avatar: 'MC',
    department: 'Operations',
    joinDate: '2022-06-20',
    permissions: ['read', 'write', 'view_reports', 'manage_team'],
  },
  {
    id: 3,
    username: 'employee',
    password: 'employee123',
    role: 'employee',
    name: 'Jordan Smith',
    email: 'jordan@laymotion.io',
    avatar: 'JS',
    department: 'Design',
    joinDate: '2023-03-10',
    permissions: ['read'],
  },
]

// Logs in user with username and password, returns user details and simple mock token
const login = async (username, password) => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const user = MOCK_USERS.find(
    (u) => u.username === username && u.password === password
  )

  if (!user) {
    throw new Error('Invalid username or password.')
  }

  const { password: _, ...safeUser } = user
  const token = `mock-token-${user.id}-${user.role}`

  localStorage.setItem('authToken', token)
  localStorage.setItem('authUser', JSON.stringify(safeUser))

  return { user: safeUser, token }
}

// Clears authentication storage details
const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('authUser')
}

// Restores user session from storage
const restoreSession = () => {
  const token = localStorage.getItem('authToken')
  const authUser = localStorage.getItem('authUser')

  if (!token || !authUser) return null

  return {
    user: JSON.parse(authUser),
    token: token,
  }
}

const authService = {
  login,
  logout,
  restoreSession,
}

export default authService
