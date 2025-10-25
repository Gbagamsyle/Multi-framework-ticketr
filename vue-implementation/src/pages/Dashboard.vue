<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useTickets } from '../composables/useTickets';
import { useAuth } from '../hooks/useAuth';
import { toast } from '../lib/toast';
import StatsCard from '../components/StatsCard.vue';

const { tickets, loadTickets } = useTickets();
const { user } = useAuth();
const error = ref(null);
const isLoading = ref(true);

const stats = computed(() => {
  if (!tickets.value) return { total: 0, open: 0, in_progress: 0, closed: 0, highPriority: 0 };
  
  return tickets.value.reduce(
    (acc, ticket) => {
      acc.total++;
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      if (ticket.priority === 'high' && ticket.status !== 'closed') {
        acc.highPriority++;
      }
      return acc;
    },
    { total: 0, open: 0, in_progress: 0, closed: 0, highPriority: 0 }
  );
});

onMounted(async () => {
  try {
    await loadTickets();
  } catch (err) {
    error.value = err;
    toast(err.message || 'Failed to load tickets. Please retry.', 'error');
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="dashboard">
    <!-- Loading State -->
    <div v-if="isLoading" class="empty-state">
      <svg class="spinner" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
      <h3>Loading Dashboard</h3>
      <p>Please wait while we fetch your data...</p>
    </div>

    <template v-else>
      <!-- Header -->
      <header class="page-header">
        <div class="flex items-center gap-4">
          <div class="avatar">{{ user?.email?.charAt(0).toUpperCase() }}</div>
          <div>
            <h1 class="page-title">Welcome back, {{ user?.email }}</h1>
            <p class="page-description">Here's an overview of your support tickets</p>
          </div>
        </div>
        <RouterLink :to="{ path: '/tickets', query: { action: 'create' }}" class="button primary">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          Create Ticket
        </RouterLink>
      </header>

      <!-- Error Banner -->
      <div v-if="error" class="error-banner" role="alert">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        {{ error.message }}
      </div>

      <!-- Stats Section -->
      <section class="section">
        <h2 class="section-title">Overview</h2>
        <div class="grid-4">
          <StatsCard
            :value="stats.total"
            label="Total Tickets"
            color="linear-gradient(135deg, #6366f1 0%, #4338ca 100%)"
            :icon-path="'M21 3h-6.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H3v18h18V3zm-9 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'"
          />
          <StatsCard
            :value="stats.open"
            label="Open"
            color="linear-gradient(135deg, #10b981 0%, #059669 100%)"
            :icon-path="'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z'"
          />
          <StatsCard
            :value="stats.in_progress"
            label="In Progress"
            color="linear-gradient(135deg, #eab308 0%, #ca8a04 100%)"
            :icon-path="'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z'"
          />
          <StatsCard
            :value="stats.closed"
            label="Resolved"
            color="linear-gradient(135deg, #475569 0%, #334155 100%)"
            :icon-path="'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'"
          />
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="section">
        <h2 class="section-title">Quick Actions</h2>

        <div class="card card-full">
          <div class="card-header">
            <h3 class="card-title">Manage Tickets</h3>
            <RouterLink to="/tickets" class="button button-secondary">
              View All
            </RouterLink>
          </div>
          <p>Access and update your support tickets from one place.</p>
          <div class="flex gap-4 mt-4">
            <div class="tag">Open Issues: {{ stats.open }}</div>
            <div class="tag">In Progress: {{ stats.in_progress }}</div>
          </div>
        </div>

        <div v-if="stats.highPriority > 0" 
          class="card card-full" 
          style="border-color: var(--color-error); border-width: 2px; margin-top: 1.5rem"
        >
          <div class="card-header">
            <h3 class="card-title">High Priority</h3>
            <div class="priority high">{{ stats.highPriority }} Active</div>
          </div>
          <p>These tickets require immediate attention.</p>
          <RouterLink 
            to="/tickets?priority=high" 
            class="button" 
            style="margin-top: 1rem; background-color: var(--color-error)"
          >
            View High Priority
          </RouterLink>
        </div>
      </section>
    </template>
  </div>
</template>

<style>
@import '../styles/dashboard.css';
</style>
