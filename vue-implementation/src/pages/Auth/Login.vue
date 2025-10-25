<template>
  <AuthLayout 
    title="Welcome back" 
    subtitle="Please sign in to your account to continue"
  >
    <form class="auth-form" @submit.prevent="handleSubmit">
      <div v-if="errors.general" class="auth-alert error" role="alert">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>{{ errors.general }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email address</label>
        <div class="input-with-icon">
          <input
            id="email"
            type="email"
            :class="['with-icon-left', { error: errors.email }]"
            placeholder="you@example.com"
            v-model="form.email"
            :disabled="isLoading"
            autocomplete="email"
            autofocus
          />
          <span class="input-icon left" aria-hidden="true">
            <EmailIcon />
          </span>
        </div>
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <div class="flex justify-between items-center">
          <label for="password">Password</label>
          <router-link to="/auth/forgot-password" class="text-sm text-accent hover:text-accent-hover">
            Forgot password?
          </router-link>
        </div>
        <div class="input-with-icon">
          <input
            id="password"
            type="password"
            :class="['with-icon-left', { error: errors.password }]"
            placeholder="••••••••"
            v-model="form.password"
            :disabled="isLoading"
            autocomplete="current-password"
          />
          <span class="input-icon left" aria-hidden="true">
            <LockIcon />
          </span>
        </div>
        <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
      </div>

      <button 
        type="submit" 
        class="btn-submit"
        :disabled="isLoading"
      >
        <span class="flex items-center justify-center gap-2">
          <Spinner v-if="isLoading" />
          <span>{{ isLoading ? 'Signing in...' : 'Sign in' }}</span>
        </span>
      </button>

      <div class="auth-footer">
        Don't have an account?{' '}
        <router-link to="/auth/signup">Sign up for free</router-link>
      </div>
    </form>
  </AuthLayout>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '../../hooks/useAuth';
import { toast } from '../../lib/toast';
import AuthLayout from '../../components/AuthLayout.vue';
import EmailIcon from '../../components/icons/EmailIcon.vue';
import LockIcon from '../../components/icons/LockIcon.vue';
import Spinner from '../../components/Spinner.vue';

const router = useRouter();
const route = useRoute();
const { login } = useAuth();

const isLoading = ref(false);
const form = reactive({
  email: '',
  password: ''
});
const errors = reactive({});

const validate = () => {
  const newErrors = {};
  
  if (!form.email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = 'Please enter a valid email';
  }
  
  if (!form.password) {
    newErrors.password = 'Password is required';
  }
  
  return newErrors;
};

const handleSubmit = async () => {
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    Object.assign(errors, validationErrors);
    return;
  }

  isLoading.value = true;
  Object.assign(errors, {});

  try {
    await login(form);
    toast('Welcome back!', 'success');
    const redirect = route.query.redirect || '/dashboard';
    router.push(redirect);
  } catch (error) {
    toast(error.message || 'Invalid credentials', 'error');
    errors.general = error.message || 'Invalid credentials';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
@import '../../styles/auth.css';
@import '../../styles/forms.css';

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-with-icon {
  position: relative;
}

.input-with-icon input {
  width: 100%;
  padding: 0.625rem 0.75rem;
  padding-left: 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.input-with-icon input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  outline: none;
}

.input-with-icon input.error {
  border-color: var(--color-error);
}

.input-with-icon .input-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
}

.input-with-icon .input-icon.left {
  left: 0.75rem;
}

.error-message {
  color: var(--color-error);
  font-size: 0.875rem;
}

.btn-submit {
  width: 100%;
  padding: 0.625rem 1.25rem;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-submit:hover {
  background: var(--accent-hover);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-footer {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.auth-footer a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
}

.auth-footer a:hover {
  color: var(--accent-hover);
}

.auth-alert {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.auth-alert.error {
  background: rgba(220,38,38,0.1);
  color: var(--color-error);
  border: 1px solid rgba(220,38,38,0.2);
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.gap-2 {
  gap: 0.5rem;
}

.text-sm {
  font-size: 0.875rem;
}

.text-accent {
  color: var(--accent);
}

.hover\:text-accent-hover:hover {
  color: var(--accent-hover);
}
</style>
