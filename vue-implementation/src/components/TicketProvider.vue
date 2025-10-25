<template>
  <slot></slot>
</template>

<script setup>
import { provide, readonly, ref, onMounted, computed } from 'vue';
import * as api from '../lib/api';
import { toast } from '../lib/toast';

// Reactive state
const tickets = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Debug logging
console.log('Initial tickets state:', tickets.value);

// Ticket methods
const fetchTickets = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const result = await api.getTickets();
    tickets.value = result;
  } catch (e) {
    error.value = e;
    toast('Failed to load tickets', 'error');
  } finally {
    isLoading.value = false;
  }
};

const createTicket = async (payload) => {
  isLoading.value = true;
  error.value = null;
  try {
    const ticket = await api.createTicket(payload);
    tickets.value.unshift(ticket);
    toast('Ticket created successfully', 'success');
    return ticket;
  } catch (e) {
    error.value = e;
    toast('Failed to create ticket', 'error');
    throw e;
  } finally {
    isLoading.value = false;
  }
};

const updateTicket = async (id, payload) => {
  isLoading.value = true;
  error.value = null;
  try {
    const ticket = await api.updateTicket(id, payload);
    const idx = tickets.value.findIndex(t => t.id === id);
    if (idx !== -1) {
      tickets.value[idx] = ticket;
    }
    toast('Ticket updated successfully', 'success');
    return ticket;
  } catch (e) {
    error.value = e;
    toast('Failed to update ticket', 'error');
    throw e;
  } finally {
    isLoading.value = false;
  }
};

const deleteTicket = async (id) => {
  isLoading.value = true;
  error.value = null;
  try {
    await api.deleteTicket(id);
    tickets.value = tickets.value.filter(t => t.id !== id);
    toast('Ticket deleted successfully', 'success');
  } catch (e) {
    error.value = e;
    toast('Failed to delete ticket', 'error');
    throw e;
  } finally {
    isLoading.value = false;
  }
};

// Load tickets on mount
onMounted(fetchTickets);

// Create a computed ref for empty state
const isEmpty = computed(() => !isLoading.value && tickets.value.length === 0);

// Provide ticket context
provide('tickets', {
  tickets: readonly(tickets),
  loading: readonly(isLoading),
  error: readonly(error),
  isEmpty: readonly(isEmpty),
  loadTickets: fetchTickets,
  createTicket,
  updateTicket,
  deleteTicket
});

// Debug logging
console.log('TicketProvider initialized');
</script>