<template>
  <main class="landing-page">
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <h1 class="hero-title animate-slide-up">
            Manage support tickets with clarity and ease
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
                        <div class="stat-label"></div>
                        <div class="stat-value"></div>
                      </div>
                    </div>
                    <div class="stat-card">
                      <div class="stat-icon warning"></div>
                      <div class="stat-content">
                        <div class="stat-label"></div>
                        <div class="stat-value"></div>
                      </div>
                    </div>
                  </div>

                  <div class="demo-table">
                    <div class="table-row"></div>
                    <div class="table-row"></div>
                    <div class="table-row"></div>
                  </div>
                </div>
              </div>
            </div>
            <DemoCredentials class="demo-overlay" />
          </div>
        </div>
      </div>

      <div class="hero-circle circle-1" aria-hidden="true"></div>
      <div class="hero-circle circle-2" aria-hidden="true"></div>
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
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import heroWave from '@/shared-assets/hero-wave.svg';
import DemoCredentials from '@/components/DemoCredentials.vue';
import { RocketIcon, ChartIcon, HeartIcon } from '../components/icons';
</script>

<style>
@import '../styles/landing.css';
</style>
