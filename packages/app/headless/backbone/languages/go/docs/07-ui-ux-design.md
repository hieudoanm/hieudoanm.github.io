# Backbone — UI/UX Design

## 1. Purpose

This document describes the UI tokens, layout, states, and accessibility of the Backbone admin dashboard.

The admin dashboard is HTMX + Tailwind CSS served at `/` with no build step required. It lets users manage collections, buckets, files, webhooks, secrets, cron jobs, WS connections, cache, and notifications.

## 2. Design Direction

- Clean, technical, calm interface.
- Responsive (mobile, tablet, desktop).
- HTMX-driven: partial page updates, no full reloads for most actions.
- Tailwind CSS via CDN; no build step.

## 3. Layout

Admin dashboard served at `/`. Sidebar navigation + content area. Modal dialogs for create/edit forms. Toast notifications for success/error states.

## 4. Components

- Collections and records tables with pagination and search.
- File upload / download / delete.
- Webhook configuration and delivery log viewer.
- Secret management (list omits values; GET decrypts).
- Cron job scheduler and run log viewer.
- WS connection and message history viewer.
- Cache stats and flush.
- Notification list with read-marking.

## 5. States

Every page implements loading, empty, validation-error, and success states. Never show success before the server confirms it.

## 6. Accessibility

- Semantic HTML.
- Keyboard navigation.
- Visible focus states.
- Sufficient colour contrast.
- Meaningful link text.

## Cross-references

- Architecture: [`04-architecture.md`](04-architecture.md)
- Tech stack: [`08-tech-stack.md`](08-tech-stack.md)
- Testing: [`09-testing-strategy.md`](09-testing-strategy.md)
