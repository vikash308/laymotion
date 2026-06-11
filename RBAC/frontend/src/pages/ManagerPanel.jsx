import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/auth/authSlice'
import Navbar from '../components/Navbar'

const INITIAL_TEAM = [
  { id: 1, name: 'Jordan Smith', email: 'jordan@laymotion.io', role: 'employee', dept: 'Design' },
  { id: 2, name: 'Taylor Reed', email: 'taylor@laymotion.io', role: 'employee', dept: 'Marketing' },
  { id: 3, name: 'Riley Davis', email: 'riley@laymotion.io', role: 'employee', dept: 'Engineering' },
]

const INITIAL_REPORTS = [
  { id: 1, title: 'Q2 Design Audit Review', status: 'Completed' },
  { id: 2, title: 'Marketing Spend Assessment', status: 'In Progress' },
]

// Manager Panel showing interactive team roster and department reports inside drawers
const ManagerPanel = () => {
  const currentUser = useSelector(selectUser)
  
  // Drawer states
  const [isTeamDrawerOpen, setIsTeamDrawerOpen] = useState(false)
  const [isReportDrawerOpen, setIsReportDrawerOpen] = useState(false)

  // Team roster states
  const [team, setTeam] = useState(INITIAL_TEAM)
  const [memberName, setMemberName] = useState('')
  const [memberEmail, setMemberEmail] = useState('')
  const [memberDept, setMemberDept] = useState('Design')

  // Reports states
  const [reports, setReports] = useState(INITIAL_REPORTS)
  const [reportTitle, setReportTitle] = useState('')
  const [reportStatus, setReportStatus] = useState('Pending')

  // Add team member to state array
  const handleAddTeamMember = (e) => {
    e.preventDefault()
    if (!memberName || !memberEmail) return

    const newMember = {
      id: Date.now(),
      name: memberName,
      email: memberEmail,
      role: 'employee',
      dept: memberDept
    }

    setTeam([...team, newMember])
    setMemberName('')
    setMemberEmail('')
    setMemberDept('Design')
    setIsTeamDrawerOpen(false)
  }

  // Remove team member from state array
  const handleRemoveTeamMember = (id) => {
    setTeam(team.filter(m => m.id !== id))
  }

  // Add report to state array
  const handleAddReport = (e) => {
    e.preventDefault()
    if (!reportTitle) return

    const newReport = {
      id: Date.now(),
      title: reportTitle,
      status: reportStatus
    }

    setReports([...reports, newReport])
    setReportTitle('')
    setReportStatus('Pending')
    setIsReportDrawerOpen(false)
  }

  // Remove report from state array
  const handleRemoveReport = (id) => {
    setReports(reports.filter(r => r.id !== id))
  }

  return (
    <div className="app-shell">
      <Navbar />
      <div className="main-content">
        <header className="topbar">
          <span className="topbar-title">Manager Panel</span>
        </header>

        <main className="page-container fade-in">
          
          {/* 1. Team Management Section */}
          <div className="card" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Team Management</h2>
              <button
                onClick={() => setIsTeamDrawerOpen(true)}
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
                + Add Member
              </button>
            </div>

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {team.map((member) => (
                    <tr key={member.id}>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member.dept}</td>
                      <td>
                        <button
                          onClick={() => handleRemoveTeamMember(member.id)}
                          style={{
                            padding: '4px 8px',
                            fontSize: '11px',
                            background: 'rgba(244,63,94,0.1)',
                            border: '1px solid rgba(244,63,94,0.3)',
                            borderRadius: '4px',
                            color: 'var(--accent-pink)',
                            cursor: 'pointer'
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

          {/* 2. Reports Management Section */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Department Reports</h2>
              <button
                onClick={() => setIsReportDrawerOpen(true)}
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
                + Add Report
              </button>
            </div>

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Report Title</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.title}</td>
                      <td>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: report.status === 'Completed' ? 'var(--accent-green)' :
                                 report.status === 'In Progress' ? 'var(--accent-cyan)' : 'var(--text-muted)'
                        }}>
                          {report.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemoveReport(report.id)}
                          style={{
                            padding: '4px 8px',
                            fontSize: '11px',
                            background: 'rgba(244,63,94,0.1)',
                            border: '1px solid rgba(244,63,94,0.3)',
                            borderRadius: '4px',
                            color: 'var(--accent-pink)',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
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

      {/* ── SIDE DRAWER MODAL: TEAM MEMBER ── */}
      {isTeamDrawerOpen && (
        <>
          <div
            onClick={() => setIsTeamDrawerOpen(false)}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Add Team Member</h2>
              <button
                onClick={() => setIsTeamDrawerOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '20px', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddTeamMember} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px', marginBottom: '6px' }}>Member Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
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
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  className="form-input"
                  style={{ width: '100%', padding: '10px 12px' }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px', marginBottom: '6px' }}>Department</label>
                <select
                  value={memberDept}
                  onChange={(e) => setMemberDept(e.target.value)}
                  className="form-input"
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-glass)' }}
                >
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Support">Support</option>
                </select>
              </div>

              <button
                type="submit"
                className="login-btn"
                style={{ width: '100%', padding: '12px', marginTop: '12px' }}
              >
                Create Member
              </button>
            </form>
          </div>
        </>
      )}

      {/* ── SIDE DRAWER MODAL: REPORT ── */}
      {isReportDrawerOpen && (
        <>
          <div
            onClick={() => setIsReportDrawerOpen(false)}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Add Report</h2>
              <button
                onClick={() => setIsReportDrawerOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '20px', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddReport} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px', marginBottom: '6px' }}>Report Title</label>
                <input
                  type="text"
                  placeholder="Enter report title"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="form-input"
                  style={{ width: '100%', padding: '10px 12px' }}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px', marginBottom: '6px' }}>Status</label>
                <select
                  value={reportStatus}
                  onChange={(e) => setReportStatus(e.target.value)}
                  className="form-input"
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-glass)' }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <button
                type="submit"
                className="login-btn"
                style={{ width: '100%', padding: '12px', marginTop: '12px' }}
              >
                Create Report
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default ManagerPanel
