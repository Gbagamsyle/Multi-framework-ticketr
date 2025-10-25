<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div>© {{ year }} TicketApp</div>
      <div class="muted">Accessible & responsive</div>
    </div>
  </footer>
</template>

<script>
export default { data(){ return { year: new Date().getFullYear() } } }
</script>

<style scoped>
.site-footer{border-top:1px solid rgba(0,0,0,0.05);padding:1rem 0}
</style>
