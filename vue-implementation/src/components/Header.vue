<template>
  <header class="site-header">
    <div class="container header-inner">
      <div class="brand"><router-link to="/" class="app-name">TicketApp</router-link></div>
      <nav class="main-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/tickets">Tickets</router-link>
      </nav>
      <div class="header-actions">
        <button v-if="authenticated" @click="logout" class="btn ghost">Logout</button>
        <router-link v-else to="/auth/login" class="btn ghost">Login</router-link>
        <router-link v-else to="/auth/signup" class="btn primary">Get Started</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import { logout as apiLogout } from '../lib/api'

export default {
  setup(){
    const authenticated = ref(Boolean(JSON.parse(localStorage.getItem('ticketapp_session'))))
    const logout = async ()=>{ await apiLogout(); authenticated.value = false; location.href = '/' }
    return { authenticated, logout }
  }
}
</script>

<style scoped>
.site-header{border-bottom:1px solid rgba(0,0,0,0.05);background:#fff}
.header-inner{display:flex;align-items:center;justify-content:space-between}
.btn{padding:.4rem .6rem;border-radius:8px}
.btn.primary{background:#6366f1;color:#fff}
</style>
