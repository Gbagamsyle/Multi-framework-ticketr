<template>
  <div>
    <Header />
    <main class="container">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default { components: { Header, Footer } }
</script>

<style>
/* small reset to keep parity with React implementation */
:root { --max-w: 1440px }
.container { max-width: var(--max-w); margin: 0 auto; padding: 1.25rem }
</style>
