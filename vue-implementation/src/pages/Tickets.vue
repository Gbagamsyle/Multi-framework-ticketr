<template>
  <div class="tickets-page">
    <div class="tickets-container">
      <div class="tickets-header">
        <div>
          <h1>Tickets</h1>
          <p class="muted">Manage and track support tickets — filter, search and take action.</p>
        </div>

        <div class="tickets-actions">
          <button 
            class="btn primary"
            @click="handleShowForm"
          >
            Create New Ticket
          </button>
        </div>
      </div>

      <!-- Controls: search + filters -->
      <div class="tickets-controls">
        <div class="search-wrap">
          <input
            type="search"
            v-model="searchQuery"
            class="search-input"
            placeholder="Search tickets by title or description"
            aria-label="Search tickets"
          />
        </div>

        <div class="filters-wrap">
          <select v-model="filterStatus" class="filter-select" aria-label="Filter by status">
            <option value="">All statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>

          <select v-model="filterPriority" class="filter-select" aria-label="Filter by priority">
            <option value="">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div class="tickets-stats">
          <span class="stat">Total: <strong>{{ tickets?.length || 0 }}</strong></span>
          <span class="stat">Showing: <strong>{{ filteredTickets.length }}</strong></span>
        </div>
      </div>

      <!-- Error Banner -->
      <div 
        v-if="error" 
        class="error-banner"
      >
        {{ error }}
      </div>

      <!-- Loading State -->
      <div 
        v-if="loading" 
        class="empty-state"
      >
        <div class="loader"></div>
        <h3>Loading tickets...</h3>
      </div>

      <!-- Empty State -->
      <div 
        v-else-if="!tickets?.length" 
        class="empty-state empty-state-strong"
      >
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <g fill="none" fill-rule="evenodd">
            <rect width="64" height="64" rx="8" fill="#F3F4F6" />
            <path d="M20 32h24v2H20zM20 26h24v2H20zM20 38h16v2H20z" fill="#E5E7EB" />
          </g>
        </svg>
        <h3>No tickets yet</h3>
        <p>You're all caught up — create a ticket to start tracking work and requests.</p>
        <div style="margin-top:1rem">
          <button class="btn primary" @click="handleShowForm">Create your first ticket</button>
        </div>
      </div>

      <!-- Ticket List -->
      <div 
        v-else 
        class="ticket-list"
      >
        <TicketCard
          v-for="(ticket, index) in filteredTickets"
          :key="ticket.id"
          :ticket="ticket"
          :style="{ '--i': index }"
          @view="handleView"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>

      <!-- Modal Backdrop -->
      <Transition name="fade">
        <div 
          v-if="showForm"
          class="modal-backdrop"
          @click="handleFormCancel"
        >
          <!-- Modal Content -->
          <div
            class="modal ticket-form-card"
            @click.stop
          >
            <div class="ticket-form-header">
              <h3>
                {{ viewMode ? 'Ticket Details' : (selectedTicket ? 'Edit Ticket' : 'Create Ticket') }}
              </h3>
              <button 
                class="btn-icon"
                @click="handleFormCancel"
                title="Close"
              >
                ×
              </button>
            </div>

            <div class="ticket-form-body">
              <TicketDetail
                v-if="viewMode && selectedTicket"
                :ticket="selectedTicket"
                @close="handleFormCancel"
                @edit="handleEdit"
              />

              <TicketForm
                v-else
                :initial="selectedTicket"
                @submit="handleFormSubmit"
                @cancel="handleFormCancel"
              />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTickets } from '../hooks/useTickets'
import TicketCard from '../components/TicketCard.vue'
import TicketForm from '../components/TicketForm.vue'
import TicketDetail from '../components/TicketDetail.vue'
import { toast } from '../lib/toast'

// Router
const router = useRouter()
const route = useRoute()

// Get ticket context
const { 
  tickets, 
  loading,
  error,
  loadTickets,
  createTicket,
  updateTicket,
  deleteTicket
} = useTickets()

// Local state
const selectedTicket = ref(null)
const showForm = ref(false)
const viewMode = ref(false) // when true, modal shows read-only detail

// UI controls
const searchQuery = ref('')
const filterStatus = ref('')
const filterPriority = ref('')

const filteredTickets = computed(() => {
  if (!tickets.value) return []

  const q = (searchQuery.value || '').toLowerCase().trim()
  return tickets.value.filter(t => {
    if (filterStatus.value && t.status !== filterStatus.value) return false
    if (filterPriority.value && t.priority !== filterPriority.value) return false
    if (!q) return true
    return (t.title || '').toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q)
  })
})

function handleView(ticket) {
  // Open modal in read-only view mode
  selectedTicket.value = ticket
  viewMode.value = true
  showForm.value = true
}

// Event handlers
function handleShowForm() {
  selectedTicket.value = null
  viewMode.value = false
  showForm.value = true
}

function handleFormCancel() {
  showForm.value = false
  selectedTicket.value = null
  viewMode.value = false
}

function handleEdit(ticket) {
  selectedTicket.value = ticket
  viewMode.value = false
  showForm.value = true
}

async function handleFormSubmit(data) {
  try {
    if (selectedTicket.value) {
      await updateTicket(selectedTicket.value.id, data)
      toast('Ticket updated successfully', 'success')
    } else {
      await createTicket(data)
      toast('Ticket created successfully', 'success')
    }
    showForm.value = false
    selectedTicket.value = null
    await loadTickets()
  } catch (err) {
    toast(err.message || 'Failed to save ticket', 'error')
  }
}

async function handleDelete(ticket) {
  if (!window.confirm('Are you sure you want to delete this ticket?')) {
    return
  }
  
  try {
    await deleteTicket(ticket.id)
    toast('Ticket deleted successfully', 'success')
    await loadTickets()
  } catch (err) {
    toast(err.message || 'Failed to delete ticket', 'error')
  }
}

// Handle escape key to close form
function onKeyDown(e) {
  if (e.key === 'Escape' && showForm.value) {
    handleFormCancel()
  }
}

// Lifecycle hooks
onMounted(async () => {
  console.log('Tickets page mounted')
  try {
    await loadTickets()
    
    // Create a sample ticket if no tickets exist
    if (!tickets.value || tickets.value.length === 0) {
      await createTicket({
        title: "Welcome to Ticketing System",
        description: "This is a sample ticket to help you get started. Feel free to edit or delete it!",
        status: "open",
        priority: "medium"
      })
      await loadTickets()
    }
    
    // Open form if navigated with create action
    if (route?.query?.action === 'create') {
      showForm.value = true
      // Clear navigation state
      router.replace({ path: route.path, query: {} })
    }
  } catch (err) {
    error.value = err.message || 'Failed to load tickets'
    toast(err.message || 'Failed to load tickets', 'error')
  }
})

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<style>
@import '../styles/tickets.css';

/* Modal transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--bg);
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.ticket-form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.ticket-form-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.btn-icon {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--text-secondary);
}

.btn-icon:hover {
  background: var(--bg-secondary);
  color: var(--text);
}
</style>
