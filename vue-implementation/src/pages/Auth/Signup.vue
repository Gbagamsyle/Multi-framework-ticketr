<template>
  <div class="auth">
    <h2>Create Account</h2>
    <form @submit.prevent="handle">
      <div>
        <label>Email</label>
        <input v-model="email" type="email" />
      </div>
      <div>
        <label>Password</label>
        <input v-model="password" type="password" />
      </div>
      <div>
        <button class="btn primary">Create Account</button>
      </div>
    </form>
  </div>
</template>

<script>
import { signup } from '../../lib/api'
export default {
  data(){ return { email:'', password:'' } },
  methods:{
    async handle(){
      try{ await signup({ email: this.email, password: this.password }); location.href = '/dashboard' }
      catch(e){ alert('Failed to signup') }
    }
  }
}
</script>

<style scoped>
.auth{max-width:420px;margin:2rem auto}
.btn.primary{background:#6366f1;color:#fff}
</style>
