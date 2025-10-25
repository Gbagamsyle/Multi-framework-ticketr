import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div style={{ padding: '4rem 1rem' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h1>404 — Page not found</h1>
        <p>The page you're looking for doesn't exist or has moved.</p>
        <p>
          <Link to="/" className="btn ghost">Return to Home</Link>
          <Link to="/auth/login" className="btn primary" style={{ marginLeft: 8 }}>Login</Link>
        </p>
      </div>
    </div>
  )
}
