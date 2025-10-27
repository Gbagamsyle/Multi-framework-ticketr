import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.new.css';

import badgeGdpr from '../shared-asset/badge-gdpr.svg';
import badgeSoc2 from '../shared-asset/badge-soc2.svg';
import badgeIso from '../shared-asset/badge-iso.svg';

const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 2c.6 0 1.2.2 1.7.6l6.7 6.7c.4.4.6 1 .6 1.7 0 3.6-2.7 8.3-6.1 11.7-3.4-3.4-8.1-6.1-11.7-6.1-.7 0-1.3-.2-1.7-.6L2.6 13.7C2.2 13.2 2 12.6 2 12c0-5.5 4.5-10 10-10z" fill="currentColor"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 13v6M12 7v12M17 10v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M20.8 7.2c0 5.6-8 10.6-8 10.6S4.8 12.8 4.8 7.2C4.8 5 6.2 3.6 8.4 3.6c1.4 0 2.8.8 3.6 1.9.8-1.1 2.2-1.9 3.6-1.9 2.2 0 3.6 1.4 3.6 3.6z" fill="currentColor"/>
  </svg>
);

export default function LandingPage() {
  return (
    <main className="landing-page">
      <section className="hero">
        <div className="testimonial-ribbon animate-slide-up">
          <div className="container">
            <div className="testimonial-content">
              <div className="testimonial-stars">★★★★★</div>
              <p>"The most intuitive ticketing system we've ever used"</p>
              <span className="testimonial-author">- TechCrunch</span>
            </div>
          </div>
        </div>

        <div className="container hero-inner">
          <div className="hero-content">
            <h1 className="hero-title animate-slide-up">
              Manage support tickets with clarity and ease
              <small className="hero-badge">Trusted by 10,000+ teams worldwide</small>
            </h1>

            <p className="hero-sub animate-slide-up">
              Create, track, and resolve support tickets efficiently with our modern and accessible ticketing system.
            </p>

            <div className="hero-ctas animate-slide-up">
              <Link to="/auth/signup" className="btn btn-primary">
                Create an account - Get started
              </Link>
              <Link to="/auth/login" className="btn btn-secondary">
                Sign in to dashboard
              </Link>
            </div>
          </div>

          <div className="hero-graphic">
            <div className="demo-card-container animate-slide-up">
              <div className="demo-card">
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
                          <div className="stat-text">
                            <div className="stat-label">Resolution Rate</div>
                            <div className="stat-value">98.5%</div>
                          </div>
                          <div className="stat-trend positive">↑ 12%</div>
                        </div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-icon warning"></div>
                        <div className="stat-content">
                          <div className="stat-text">
                            <div className="stat-label">Response Time</div>
                            <div className="stat-value">1.8m</div>
                          </div>
                          <div className="stat-trend negative">↓ 30s</div>
                        </div>
                      </div>
                    </div>

                    <div className="demo-table">
                      <div className="table-row">
                        <span className="priority high">High</span>
                        <span className="ticket-title">Payment gateway integration issue</span>
                        <span className="ticket-time">2m ago</span>
                      </div>
                      <div className="table-row">
                        <span className="priority medium">Medium</span>
                        <span className="ticket-title">Update user profile settings</span>
                        <span className="ticket-time">15m ago</span>
                      </div>
                      <div className="table-row">
                        <span className="priority low">Low</span>
                        <span className="ticket-title">Add new team member</span>
                        <span className="ticket-time">1h ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-circle circle-1" aria-hidden="true"></div>
        <div className="hero-circle circle-2" aria-hidden="true"></div>
      </section>

      <section className="why-choose-us">
        <div className="container">
          <div className="section-header">
            <h2>Why teams choose us</h2>
            <p>Built with the features your support team needs</p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card animate-slide-up">
              <div className="benefit-number">01</div>
              <h3>Easy Integration</h3>
              <p>Connect with your favorite tools through our extensive API and webhook support</p>
            </div>

            <div className="benefit-card animate-slide-up">
              <div className="benefit-number">02</div>
              <h3>Smart Automation</h3>
              <p>Automate repetitive tasks and focus on what matters with our powerful workflow engine</p>
            </div>

            <div className="benefit-card animate-slide-up">
              <div className="benefit-number">03</div>
              <h3>Detailed Analytics</h3>
              <p>Make data-driven decisions with comprehensive reporting and insights</p>
            </div>

            <div className="benefit-card animate-slide-up">
              <div className="benefit-number">04</div>
              <h3>Enterprise Security</h3>
              <p>Rest easy with SOC2 compliance, SSO, and end-to-end encryption</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Designed for modern teams</h2>
            <p>Everything you need to provide exceptional customer support</p>
          </div>

          <div className="feature-grid">
            <div className="feature-card animate-slide-up">
              <div className="feature-icon"><RocketIcon /></div>
              <h3>Lightning Fast</h3>
              <p>Get started in minutes with our intuitive interface and quick setup process</p>
            </div>

            <div className="feature-card animate-slide-up">
              <div className="feature-icon"><ChartIcon /></div>
              <h3>Real-time Updates</h3>
              <p>Stay informed with instant notifications and live status tracking</p>
            </div>

            <div className="feature-card animate-slide-up">
              <div className="feature-icon"><HeartIcon /></div>
              <h3>Built for Everyone</h3>
              <p>Fully accessible interface with keyboard navigation and screen reader support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content animate-slide-up">
            <h2>Ready to streamline your support?</h2>
            <p>Join thousands of teams already using our platform to deliver better support.</p>
            <Link to="/auth/signup" className="btn btn-primary">
              Start your free trial
            </Link>
            <small className="cta-guarantee">No credit card required · 14-day free trial · Cancel anytime</small>
          </div>

          <div className="trust-badges animate-slide-up">
            <div className="trust-badge">
              <img src={badgeGdpr} alt="GDPR Compliant" />
              <span>GDPR Compliant</span>
            </div>
            <div className="trust-badge">
              <img src={badgeSoc2} alt="SOC2 Type II" />
              <span>SOC2 Type II</span>
            </div>
            <div className="trust-badge">
              <img src={badgeIso} alt="ISO 27001" />
              <span>ISO 27001</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
