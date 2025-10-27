import React from 'react';
import { Link } from 'react-router-dom';
import heroWave from '../../../shared-assets/hero-wave.svg';
import '../styles/global.css';
import '../styles/header.css';
import '../styles/footer.css';
import '../styles/landing.css';

const RocketIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const HeartIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export default function Landing() {
  return (
    <main className="landing-page">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <h1 className="hero-title">
              Manage support tickets with clarity and ease
            </h1>
            <p className="hero-sub">
              Create, track, and resolve support tickets efficiently with our 
              modern and accessible ticketing system.
            </p>
            <div className="hero-ctas">
              <Link to="/auth/signup" className="btn btn-primary" aria-label="Create an account - Get started">
                Get started for free
              </Link>
              <Link to="/auth/login" className="btn btn-secondary" aria-label="Sign in to dashboard">
                Sign in to dashboard
              </Link>

              {/* small trust badges row */}
              <div className="trust-badges" aria-hidden="true">
                <span className="badge">GDPR</span>
                <span className="badge">ISO 27001</span>
                <span className="badge">SOC 2</span>
              </div>
            </div>
          </div>

          <div className="hero-graphic" aria-hidden="false">
            <div className="demo-card-container animate-slide-up">
              <div className="demo-card card card-lg">
                <div className="demo-header">
                  <div className="demo-browser-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="demo-preview">
                  <div className="demo-sidebar">
                    <div className="demo-nav-item active"></div>
                    <div className="demo-nav-item"></div>
                    <div className="demo-nav-item"></div>
                  </div>
                  <div className="demo-content">
                    <div className="demo-stats">
                      <div className="stat-card">
                        <div className="stat-icon success"></div>
                        <div className="stat-content">
                          <div className="stat-label"></div>
                          <div className="stat-value"></div>
                        </div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-icon warning"></div>
                        <div className="stat-content">
                          <div className="stat-label"></div>
                          <div className="stat-value"></div>
                        </div>
                      </div>
                    </div>
                    <div className="demo-table">
                      <div className="table-row"></div>
                      <div className="table-row"></div>
                      <div className="table-row"></div>
                    </div>
                  </div>
                </div>
                {/* demo credentials removed for production/demo clarity */}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative circles that overlap the hero - purely decorative */}
        <div className="hero-circle circle-1" aria-hidden="true"></div>
        <div className="hero-circle circle-2" aria-hidden="true"></div>

        <div className="hero-wave" aria-hidden="true">
          <img src={heroWave} alt="" />
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Everything you need to manage tickets</h2>
            <p>Streamline your support process with powerful yet simple tools</p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <RocketIcon />
              </div>
              <h3>Quick Setup</h3>
              <p>Get started in minutes with an intuitive onboarding process and helpful guides</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <ChartIcon />
              </div>
              <h3>Smart Workflow</h3>
              <p>Track ticket status, priority, and progress with visual indicators and filters</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <HeartIcon />
              </div>
              <h3>Built for Everyone</h3>
              <p>Accessible by design with keyboard navigation, screen readers, and high contrast</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to get started?</h2>
            <p>Join thousands of teams already managing their support tickets more efficiently.</p>
            <Link to="/auth/signup" className="btn-primary">
              Create your account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
