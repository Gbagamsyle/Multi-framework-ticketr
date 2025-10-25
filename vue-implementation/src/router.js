import { defineAsyncComponent } from 'vue'

// Lazy load components
const Landing = defineAsyncComponent(() => import('./pages/Landing.vue'))
const Login = defineAsyncComponent(() => import('./pages/Auth/Login.vue'))
const Signup = defineAsyncComponent(() => import('./pages/Auth/Signup.vue'))
const Dashboard = defineAsyncComponent(() => import('./pages/Dashboard.vue'))
const Tickets = defineAsyncComponent(() => import('./pages/Tickets.vue'))

const routes = [
  { 
    path: '/',
    name: 'home',
    component: Landing,
  },
  { 
    path: '/auth/login',
    name: 'login',
    component: Login
  },
  { 
    path: '/auth/signup',
    name: 'signup',
    component: Signup
  },
  { 
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { auth: true }
  },
  { 
    path: '/tickets',
    name: 'tickets',
    component: Tickets,
    meta: { auth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

export default routes
