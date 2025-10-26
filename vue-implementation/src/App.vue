<template>
  <AuthProvider>
    <TicketProvider>
      <div id="app" class="app" data-debug="true">
        <Header />
        <main>
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </main>
        <Footer />
        <Toast />
        <!-- Simple debug overlay: shows current route info when router is available -->
        <div class="debug-overlay" v-if="$route">
          <strong>DEBUG</strong>
          <div>route: {{ $route.name || $route.path }}</div>
          <div>fullPath: {{ $route.fullPath }}</div>
        </div>
      </div>
    </TicketProvider>
  </AuthProvider>
</template>

<script setup>
import { onMounted } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Toast from './components/Toast.vue';
import AuthProvider from './components/AuthProvider.vue';
import TicketProvider from './components/TicketProvider.vue';

onMounted(() => {
  console.log('App mounted');
});
</script>

<style>
@import './styles/global.css';
@import './styles/utils.css';
@import './styles/components.css';
@import './styles/animations.css';

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
}

main {
  flex: 1;
  width: 100%;
  padding-top: var(--header-height);
}
</style>
