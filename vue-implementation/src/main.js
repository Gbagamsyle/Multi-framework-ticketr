import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './router'

// Import styles
import './styles/normalize.css'
import './styles/global.css'
import './styles/forms.css'
import './styles/buttons.css'
import './styles/card.css'
import './styles/table.css'
import './styles/modal.css'
import './styles/animations.css'
import './styles/dashboard.css'
import './styles/auth.css'
import './styles/header.css'
import './styles/footer.css'
import './styles/landing.css'

// Configure router
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

// Auth guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta && to.meta.auth
  
  // Allow non-auth routes
  if (!requiresAuth) {
    return next()
  }

  try {
    // Check session
    const session = JSON.parse(localStorage.getItem('ticketapp_session'))
    const isValidSession = session && session.expiresAt > Date.now()
    
    if (isValidSession) {
      // Session valid, allow navigation
      return next()
    }
    
    // Clear invalid session
    localStorage.removeItem('ticketapp_session')
    
    // Redirect to login with return path
    return next({ 
      path: '/auth/login',
      query: { redirect: to.fullPath }
    })
  } catch(e) {
    console.error('Auth check failed:', e)
    localStorage.removeItem('ticketapp_session')
    return next({ 
      path: '/auth/login',
      query: { redirect: to.fullPath }
    })
  }
})

// Create and mount app
const app = createApp(App)

// Error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err)
  console.error('Component:', vm)
  console.error('Info:', info)
}

app.use(router)

// Mount with error handling
try {
  app.mount('#app')
} catch (e) {
  console.error('Failed to mount app:', e)
}
