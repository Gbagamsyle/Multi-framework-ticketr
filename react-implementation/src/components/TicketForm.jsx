import React, { useState, useEffect } from 'react';
import { pushToast } from '../lib/toast';

const VALID_STATUSES = ['open', 'in_progress', 'closed'];

const TitleIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const PriorityIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
  </svg>
);

const DescriptionIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
  </svg>
);

const StatusIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default function TicketForm({ initial = null, onCancel, onSubmit }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [status, setStatus] = useState(initial?.status || 'open');
  const [priority, setPriority] = useState(initial?.priority || '');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => setErrors({}), [title, status, description, priority]);

  const remainingChars = 1000 - description.length;

  function validate() {
    const errors = {};
    if (!title.trim()) errors.title = 'Title is required';
    if (!VALID_STATUSES.includes(status)) errors.status = 'Invalid status';
    if (description && description.length > 1000) errors.description = 'Description cannot exceed 1000 characters';
    return errors;
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      pushToast({ msg: 'Please fix the highlighted errors', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        status,
        priority: priority || null
      });
      pushToast({ msg: 'Ticket saved successfully', type: 'success' });
    } catch (err) {
      pushToast({ msg: err.message || 'Failed to save ticket', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ticket-form-card card">
      <div className="ticket-form-header">
        <h3>{initial ? 'Edit Ticket' : 'Create Ticket'}</h3>
        <button type="button" className="btn" onClick={onCancel} aria-label="Close form">✕</button>
      </div>

      <form className="ticket-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="title">
            Title <span className="required" aria-hidden="true">*</span>
          </label>
          <div className="input-with-icon">
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter ticket title"
              className={`with-icon-left ${errors.title ? 'error' : ''}`}
              disabled={isSubmitting}
              autoFocus
            />
            <span className="input-icon left" aria-hidden="true">
              <TitleIcon />
            </span>
          </div>
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority Level</label>
          <div className="input-with-icon">
            <select
              id="priority"
              value={priority}
              onChange={e => setPriority(e.target.value)}
              className="with-icon-left"
              disabled={isSubmitting}
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <span className="input-icon left" aria-hidden="true">
              <PriorityIcon />
            </span>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">
          Description
          <span className="char-count" aria-live="polite">
            {remainingChars} characters remaining
          </span>
        </label>
        <div className="input-with-icon">
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Provide a detailed description of the ticket"
            className={`with-icon-left ${errors.description ? 'error' : ''}`}
            disabled={isSubmitting}
          />
          <span className="input-icon left top" aria-hidden="true">
            <DescriptionIcon />
          </span>
        </div>
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">
          Status <span className="required" aria-hidden="true">*</span>
        </label>
        <div className="input-with-icon">
          <select
            id="status"
            value={status}
            onChange={e => setStatus(e.target.value)}
            className={`with-icon-left ${errors.status ? 'error' : ''}`}
            disabled={isSubmitting}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <span className="input-icon left" aria-hidden="true">
            <StatusIcon />
          </span>
        </div>
        {errors.status && <span className="error-message">{errors.status}</span>}
      </div>

      <div className="form-actions">
        <div className="form-actions-left">
          <button
            type="button"
            className="btn"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>

        <div className="form-actions-right">
          <button
            type="submit"
            className="btn primary btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : initial ? 'Update Ticket' : 'Create Ticket'}
          </button>
        </div>
          </div>
          </form>
    </div>
  );
}
