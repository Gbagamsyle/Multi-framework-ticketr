<template>
  <div class="auth-page">
    <div class="auth-card">
        <div class="auth-header">
          <h1>Create Account</h1>
          <p>Create a new account to manage your tickets.</p>
        </div>
        <form @submit.prevent="handle" class="auth-form">
          <div class="form-group">
            <label for="name">Full name</label>
            <input id="name" v-model="name" type="text" placeholder="Jane Doe" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email" placeholder="you@company.com" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password" placeholder="At least 8 characters" />
          </div>

          <div v-if="error" class="form-error" role="alert">{{ error }}</div>

          <div class="actions">
            <button :disabled="loading" class="btn-submit btn primary">
              {{ loading ? 'Creating...' : 'Create Account' }}
            </button>
            <router-link to="/auth/login" class="btn ghost link-login">Have an account? Sign in</router-link>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
import { signup } from '../../lib/api'
import { toast } from '../../lib/toast'
export default {
  data(){ return { name: '', email:'', password:'', error: null, loading: false } },
  methods:{
    async handle(){
      this.error = null
      if(!this.name || !this.email || !this.password){
        this.error = 'Please fill in all fields.'
        return
      }
      if(this.password.length < 8){
        this.error = 'Password must be at least 8 characters.'
        return
      }

      this.loading = true
      try{
        await signup({ name: this.name, email: this.email, password: this.password })
        toast('Account created. Redirecting...', 'success')
        this.$router.push('/dashboard')
      }catch(e){
        this.error = e.message || 'Failed to signup'
        toast(this.error, 'error')
      }finally{
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.auth-page{min-height:80vh;display:flex;align-items:center;justify-content:center;padding:2rem}
.auth-card{width:100%;max-width:420px;background:var(--bg);border:1px solid var(--border-color);border-radius:12px;padding:1.5rem;box-shadow:var(--shadow-md)}
.auth-header h1{font-size:1.5rem;margin-bottom:0.25rem;color:var(--text)}
.auth-header p{color:var(--text-secondary);margin-bottom:1rem}
.auth-form{display:flex;flex-direction:column;gap:1rem}
.form-group{display:flex;flex-direction:column;gap:0.375rem}
.form-group label{font-size:0.875rem;font-weight:600;color:var(--text)}
.form-group input{padding:0.65rem;border-radius:8px;border:1px solid var(--border-color);background:rgba(99,102,241,0.06);font-size:0.95rem}
.form-error{color:var(--color-error);background:rgba(220,38,38,0.05);padding:0.5rem;border-radius:8px;border:1px solid rgba(220,38,38,0.08)}
.actions{display:flex;flex-direction:column;gap:0.75rem;margin-top:0.5rem}
.btn{padding:0.75rem;border-radius:10px;border:1px solid transparent;cursor:pointer}
.btn.primary{background:linear-gradient(90deg,var(--accent),var(--accent-hover));color:#fff}
.btn.primary[disabled]{opacity:0.6;cursor:not-allowed}
.btn.ghost{background:transparent;border-color:transparent;color:var(--text)}
.link-login{text-align:center;font-size:0.9rem;color:var(--text-secondary)}

@media (max-width:640px){
  .auth-card{padding:1rem;margin:1rem}
}
</style>
