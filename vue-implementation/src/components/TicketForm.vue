<template>
  <form class="ticket-form" @submit.prevent="handleSubmit">
    <div class="form-grid">
      <div class="form-group">
        <label for="title">Title</label>
        <input 
          id="title"
          v-model="form.title" 
          type="text" 
          placeholder="Enter ticket title"
          :class="{ error: errors.title }"
          required
        />
        <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
      </div>
      
      <div class="form-group">
        <label for="status">Status</label>
        <select 
          id="status"
          v-model="form.status"
          :class="{ error: errors.status }"
          required
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <span v-if="errors.status" class="error-message">{{ errors.status }}</span>
      </div>
    </div>

    <div class="form-group">
      <label for="priority">Priority</label>
      <select 
        id="priority"
        v-model="form.priority"
        :class="{ error: errors.priority }"
      >
        <option value="">None</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <span v-if="errors.priority" class="error-message">{{ errors.priority }}</span>
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea 
        id="description"
        v-model="form.description" 
        placeholder="Enter ticket description"
        :class="{ error: errors.description }"
        rows="4"
      ></textarea>
      <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
    </div>

    <div class="form-actions">
      <div class="form-actions-right">
        <button type="button" class="btn" @click="$emit('cancel')">Cancel</button>
        <button type="submit" class="btn primary">Save Ticket</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  initial: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  title: '',
  description: '',
  status: 'open',
  priority: ''
})

const errors = ref({})

onMounted(() => {
  if (props.initial) {
    form.value = { ...props.initial }
  }
})

function validate() {
  const newErrors = {}
  
  if (!form.value.title?.trim()) {
    newErrors.title = 'Title is required'
  }
  
  if (!['open', 'in_progress', 'closed'].includes(form.value.status)) {
    newErrors.status = 'Invalid status'
  }
  
  if (form.value.priority && !['low', 'medium', 'high', ''].includes(form.value.priority)) {
    newErrors.priority = 'Invalid priority'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

function handleSubmit() {
  if (validate()) {
    emit('submit', { ...form.value })
  }
}
</script>

<style>
@import '../styles/tickets.css';
</style>