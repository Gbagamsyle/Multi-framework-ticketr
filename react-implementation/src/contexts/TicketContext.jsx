import React, { useState } from 'react'
import * as api from '../lib/api'
import { TicketContext } from './context'

// ✅ Provider
export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const t = await api.getTickets()
      setTickets(t)
    } finally {
      setLoading(false)
    }
  }

  const create = async (payload) => {
    const t = await api.createTicket(payload)
    setTickets(prev => [t, ...prev])
    return t
  }

  const update = async (id, payload) => {
    const t = await api.updateTicket(id, payload)
    setTickets(prev => prev.map(p => (p.id === id ? t : p)))
    return t
  }

  const remove = async (id) => {
    await api.deleteTicket(id)
    setTickets(prev => prev.filter(p => p.id !== id))
  }

  return (
    <TicketContext.Provider value={{
      tickets,
      loading,
      // keep consumer-friendly names the rest of the app expects
      loadTickets: load,
      createTicket: create,
      updateTicket: update,
      deleteTicket: remove,
    }}>
      {children}
    </TicketContext.Provider>
  )
}
// Note: the `useTickets` hook lives in `src/hooks/useTickets.js`.


