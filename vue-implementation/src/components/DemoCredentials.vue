<template>
  <div class="demo-credentials card card-md">
    <div class="card-header">
      <h3 class="card-title">Demo Credentials</h3>
    </div>
    <div class="card-body">
      <div class="credential-item">
        <label>Email</label>
        <div class="credential-value">
          <code>test@example.com</code>
          <button
            class="copy-btn"
            @click="copy('demo@example.com')"
            title="Copy email"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
        </div>
      </div>
      <div class="credential-item">
        <label>Password</label>
        <div class="credential-value">
          <code>Password123!</code>
          <button
            class="copy-btn"
            @click="copy('Password123!')"
            title="Copy password"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// copy helper: use navigator.clipboard if available
const copy = async (text) => {
  try {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  } catch (e) {
    console.warn('copy failed', e);
  }
};
</script>

<style scoped>
.demo-credentials {
  width: 280px;
  background: var(--bg);
  border: 1px solid var(--border-color);
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -40%);
  z-index: 2;
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  animation: float 6s ease-in-out infinite;
}

.card-header {
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.credential-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.credential-item label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.credential-value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-secondary);
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
}

.credential-value code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.875rem;
  color: var(--text);
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.copy-btn:hover {
  color: var(--accent);
  background: rgba(99, 102, 241, 0.1);
}

.copy-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

@keyframes float {
  0% {
    transform: translate(-50%, -40%);
  }
  50% {
    transform: translate(-50%, -45%);
  }
  100% {
    transform: translate(-50%, -40%);
  }
}
</style>
