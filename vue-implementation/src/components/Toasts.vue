<template>
  <div class="toasts" aria-live="polite">
    <div v-for="t in state.toasts" :key="t.id" class="toast" :class="t.type">
      <button class="toast-close" @click="remove(t.id)" aria-label="Close">×</button>
      <div class="toast-msg">{{ t.msg }}</div>
    </div>
  </div>
</template>

<script>
import { useToasts, removeToast } from '../lib/toast'

export default {
  setup(){
    const state = useToasts()
    return { state, remove: removeToast }
  }
}
</script>

<style scoped>
.toasts{position:fixed;right:1rem;top:1rem;z-index:9999;display:flex;flex-direction:column;gap:0.5rem}
.toast{background:#fff;padding:0.6rem 0.9rem;border-radius:8px;box-shadow:0 8px 20px rgba(0,0,0,0.08);min-width:200px;position:relative}
.toast.info{border-left:4px solid #6366f1}
.toast.success{border-left:4px solid #16a34a}
.toast.error{border-left:4px solid #dc2626}
.toast-msg{font-size:0.95rem}
.toast-close{position:absolute;top:6px;right:8px;border:none;background:transparent;cursor:pointer}
</style>
