<template>
  <div
    aria-live="polite"
    class="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
  >
    <TransitionGroup name="slide">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex items-start gap-3 min-w-[320px] max-w-md bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div
          class="flex-none w-2 self-stretch"
          :style="{ background: colors[toast.type] }"
        />
        
        <div class="flex-1 flex gap-3 p-4">
          <div 
            class="flex-none pt-1"
            :style="{ color: colors[toast.type] }"
          >
            <component :is="Icons[toast.type]" />
          </div>
          
          <div class="flex-1">
            <div class="text-sm font-medium text-gray-900">
              {{ toast.msg }}
            </div>
          </div>

          <button
            @click="handleDismiss(toast.id)"
            class="flex-none pt-1 text-gray-400 hover:text-gray-500"
            aria-label="Dismiss"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { setPushFunction } from '@/lib/toast'


const toasts = ref([])

const colors = {
  success: 'var(--color-success)',
  error: 'var(--color-error)',
  warning: 'var(--color-warning)',
  info: 'var(--accent)'
}

const Icons = {
  success: {
    template: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>`
  },
  error: {
    template: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>`
  },
  warning: {
    template: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>`
  },
  info: {
    template: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`
  }
}

onMounted(() => {
  setPushFunction((toast) => {
    toasts.value.push({ 
      id: Date.now() + Math.random(), 
      type: 'info',
      ...toast 
    })
  })
})

watchEffect(() => {
  if (toasts.value.length > 0) {
    toasts.value.forEach(toast => {
      setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== toast.id)
      }, toast.duration || 4000)
    })
  }
})

const handleDismiss = (id) => {
  toasts.value = toasts.value.filter(toast => toast.id !== id)
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>