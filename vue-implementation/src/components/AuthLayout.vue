<template>
  <div class="auth-page">
    <div class="auth-card">
      <div v-if="showLogo" class="auth-logo">
        <router-link to="/">
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
        </router-link>
      </div>

      <div class="auth-header">
        <h1>{{ title }}</h1>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
  showLogo: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: var(--bg-secondary);
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: var(--bg);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
}

.auth-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.auth-logo a {
  color: var(--text);
  transition: color 0.2s;
}

.auth-logo a:hover {
  color: var(--accent);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}
</style>