import Landing from './pages/Landing.vue'
import Login from './pages/Auth/Login.vue'
import Signup from './pages/Auth/Signup.vue'
import Dashboard from './pages/Dashboard.vue'
import Tickets from './pages/Tickets.vue'

const routes = [
  { path: '/', component: Landing },
  { path: '/auth/login', component: Login },
  { path: '/auth/signup', component: Signup },
  { path: '/dashboard', component: Dashboard, meta: { auth: true } },
  { path: '/tickets', component: Tickets, meta: { auth: true } }
]

export default routes
