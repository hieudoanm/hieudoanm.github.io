# Backbone — FEATURE-05: Admin Dashboard

## 1. Summary

HTMX + Tailwind CSS admin dashboard served at `/` with no build step.

## 2. Behaviour

- Manages collections, records, files, webhooks, secrets, cron jobs, WS connections, cache, notifications.
- Served from `public/` (HTMX + Tailwind via CDN).

## 3. Acceptance criteria

- `GET /` returns the admin dashboard HTML.
- No Node/npm/build step required to render the dashboard.
