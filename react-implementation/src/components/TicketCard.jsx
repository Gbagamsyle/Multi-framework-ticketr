import React from 'react';

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'open':
      return (
        <svg className="icon status-icon" width="1em" height="1em" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'in_progress':
      return (
        <svg className="icon status-icon" width="1em" height="1em" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'closed':
      return (
        <svg className="icon status-icon" width="1em" height="1em" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      );
    default:
      return null;
  }
};

const EditIcon = () => (
  <svg className="icon action-icon" width="1em" height="1em" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="icon action-icon" width="1em" height="1em" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="icon meta-icon" width="1em" height="1em" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const TicketIcon = () => (
  <svg className="icon meta-icon" width="1em" height="1em" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
  </svg>
);

export default function TicketCard({ ticket, onEdit, onDelete }) {
  const statusMap = {
    open: { label: 'Open', color: 'var(--color-success)' },
    in_progress: { label: 'In Progress', color: 'var(--color-warning)' },
    closed: { label: 'Closed', color: 'var(--text-secondary)' }
  };

  const priorityMap = {
    high: { label: 'High', color: 'var(--color-error)' },
    medium: { label: 'Medium', color: 'var(--color-warning)' },
    low: { label: 'Low', color: 'var(--color-success)' }
  };

  const status = statusMap[ticket.status] || statusMap.open;
  const priority = ticket.priority ? priorityMap[ticket.priority] : null;

  return (
    <article className="card ticket-card" role="article" aria-labelledby={`ticket-${ticket.id}`}>
      {/* colored status bar */}
      <div
        className="ticket-side"
        aria-hidden="true"
        style={{ background: status.color }}
      />

      <div className="ticket-main">
        <header className="ticket-header">
          <div className="ticket-title-section">
            <h3 id={`ticket-${ticket.id}`} className="ticket-title">{ticket.title}</h3>

            <div className="ticket-badges">
              <span
                className="ticket-status"
                style={{ color: status.color }}
              >
                <StatusIcon status={ticket.status} />
                {status.label}
              </span>

              {priority && (
                <span
                  className="ticket-priority"
                  style={{ color: priority.color }}
                >
                  <span
                    className="priority-dot"
                    style={{ background: priority.color }}
                  />
                  {priority.label}
                </span>
              )}
            </div>
          </div>

          <div className="ticket-actions">
            <button
              className="btn-icon"
              onClick={() => onEdit(ticket)}
              title="Edit ticket"
              aria-label={`Edit ticket ${ticket.title}`}
            >
              <EditIcon />
            </button>
            <button
              className="btn-icon danger"
              onClick={() => onDelete(ticket)}
              title="Delete ticket"
              aria-label={`Delete ticket ${ticket.title}`}
            >
              <DeleteIcon />
            </button>
          </div>
        </header>

        <div className="ticket-content">
          {ticket.description ? (
            <p>{ticket.description}</p>
          ) : (
            <p className="text-secondary"><em>No description provided</em></p>
          )}
        </div>

        <footer className="ticket-footer">
          <div className="ticket-meta">
            <span className="meta-item">
              <TicketIcon />
              #{String(ticket.id).slice(0, 8)}
            </span>
            <span className="meta-item">
              <CalendarIcon />
              {ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleDateString() : '—'}
            </span>
          </div>
        </footer>
      </div>
    </article>
  );
}
