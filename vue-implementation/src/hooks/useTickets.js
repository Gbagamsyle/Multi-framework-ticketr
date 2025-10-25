import { inject, computed } from 'vue'

export function useTickets() {
  const context = inject('tickets')
  
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider')
  }

  return {
    // State
    tickets: context.tickets,
    loading: context.loading,
    error: context.error,
    isEmpty: context.isEmpty,

    // Actions
    loadTickets: context.loadTickets,
    createTicket: context.createTicket,
    updateTicket: context.updateTicket,
    deleteTicket: context.deleteTicket
  }
}