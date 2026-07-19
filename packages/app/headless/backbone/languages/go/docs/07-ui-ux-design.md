# Backbone — UI/UX Design

## 1. Purpose

This document describes the UI tokens, layout, states, and accessibility of the Backbone admin dashboard.

The admin dashboard is HTMX + Tailwind CSS served at `/` with no build step required. It lets users manage collections, buckets, files, webhooks, secrets, cron jobs, WS connections, cache, and notifications.

## Design system (Material Design 3)

The HTML prototype adapts the dashboard's palette to a Material Design 3 structure (indigo primary to match backbone's brand):

- Colour roles: primary/on-primary/primary-container, secondary, tertiary, error, surface/on-surface, surface-container, outline, inverse
- Type scale: display-large, headline-large, title-large, body-large/medium/small, label-large/medium/small
- Shape tokens: small 4px, medium 12px, large 16px, extra-large 28px
- Theme switching persisted in `localStorage` under `backbone-theme` (`backbone-light` / `backbone-dark`), honoring `prefers-color-scheme`

## GUI prototype

Backbone has no compiled GUI; its admin surface is the HTMX dashboard served at `/`. The interactive HTML prototype lives under
`docs/07-ui-ux-design/prototypes/html/`:

- `00-components.html` — admin dashboard window (sidebar nav, collections table with healthy/large status badges, New collection/Edit/Delete actions, toast), light and dark themes

Screenshots are generated with Playwright via `prototypes/screenshot.sh`.

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
