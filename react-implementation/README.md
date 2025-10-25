# TicketApp — React Implementation

This folder contains the React + Vite implementation of the TicketApp frontend.

Features implemented in this version:

- Landing page with wavy SVG hero and decorative circles
- Auth (Login / Signup) simulated with localStorage and mock API
- Protected Dashboard and Tickets pages (protected by `ticketapp_session` in localStorage)
- Full ticket CRUD using localStorage-backed mock API (create, list, update, delete)
- Inline form validation, toast notifications, and accessible markup

Quick start

1. Install dependencies:

	npm install

2. Run the dev server:

	npm run dev

3. Open http://localhost:5173 in your browser

Example test user credentials:

- Email: test@example.com
- Password: Password123!

Notes

- Session token is stored under the localStorage key `ticketapp_session`.
- Shared decorative assets are available in `../shared-assets/`.

