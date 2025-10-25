import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

export default function AuthLayout({ children, title, subtitle, showLogo = true }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        {showLogo && (
          <div className="auth-logo">
            <Link to="/">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8v8m-4-4h8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        )}

        <div className="auth-header">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>

        {children}
      </div>
    </div>
  );
}
