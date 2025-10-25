<template>
  <footer class="site-footer" role="contentinfo">
    <div class="container footer-inner">
      <div class="footer-left">© {{ year }} Ticketr</div>
      <div class="footer-right">Accessible · Responsive · Lightweight</div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style>
@import '../styles/components.css';
</style>
