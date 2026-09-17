# Backbone — FEATURE-12: Pub/Sub

## 1. Summary

Topics and messages with live fan-out to SSE subscribers.

## 2. Behaviour

- `internal/pubsub` — topics and messages stored in SQLite.
- Publishing fans out to all SSE subscribers of `GET /api/pubsub/{name}/stream`.
- Fires a `pubsub.message.create` webhook event on publish.

## 3. Acceptance criteria

- Publish a message; SSE subscribers receive it.
- `pubsub.message.create` webhook fires on publish.
