<template>
  <article class="ticket-card compact" role="article" tabindex="0" @click="handleCardClick" @keyup.enter="handleCardKey">
    <div 
      class="ticket-side" 
      :style="{
        background: getStatusColor(ticket.status)
      }"
    ></div>
    <div class="ticket-main">
      <div class="ticket-header">
        <div class="ticket-title-wrap">
          <div class="status-icon" aria-hidden="true" v-html="getStatusIcon(ticket.status)"></div>
          <div class="ticket-heading">
            <h3 class="ticket-title">{{ ticket.title }}</h3>
            <div class="ticket-sub">{{ ticket.project || ticket.id?.slice(0,8) }} · {{ formatDate(ticket.createdAt || ticket.created_at) }}</div>
          </div>
        </div>
        <div class="header-actions">
          <button
            class="btn-icon header-btn"
            @click.stop="$emit('edit', ticket)"
            aria-label="Edit ticket"
            title="Edit"
            v-html="getEditIcon()"
          ></button>

          <button
            class="btn-icon danger header-btn"
            @click.stop="$emit('delete', ticket)"
            aria-label="Delete ticket"
            title="Delete"
            v-html="getDeleteIcon()"
          ></button>
        </div>
      </div>
  <div class="ticket-badges">
          <span
            class="ticket-status"
            :class="getStatusClass(ticket.status)"
            :aria-label="formatStatus(ticket.status)"
            role="status"
          >
            {{ formatStatus(ticket.status) }}
          </span>

          <span
            v-if="ticket.priority"
            class="ticket-priority"
            :class="getPriorityClass(ticket.priority)"
            :title="formatPriority(ticket.priority)"
          >
            <span class="priority-icon" v-html="getPriorityIcon(ticket.priority)" aria-hidden="true"></span>
            <span class="priority-text">{{ formatPriority(ticket.priority) }}</span>
          </span>
        </div>

      <div class="ticket-content" aria-label="Ticket description" tabindex="0" @click.stop="handleCardClick" @keydown.enter.stop="handleCardKey">
        <p>{{ trimmedDescription }}</p>
      </div>

      <div class="ticket-footer">
        <div class="ticket-meta">
          <span class="meta-date">{{ formatDate(ticket.createdAt || ticket.created_at) }}</span>
          <span v-if="ticket.assignee" class="meta-assignee">Assigned to <strong>{{ ticket.assignee }}</strong></span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { formatDistance } from 'date-fns'

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['view', 'edit', 'delete'])

function handleCardClick(e){
  // open view on click of content
  emit('view', props.ticket)
}

function handleCardKey(e){
  emit('view', props.ticket)
}

import { computed } from 'vue'

const trimmedDescription = computed(() => {
  const d = props.ticket?.description || ''
  if (d.length > 180) return d.slice(0, 180) + '...'
  return d
})

function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case 'open': return 'var(--success-gradient)'
    case 'in_progress': return 'var(--warning-gradient)'
    case 'closed': return 'var(--error-gradient)'
    default: return 'var(--default-gradient)'
  }
}

function getStatusClass(status) {
  switch (status?.toLowerCase()) {
    case 'open': return 'status-open'
    case 'in_progress': return 'status-progress'
    case 'closed': return 'status-closed'
    default: return ''
  }
}

function getStatusIcon(status) {
  switch (status?.toLowerCase()) {
    case 'open':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
      </svg>`
    case 'in_progress':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clip-rule="evenodd" />
      </svg>`
    case 'closed':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
      </svg>`
    default:
      return null
  }
}

function getPriorityClass(priority) {
  switch (priority?.toLowerCase()) {
    case 'high': return 'priority-high'
    case 'medium': return 'priority-medium'
    case 'low': return 'priority-low'
    default: return ''
  }
}

function getPriorityIcon(priority) {
  switch (priority?.toLowerCase()) {
    case 'high':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clip-rule="evenodd" />
      </svg>`
    case 'medium':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clip-rule="evenodd" />
      </svg>`
    case 'low':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path fill-rule="evenodd" d="M2.24 6.8a.75.75 0 001.06-.04l1.95-2.1v8.59a.75.75 0 001.5 0V4.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L2.2 5.74a.75.75 0 00.04 1.06zm8 6.4a.75.75 0 00-.04 1.06l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75a.75.75 0 00-1.5 0v8.59l-1.95-2.1a.75.75 0 00-1.06-.04z" clip-rule="evenodd" />
      </svg>`
    default:
      return null
  }
}

function getDateIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
    <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
  </svg>`
}

function getEditIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
  </svg>`
}

function getDeleteIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
    <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
  </svg>`
}

function formatStatus(status) {
  return status?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function formatPriority(priority) {
  return priority?.charAt(0).toUpperCase() + priority?.slice(1)
}

function formatDate(date) {
  if (!date) return ''
  return formatDistance(new Date(date), new Date(), { addSuffix: true })
}
</script>

<style>
@import '../styles/tickets.css';
</style>

<style scoped>
.ticket-card.compact {
  padding: 8px 10px;
  border-radius: 10px;
  gap: 8px;
  align-items: center;
  overflow: hidden;
}

/* Make the standard compact card resemble the reference screenshot: */
.ticket-card {
  background: #fff;
  border-radius: 12px;
  padding: 12px 16px;
  display: grid;
  grid-template-columns: 6px 1fr;
  gap: 12px;
  align-items: flex-start;
  min-height: 72px;
  box-shadow: 0 6px 18px rgba(2,6,23,0.04);
  border: 1px solid rgba(15,23,42,0.03);
}

.ticket-card.compact .ticket-side {
  width: 6px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.ticket-card.compact .ticket-heading .ticket-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0;
}

.ticket-card.compact .ticket-heading .ticket-sub {
  font-size: 0.78rem;
  color: var(--text-secondary);
}

.ticket-card.compact .ticket-content p {
  max-height: 30px;
  overflow: hidden;
  margin: 0;
  font-size: 0.86rem;
}

.ticket-card.compact .btn-icon {
  width: 30px;
  height: 30px;
  min-width: 30px;
  border-radius: 6px;
}

.ticket-card.compact .ticket-actions .btn-icon {
  margin-left: 6px;
}

.ticket-card.compact {
  transition: transform 160ms ease, box-shadow 140ms ease;
  box-shadow: 0 4px 10px rgba(2,6,23,0.04);
}

.ticket-card.compact:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(2,6,23,0.06);
}

/* Denser variant intended for compact list views */
.ticket-card.compact-list {
  padding: 4px 6px;
  min-height: 44px;
  border-radius: 8px;
}

.ticket-card.compact-list .ticket-heading .ticket-title {
  font-size: 0.85rem;
}

.ticket-card.compact-list .ticket-badges { display: none; }

.ticket-card.compact-list .ticket-content p { max-height: 24px; font-size: 0.82rem }

.ticket-card.compact-list .btn-icon { width: 28px; height: 28px; min-width: 28px }

.ticket-card.compact-list .ticket-main { padding: 6px 8px }
.ticket-card.compact-list .ticket-title { font-size: 0.85rem; margin-bottom: 0 }
.ticket-card.compact-list .ticket-sub { font-size: 0.72rem }
.ticket-card.compact-list .ticket-content p { max-height: 20px; font-size: 0.8rem }
.ticket-card.compact-list .meta-date { font-size: 0.75rem }
.ticket-card.compact-list .ticket-footer { padding-top: 0.4rem }
.ticket-card.compact-list .header-btn { width: 24px; height: 24px; min-width: 24px }

.ticket-card.compact {
  background: #fff; /* white surface like screenshot */
  border: 1px solid rgba(15,23,42,0.04);
}

.header-actions {
  margin-left: 12px;
  display: flex;
  gap: 6px;
  align-items: center;
}

.header-btn {
  width: 28px;
  height: 28px;
  min-width: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 6px;
  border: 1px solid transparent;
  color: var(--text-secondary);
}

.header-btn:hover { background: rgba(2,6,23,0.03); color: var(--text) }

.ticket-badges { margin-top: 6px }

.ticket-footer { padding-top: 0.5rem; border-top: 1px solid rgba(15,23,42,0.03); margin-top: 8px }

.meta-date { font-size: 0.82rem; color: var(--text-secondary); margin-right: 0.75rem }

/* Ensure any inline SVGs in the footer/content are small and aligned */
.ticket-footer svg,
.ticket-content svg,
.meta-date svg,
.status-icon svg,
.priority-icon svg {
  width: 1rem !important;
  height: 1rem !important;
  max-width: 1rem;
  max-height: 1rem;
  vertical-align: middle;
}

.ticket-main { padding: 0 }
</style>