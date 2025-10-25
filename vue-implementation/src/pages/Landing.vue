<template>
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-content">
        <h1>TicketApp — Track issues with clarity</h1>
        <p>Create, manage and resolve tickets with an easy interface.</p>
        <div>
          <router-link to="/auth/login" class="btn ghost">Login</router-link>
          <router-link to="/auth/signup" class="btn primary">Get Started</router-link>
        </div>
      </div>
      <div class="hero-decor">
        <img src="/shared-assets/circle-decor.svg" alt="Decorative" />
      </div>
    </div>
    <div class="hero-wave"><img :src="heroWave" alt="Wave" /></div>
  </section>
</template>

<script>
import heroWave from '../../../shared-assets/hero-wave.svg'

export default {
  data() {
    return { heroWave }
  }
}
</script>

<style scoped>
.hero{padding:2rem 0}
.hero-wave img{width:100%}
.hero-inner{display:flex;justify-content:space-between;align-items:center}
.btn{margin-right:.5rem}
@media(max-width:800px){.hero-inner{flex-direction:column}}
</style>
