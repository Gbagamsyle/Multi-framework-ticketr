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
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
      >
        <span class="sr-only">Menu</span>
        <span class="hamburger"></span>
      </button>

      <!-- Desktop nav (kept as-is) -->
      <nav
        id="main-nav"
        class="main-nav"
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

      <!-- Mobile full-screen overlay menu -->
      <div
        v-if="menuOpen"
        id="mobile-menu"
        class="mobile-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div class="mobile-overlay-backdrop" @click="menuOpen = false" aria-hidden="true"></div>
        <div class="mobile-overlay-panel" role="document">
          <button class="mobile-close" @click="menuOpen = false" aria-label="Close menu">✕</button>
          <nav class="mobile-nav">
            <router-link
              v-for="route in routes"
              :key="route.path"
              :to="route.path"
              @click.native="menuOpen = false"
              :class="{ active: currentPath === route.path }"
            >
              {{ route.name }}
            </router-link>
          </nav>

          <div class="mobile-actions">
            <template v-if="isAuthenticated">
              <span class="username" :title="session?.username">{{ session?.username }}</span>
              <button class="btn ghost" @click="handleLogout">Logout</button>
            </template>
            <template v-else>
              <router-link to="/auth/login" class="btn ghost" @click.native="menuOpen = false">Login</router-link>
              <router-link to="/auth/signup" class="btn primary" @click.native="menuOpen = false">Get Started</router-link>
            </template>
          </div>
        </div>
      </div>

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
