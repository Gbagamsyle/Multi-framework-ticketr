 # Ticket App (Vue) — Deploy & Preview

 This folder contains the Vue 3 + Vite implementation used in the Multi-framework-ticketr repository.

 Quick commands

 - Install deps (if needed):

 ```powershell
 cd "vue-implementation"
 npm ci
 ```

 - Build for production:

 ```powershell
 cd "vue-implementation"
 npm run build
 ```

 - Preview the production build locally (serves `dist/`):

 ```powershell
 cd "vue-implementation"
 npm run preview
 ```

 Netlify deployment (monorepo notes)

 If you connect the repository to Netlify from GitHub (recommended for CI):

 - Base directory: (leave empty) or set to the root of the monorepo if you want to build multiple apps.
 - Build command: `cd vue-implementation && npm ci && npm run build`
 - Publish directory: `vue-implementation/dist`

 Alternatively, for a single-site quick deploy, build locally and drag-and-drop the `dist/` folder to Netlify's Sites dashboard.

 Notes

 - The app currently uses client-side localStorage for user persistence (`ticketapp_users`, `ticketapp_session`).
 - If you prefer server-backed persistence, see the repository's `twig-implementation` (PHP/Twig) for a possible backend; I can add a small API endpoint there if you want.

 Contact

 If you want I can also add a Netlify deploy profile (netlify.toml) or CI instructions — tell me which and I will add it.
