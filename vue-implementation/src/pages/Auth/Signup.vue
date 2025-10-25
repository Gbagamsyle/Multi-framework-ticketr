<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <h1>Create Account</h1>
        <p>Create a new account to manage your tickets.</p>
      </div>
      <form @submit.prevent="handle" class="auth-form">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" />
        </div>
        <div>
          <button class="btn-submit btn primary">Create Account</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { signup } from '../../lib/api'
import { toast } from '../../lib/toast'
export default {
  data(){ return { email:'', password:'' } },
  methods:{
    async handle(){
      try{ await signup({ email: this.email, password: this.password }); this.$router.push('/dashboard') }
  catch(e){ toast('Failed to signup', 'error') }
    }
  }
}
</script>

<style scoped>
.auth{max-width:420px;margin:2rem auto}
.btn.primary{background:#6366f1;color:#fff}
</style>
