import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTickets } from '../hooks/useTickets'
import { useAuth } from '../hooks/useAuth'
import { pushToast } from '../lib/toast'
import '../styles/dashboard.css'

// Reusable Stats Card
const StatsCard = ({ value, label, color, iconPath }) => (
  <div className="stats-card" style={{ background: color }}>
    <div>
      <span className="stats-value">{value}</span>
      <span className="stats-label">{label}</span>
    </div>
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d={iconPath} />
    </svg>
  </div>
)

export default function Dashboard() {
  const { tickets, loadTickets } = useTickets()
  const { user } = useAuth()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTickets()
      .catch(err => {
        setError(err)
        pushToast({
          msg: err.message || 'Failed to load tickets. Please retry.',
          type: 'error',
        })
      })
      .finally(() => setIsLoading(false))
  }, [loadTickets])

  // Compute stats
  const stats = tickets.reduce(
    (acc, t) => {
      acc.total += 1
      acc[t.status] = (acc[t.status] || 0) + 1
      if (t.priority === 'high' && t.status !== 'closed') acc.highPriority += 1
      return acc
    },
    { total: 0, open: 0, in_progress: 0, closed: 0, highPriority: 0 }
  )

  const { total, open, in_progress: inProgress, closed: resolved, highPriority } = stats

  if (isLoading) {
    return (
      <div className="empty-state">
        <svg className="spinner" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>
        <h3>Loading Dashboard</h3>
        <p>Please wait while we fetch your data...</p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="page-header">
        <div className="flex items-center gap-4">
          <div className="avatar">{user?.email?.charAt(0).toUpperCase()}</div>
          <div>
            <h1 className="page-title">Welcome back, {user?.email}</h1>
            <p className="page-description">Here's an overview of your support tickets</p>
          </div>
        </div>
        <Link to={{ pathname: "/tickets" }} state={{ action: 'create' }} className="button primary">
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          Create Ticket
        </Link>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="error-banner" role="alert">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {error.message}
        </div>
      )}

      {/* Stats Section */}
      <section className="section">
        <h2 className="section-title">Overview</h2>
        <div className="grid-4">
          <StatsCard
            value={total}
            label="Total Tickets"
            color="linear-gradient(135deg, #6366f1 0%, #4338ca 100%)"
            iconPath="M21 3h-6.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H3v18h18V3zm-9 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
          />
          <StatsCard
            value={open}
            label="Open"
            color="linear-gradient(135deg, #10b981 0%, #059669 100%)"
            iconPath="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"
          />
          <StatsCard
            value={inProgress}
            label="In Progress"
            color="linear-gradient(135deg, #eab308 0%, #ca8a04 100%)"
            iconPath="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
          />
          <StatsCard
            value={resolved}
            label="Resolved"
            color="linear-gradient(135deg, #475569 0%, #334155 100%)"
            iconPath="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section">
        <h2 className="section-title">Quick Actions</h2>

        <div className="card card-full">
          <div className="card-header">
            <h3 className="card-title">Manage Tickets</h3>
            <Link to="/tickets" className="button button-secondary">
              View All
            </Link>
          </div>
          <p>Access and update your support tickets from one place.</p>
          <div className="flex gap-4 mt-4">
            <div className="tag">Open Issues: {open}</div>
            <div className="tag">In Progress: {inProgress}</div>
          </div>
        </div>

        {highPriority > 0 && (
          <div className="card card-full" style={{ borderColor: 'var(--color-error)', borderWidth: '2px', marginTop: '1.5rem' }}>
            <div className="card-header">
              <h3 className="card-title">High Priority</h3>
              <div className="priority high">{highPriority} Active</div>
            </div>
            <p>These tickets require immediate attention.</p>
            <Link to="/tickets?priority=high" className="button" style={{ marginTop: '1rem', backgroundColor: 'var(--color-error)' }}>
              View High Priority
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
