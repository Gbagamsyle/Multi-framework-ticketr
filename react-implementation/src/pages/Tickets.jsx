import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTickets } from '../hooks/useTickets'
import TicketCard from '../components/TicketCard'
import TicketForm from '../components/TicketForm'
import '../styles/tickets.css'

export default function Tickets() {
  const { tickets, loading, loadTickets, createTicket, updateTicket, deleteTicket } = useTickets()
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // run once on mount - don't depend on loadTickets reference to avoid repeated calls
    loadTickets().catch(err => setError(err.message || 'Failed to load tickets'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // If navigated here with state.action === 'create', open the create form
  useEffect(() => {
    if (location?.state?.action === 'create') {
      setShowForm(true)
      // clear the navigation state so refresh/back doesn't reopen the form
      navigate(location.pathname, { replace: true, state: {} })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleEdit = (ticket) => {
    setSelectedTicket(ticket)
    setShowForm(true)
  }

  const handleDelete = async (ticket) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await deleteTicket(ticket.id)
      } catch (err) {
        setError(err.message || 'Failed to delete ticket')
      }
    }
  }

  const handleFormSubmit = async (data) => {
    try {
      if (selectedTicket) {
        await updateTicket(selectedTicket.id, data)
      } else {
        await createTicket(data)
      }
      setShowForm(false)
      setSelectedTicket(null)
    } catch (err) {
      setError(err.message || 'Failed to save ticket')
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setSelectedTicket(null)
  }

  // close modal on Escape when open
  useEffect(() => {
    if (!showForm) return
    function onKey(e) {
      if (e.key === 'Escape') {
        handleFormCancel()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showForm])

  return (
    <div className="tickets-page">
      <div className="tickets-container">
        <div className="tickets-header">
          <h1>Tickets</h1>

          {/* Create Ticket Button aligned right */}
          {!showForm && (
            <div>
              <button className="btn primary" onClick={() => setShowForm(true)}>
                Create New Ticket
              </button>
            </div>
          )}
        </div>

        {error && <div className="error-banner">{error}</div>}

      {/* Ticket Form (single instance) rendered as modal */}
      {showForm && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={handleFormCancel}
        >
          <div
            className="modal modal-lg modal-form"
            role="document"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-body">
              <TicketForm
                initial={selectedTicket}
                onCancel={handleFormCancel}
                onSubmit={handleFormSubmit}
              />
            </div>
          </div>
        </div>
      )}

        {/* Ticket List */}
        {loading ? (
          <p>Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p>No tickets available.</p>
        ) : (
          <div className="ticket-list">
            {(() => {
              // If form is open for creating a new ticket, hide the list entirely.
              if (showForm && !selectedTicket) return null
              // If editing a ticket, hide only the ticket being edited.
              const visible = showForm && selectedTicket ? tickets.filter(t => t.id !== selectedTicket.id) : tickets
              return visible.map(ticket => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            })()}
          </div>
        )}
      </div>
    </div>
  )
}
