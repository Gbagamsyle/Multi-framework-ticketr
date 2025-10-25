<template>
  <div v-if="visible" class="modal-backdrop" @mousedown.self="requestClose">
    <div
      class="modal"
      ref="container"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'Dialog'"
      @click.stop
    >
      <div class="modal-header">
        <strong>{{ title }}</strong>
        <button class="modal-close" @click="requestClose" aria-label="Close">✕</button>
      </div>
      <div class="modal-body">
        <slot />
      </div>
      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { createFocusTrap } from '../lib/focusTrap'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue', 'close'])

const visible = ref(props.modelValue)
const container = ref(null)
let trap = null
let prevActive = null

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    // remember previous focus
    try { prevActive = document.activeElement } catch (e) { prevActive = null }
    // activate focus trap after DOM update
    setTimeout(() => {
      if (container.value) {
        try { trap = createFocusTrap(container.value) } catch (e) { trap = null }
        try { trap && trap.activate(() => requestClose()) } catch (e) { /* ignore */ }
      }
      // listen for escape
      window.addEventListener('keydown', onKey)
    }, 0)
  } else {
    deactivateTrap()
  }
})

function onKey(e) {
  if (e.key === 'Escape') requestClose()
}

function deactivateTrap(){
  try { trap && trap.deactivate() } catch (e) { /* ignore */ }
  trap = null
  try { window.removeEventListener('keydown', onKey) } catch(e){}
  // restore focus
  try { if (prevActive && prevActive.focus) prevActive.focus() } catch(e){}
}

function requestClose(){
  emit('update:modelValue', false)
  emit('close')
}

onBeforeUnmount(()=>{ deactivateTrap() })
</script>

<!-- styles are shared via global styles (src/styles/modal.css) -->
