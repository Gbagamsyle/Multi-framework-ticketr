<template>
  <slot></slot>
</template>

<script setup>
import { provide, readonly, ref, computed } from 'vue';
import * as api from '../lib/api';
import { toast } from '../lib/toast';

// Reactive state
const session = ref(null);
const isLoading = ref(true);

// Initialize session from localStorage
try {
  const stored = JSON.parse(localStorage.getItem('ticketapp_session'));
  if (stored && stored.expiresAt > Date.now()) {
    session.value = stored;
  }
} catch (e) {
  console.warn('Failed to parse stored session:', e.message);
} finally {
  isLoading.value = false;
}

// Auth methods
const login = async (credentials) => {
  isLoading.value = true;
  try {
    const result = await api.login(credentials);
    session.value = result;
    return result;
  } finally {
    isLoading.value = false;
  }
};

const signup = async (credentials) => {
  isLoading.value = true;
  try {
    const result = await api.signup(credentials);
    session.value = result;
    return result;
  } finally {
    isLoading.value = false;
  }
};

const logout = async () => {
  isLoading.value = true;
  try {
    await api.logout();
    session.value = null;
    toast('Logged out successfully', 'success');
  } catch (error) {
    toast('Error logging out', 'error');
    console.error('Logout error:', error);
  } finally {
    isLoading.value = false;
  }
};

// Computed state
const isAuthenticated = () => {
  return Boolean(session.value?.token && session.value?.expiresAt > Date.now());
};

// Provide auth context
provide('auth', {
  session: readonly(session),
  isLoading: readonly(isLoading),
  isAuthenticated,
  login,
  signup,
  logout
});
</script>