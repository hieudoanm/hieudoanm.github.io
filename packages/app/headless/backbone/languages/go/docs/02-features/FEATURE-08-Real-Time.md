# Backbone — FEATURE-08: Real-Time (WebSocket + SSE)

## 1. Summary

Live updates via WebSocket (`/ws`) and Server-Sent Events.

## 2. Behaviour

- `internal/realtime` provides `NewWSHub` (`/ws`) and `NewSSEHub` (notification/log/pubsub streams).
- WS: broadcast, per-client send, connection + message history, 30s ping/keepalive.
- SSE: live tailing of logs, notifications, pubsub messages.

## 3. Acceptance criteria

- `/ws` accepts connections and broadcasts messages.
- SSE streams deliver live log/notification/pubsub events.
- WS keepalive (30s ping) keeps connections open.
