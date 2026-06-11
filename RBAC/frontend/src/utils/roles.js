// Role and navigation configuration for Role-Based Access Control

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
}

export const ROLE_META = {
  [ROLES.ADMIN]: {
    label: 'Administrator',
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, #f43f5e, #e11d48)',
    icon: '',
  },
  [ROLES.MANAGER]: {
    label: 'Manager',
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
    icon: '',
  },
  [ROLES.EMPLOYEE]: {
    label: 'Employee',
    color: '#34d399',
    gradient: 'linear-gradient(135deg, #34d399, #059669)',
    icon: '',
  },
}

export const NAV_ITEMS = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: '',
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE],
  },
  {
    path: '/admin',
    label: 'Admin Panel',
    icon: '',
    roles: [ROLES.ADMIN],
  },
  {
    path: '/manager',
    label: 'Manager Panel',
    icon: '',
    roles: [ROLES.ADMIN, ROLES.MANAGER],
  },
  {
    path: '/profile',
    label: 'My Profile',
    icon: '',
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE],
  },
]
