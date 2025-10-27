<template>
  <main class="landing-page">
    <section class="hero">
      <div class="testimonial-ribbon animate-slide-up">
        <div class="container">
          <div class="testimonial-content">
            <div class="testimonial-stars">★★★★★</div>
            <p>"The most intuitive ticketing system we've ever used"</p>
            <span class="testimonial-author">- TechCrunch</span>
          </div>
        </div>
      </div>
      <div class="container hero-inner">
        <div class="hero-content">
          <h1 class="hero-title animate-slide-up">
            Manage support tickets with clarity and ease
            <small class="hero-badge">Trusted by 10,000+ teams worldwide</small>
          </h1>
          <p class="hero-sub animate-slide-up">
            Create, track, and resolve support tickets efficiently with our modern and accessible ticketing system.
          </p>
          <div class="hero-ctas animate-slide-up">
            <router-link to="/auth/signup" class="btn btn-primary">
              Create an account - Get started
            </router-link>
            <router-link to="/auth/login" class="btn btn-secondary">
              Sign in to dashboard
            </router-link>
          </div>
        </div>

        <div class="hero-graphic">
          <div class="demo-card-container animate-slide-up">
            <div class="demo-card">
              <div class="demo-header">
                <div class="demo-browser-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div class="demo-preview">
                <div class="demo-sidebar">
                  <div class="demo-nav-item active"></div>
                  <div class="demo-nav-item"></div>
                  <div class="demo-nav-item"></div>
                </div>

                <div class="demo-content">
                  <div class="demo-stats">
                    <div class="stat-card">
                      <div class="stat-icon success"></div>
                      <div class="stat-content">
                        <div class="stat-text">
                          <div class="stat-label">Resolution Rate</div>
                          <div class="stat-value">98.5%</div>
                        </div>
                        <div class="stat-trend positive">↑ 12%</div>
                      </div>
                    </div>
                    <div class="stat-card">
                      <div class="stat-icon warning"></div>
                      <div class="stat-content">
                        <div class="stat-text">
                          <div class="stat-label">Response Time</div>
                          <div class="stat-value">1.8m</div>
                        </div>
                        <div class="stat-trend negative">↓ 30s</div>
                      </div>
                    </div>
                  </div>

                  <div class="demo-table">
                    <div class="table-row">
                      <span class="priority high">High</span>
                      <span class="ticket-title">Payment gateway integration issue</span>
                      <span class="ticket-time">2m ago</span>
                    </div>
                    <div class="table-row">
                      <span class="priority medium">Medium</span>
                      <span class="ticket-title">Update user profile settings</span>
                      <span class="ticket-time">15m ago</span>
                    </div>
                    <div class="table-row">
                      <span class="priority low">Low</span>
                      <span class="ticket-title">Add new team member</span>
                      <span class="ticket-time">1h ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-circle circle-1" aria-hidden="true"></div>
      <div class="hero-circle circle-2" aria-hidden="true"></div>
    </section>

    <section class="why-choose-us">
      <div class="container">
        <div class="section-header">
          <h2>Why teams choose us</h2>
          <p>Built with the features your support team needs</p>
        </div>
        
        <div class="benefits-grid">
          <div class="benefit-card animate-slide-up">
            <div class="benefit-number">01</div>
            <h3>Easy Integration</h3>
            <p>Connect with your favorite tools through our extensive API and webhook support</p>
          </div>
          
          <div class="benefit-card animate-slide-up">
            <div class="benefit-number">02</div>
            <h3>Smart Automation</h3>
            <p>Automate repetitive tasks and focus on what matters with our powerful workflow engine</p>
          </div>
          
          <div class="benefit-card animate-slide-up">
            <div class="benefit-number">03</div>
            <h3>Detailed Analytics</h3>
            <p>Make data-driven decisions with comprehensive reporting and insights</p>
          </div>
          
          <div class="benefit-card animate-slide-up">
            <div class="benefit-number">04</div>
            <h3>Enterprise Security</h3>
            <p>Rest easy with SOC2 compliance, SSO, and end-to-end encryption</p>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <div class="section-header">
          <h2>Designed for modern teams</h2>
          <p>Everything you need to provide exceptional customer support</p>
        </div>

        <div class="feature-grid">
          <div class="feature-card animate-slide-up">
            <div class="feature-icon">
              <RocketIcon />
            </div>
            <h3>Lightning Fast</h3>
            <p>Get started in minutes with our intuitive interface and quick setup process</p>
          </div>

          <div class="feature-card animate-slide-up">
            <div class="feature-icon">
              <ChartIcon />
            </div>
            <h3>Real-time Updates</h3>
            <p>Stay informed with instant notifications and live status tracking</p>
          </div>

          <div class="feature-card animate-slide-up">
            <div class="feature-icon">
              <HeartIcon />
            </div>
            <h3>Built for Everyone</h3>
            <p>Fully accessible interface with keyboard navigation and screen reader support</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-content animate-slide-up">
          <h2>Ready to streamline your support?</h2>
          <p>Join thousands of teams already using our platform to deliver better support.</p>
          <router-link to="/auth/signup" class="btn btn-primary">
            Start your free trial
          </router-link>
          <small class="cta-guarantee">No credit card required · 14-day free trial · Cancel anytime</small>
        </div>

        <div class="trust-badges animate-slide-up">
          <div class="trust-badge">
            <img src="@/shared-assets/badge-gdpr.svg" alt="GDPR Compliant" />
            <span>GDPR Compliant</span>
          </div>
          <div class="trust-badge">
            <img src="@/shared-assets/badge-soc2.svg" alt="SOC2 Type II" />
            <span>SOC2 Type II</span>
          </div>
          <div class="trust-badge">
            <img src="@/shared-assets/badge-iso.svg" alt="ISO 27001" />
            <span>ISO 27001</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import heroWave from '@/shared-assets/hero-wave.svg';
import { RocketIcon, ChartIcon, HeartIcon } from '../components/icons';
</script>

<style>
@import '../styles/landing.css';
</style>
