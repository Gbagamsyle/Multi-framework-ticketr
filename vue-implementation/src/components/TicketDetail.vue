<template>
  <div class="ticket-detail">
    <div class="ticket-detail-header">
      <h3>{{ ticket.title }}</h3>
      <div class="ticket-detail-meta">
        <span class="ticket-status" :class="getStatusClass(ticket.status)">{{ formatStatus(ticket.status) }}</span>
        <span v-if="ticket.priority" class="ticket-priority" :class="getPriorityClass(ticket.priority)">{{ formatPriority(ticket.priority) }}</span>
      </div>
    </div>

    <div class="ticket-detail-body">
      <p class="ticket-detail-desc">{{ ticket.description || '—' }}</p>

      <ul class="ticket-detail-list">
        <li><strong>Priority:</strong> {{ formatPriority(ticket.priority) || 'None' }}</li>
        <li><strong>Created:</strong> {{ formatDate(ticket.createdAt || ticket.created_at) }}</li>
        <li v-if="ticket.assignee"><strong>Assignee:</strong> {{ ticket.assignee }}</li>
      </ul>
    </div>

    <div class="ticket-detail-actions">
      <button class="btn" @click="$emit('close')">Close</button>
      <button class="btn primary" @click="$emit('edit', ticket)">Edit</button>
    </div>
  </div>
</template>

<script setup>
import { formatDistance } from 'date-fns'

const props = defineProps({
  ticket: { type: Object, required: true }
})

const emit = defineEmits(['close', 'edit'])

function formatStatus(status) {
  return status?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}
function formatPriority(p) { return p ? (p.charAt(0).toUpperCase() + p.slice(1)) : '' }
function getPriorityClass(p){
  if(!p) return ''
  return p.toLowerCase() === 'high' ? 'priority-high' : p.toLowerCase() === 'medium' ? 'priority-medium' : 'priority-low'
}
function getStatusClass(s){
  if(!s) return ''
  return s.toLowerCase() === 'open' ? 'status-open' : s.toLowerCase() === 'in_progress' ? 'status-progress' : 'status-closed'
}
function formatDate(date){ if(!date) return ''; return formatDistance(new Date(date), new Date(), { addSuffix: true }) }
</script>

<style scoped>
.ticket-detail { padding: 1rem; max-width: 700px; }
.ticket-detail-header { display:flex; justify-content:space-between; align-items:center; gap:1rem; margin-bottom:0.75rem }
.ticket-detail-header h3{ margin:0; font-size:1.25rem }
.ticket-detail-meta { display:flex; gap:0.5rem; align-items:center }
.ticket-detail-desc{ color:var(--text-secondary); margin:0 0 1rem 0 }
.ticket-detail-list{ list-style:none; padding:0; margin:0 0 1rem 0; color:var(--text-secondary) }
.ticket-detail-list li{ margin:0.35rem 0 }
.ticket-detail-actions{ display:flex; gap:0.5rem; justify-content:flex-end }
</style>
