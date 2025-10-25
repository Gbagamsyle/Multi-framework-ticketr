import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/context'
import '../styles/header.css'

export default function Header(){
  const { isAuthenticated, session, logout } = useContext(AuthContext)
  const nav = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleLogout = async () => {
    await logout()
    nav('/')
  }

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <Link to="/" className="logo-link" aria-label="Ticket App Home">
            <strong className="app-name">Ticketr</strong>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label="Toggle navigation menu"
        >
          <span className="sr-only">Menu</span>
          <span className="hamburger"></span>
        </button>

        <nav 
          id="main-nav" 
          className={`main-nav ${menuOpen ? 'open' : ''}`} 
          aria-label="Main navigation"
        >
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
            Dashboard
          </Link>
          <Link to="/tickets" className={location.pathname === '/tickets' ? 'active' : ''}>
            Tickets
          </Link>
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <span className="username" title={session?.username}>{session?.username}</span>
              <button className="btn ghost" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="btn ghost">Login</Link>
              <Link to="/auth/signup" className="btn primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
