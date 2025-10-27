import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { pushToast } from '../lib/toast'
import '../styles/header.css'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      pushToast({ msg: 'Logged out successfully', type: 'success' })
      navigate('/')
    } catch (err) {
      pushToast({ msg: 'Failed to logout', type: 'error' })
    }
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <Link to="/" className="logo-link">
            <strong>Ticketr</strong>
          </Link>
        </div>

        <nav className="main-nav">
          <Link to="/" className="nav-link">Home</Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/tickets" className="nav-link">Tickets</Link>
            </>
          )}
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <span className="username">{user?.username || user?.email}</span>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="login-link">Login</Link>
              <Link to="/auth/signup" className="btn-get-started">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
