# Backbone — FEATURE-13: Logs & Notifications

## 1. Summary

Structured logs and notifications with SSE streams.

## 2. Behaviour

- `internal/log` — log CRUD with SSE stream; levels: `debug`, `info`, `warn`, `error`.
- `internal/notification` — notifications (`info`, `success`, `warning`, `error`) with read-marking and SSE stream.
- Both integrate with `s.logHub` / `s.sseHub`.

## 3. Acceptance criteria

- Log entries stream live via SSE.
- Notifications can be marked as read.
- Both expose SSE streams for live tailing.
