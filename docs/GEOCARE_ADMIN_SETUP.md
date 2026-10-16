# GeoCare MongoDB administration — initial protected API

The support UI still creates local drafts only. Public ticket submission is **not** enabled.

Set MONGODB_URI and MONGODB_DB_NAME=geonexa in Vercel. Set GEOCARE_ADMIN_TOKEN to a unique random value of at least 32 characters, stored only in server-side environment variables. Redeploy after changing environment variables.

Authenticated endpoints (header: Authorization: Bearer <GEOCARE_ADMIN_TOKEN>):
- GET /api/admin/database-health: tests MongoDB ping without disclosing the connection string.
- GET /api/admin/tickets: lists the newest 50 tickets.
- POST /api/admin/tickets with JSON {"category":"technical","summary":"Example problem description"}: inserts a ticket into support_tickets.

Do not place the admin token in browser code or NEXT_PUBLIC variables. This token-based interface is for server-to-server administration only. Replace it with role-based user authentication, audit logs, rate limiting and CSRF-safe browser sessions before building an admin dashboard. Never expose this endpoint to end-user forms.

MongoDB network access, database credentials, and Vercel deployment must be configured independently. No connection to Atlas has been verified from this repository.
