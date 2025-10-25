<template>
  <header class="site-header">
    <div class="container header-inner">
      <div class="brand">
        <router-link to="/" class="logo-link" aria-label="Ticket App Home">
          <strong class="app-name">Ticketr</strong>
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        :class="['mobile-menu-btn', { open: menuOpen }]"
        @click="toggleMenu"
        :aria-expanded="menuOpen"
        aria-controls="main-nav"
        aria-label="Toggle navigation menu"
      >
        <span class="sr-only">Menu</span>
        <span class="hamburger"></span>
      </button>

      <nav 
        id="main-nav" 
        :class="['main-nav', { open: menuOpen }]"
        aria-label="Main navigation"
      >
        <router-link 
          v-for="route in routes" 
          :key="route.path"
          :to="route.path"
          :class="{ active: currentPath === route.path }"
        >
          {{ route.name }}
        </router-link>
      </nav>

      <div class="header-actions">
        <template v-if="isAuthenticated">
          <span class="username" :title="session?.username">{{ session?.username }}</span>
          <button class="btn ghost" @click="handleLogout">Logout</button>
        </template>
        <template v-else>
          <router-link to="/auth/login" class="btn ghost">Login</router-link>
          <router-link to="/auth/signup" class="btn primary">Get Started</router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../hooks/useAuth'

const route = useRoute()
const router = useRouter()
const { isAuthenticated, session, logout } = useAuth()

const menuOpen = ref(false)
const currentPath = ref(route.path)

const routes = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/tickets', name: 'Tickets' }
]

// Watch route changes to close menu and update current path
watch(() => route.path, (newPath) => {
  menuOpen.value = false
  currentPath.value = newPath
})

// Handle escape key to close menu
const handleEscape = (e) => {
  if (e.key === 'Escape') menuOpen.value = false
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const handleLogout = async () => {
  await logout()
  router.push('/')
}
</script>

<style>
@import '../styles/header.css';
</style>
