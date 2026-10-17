# Backbone — System Architecture

## 1. Purpose

This document describes the system architecture, component responsibilities, data flows, trust boundaries, and failure-recovery strategies for Backbone.

Backbone is a **single Go binary** with SQLite storage. All persistence lives in `internal/store`; handlers live in `internal/httpapi`; feature logic lives in `internal/<feature>`. Real-time is provided by `internal/realtime` (WS hub + SSE hub).

### Request flow

```
client → http.ServeMux
  ├─ public handlers (/, /ws, SSE streams)
  └─ /api/* → rateLimit → auth (JWT) → protected mux
       └─ per-route RBAC + content-type validation
```

- `rateLimitMiddleware`: token bucket (200 tokens, refill rate-limited) keyed per IP.
- `authMiddleware`: validates `Authorization: Bearer <token>` via `auth.ValidateToken`.
- `rbacMiddleware("admin", ...)`: checks role ↔ collection from `permissions` table.
- `validateContentType`: JSON requests must send `application/json`.

## 2. Architectural Style

### 2.1 Single binary, standard library HTTP

A single Go binary contains the HTTP server, SQLite storage, and all features. No external services, no message broker, no separate worker processes.

Logical packages:

- `main.go` — server entrypoint (package main): opens DB, migrates, loads AES key, builds HTTP server, serves on `PORT`.
- `internal/httpapi` — server, routes, handlers, middleware.
- `internal/store` — SQLite schema, migrations, low-level store funcs (owns all persistence).
- `internal/<feature>` — auth, cache, cron, events, log, notification, pubsub, realtime, secrets, webhook, rbac, id, validation.

Feature packages must NOT import `internal/httpapi` (avoid cycles). Webhook payload builders are exported from feature packages.

### 2.2 SQLite-first persistence

All data lives in one SQLite file at `$BACKBONE_DATA/data.db` (default `~/.backbone/`). Uploads under `<dataDir>/uploads`; AES key file `<dataDir>/secrets.key`.

### 2.3 Real-time hubs

`internal/realtime` provides `NewWSHub` (`/ws`) and `NewSSEHub` (notification/log/pubsub streams). PubSub publishes fan out to SSE subscribers via its hub.

## 3. Component Responsibilities

| Component    | Responsibility                                          |
| ------------ | ------------------------------------------------------- |
| `internal/auth`   | bcrypt + JWT issue/validate (`JWTSecret`, `RegisterUser`, `LoginUser`) |
| `internal/cache`  | In-memory TTL cache with SQLite persistence             |
| `internal/cron`   | CronJobs: schedule execution + run logs                 |
| `internal/events` | Webhook event-type constants + fan-out                  |
| `internal/httpapi`| Server, routes, handlers, middleware                    |
| `internal/id`     | Public ID generation                                    |
| `internal/log`    | Log CRUD + SSE hub integration                          |
| `internal/notification` | Notifications CRUD + SSE hub integration           |
| `internal/pubsub` | Topics + messages (hub-generic bus)                     |
| `internal/rbac`   | Role↔collection permission checks                       |
| `internal/realtime`| WS hub and SSE hub                                      |
| `internal/secrets`| AES-256-GCM encrypt/decrypt + key management            |
| `internal/store`  | SQLite schema, migrations, low-level store funcs        |
| `internal/validation`| Schema validation helpers                              |
| `internal/webhook`| EventPayload, event→payload builders, delivery          |

## 4. Request Lifecycle

### 4.1 Startup

1. `main.go` opens SQLite (`store.OpenDB`) in `BACKBONE_DATA` (default `~/.backbone/backbone.db`).
2. Runs migrations (`store.MigrateDB`).
3. Loads or creates the AES-256 key (`secrets.GetOrCreateKey`).
4. Builds the HTTP server (`httpapi.NewServer`) and serves on `PORT` (default `8080`).
5. Prints local + network URLs; shuts down gracefully on `SIGINT`/`SIGTERM`.

### 4.2 API request

1. Client hits `http.ServeMux`.
2. Public routes (`/`, `/ws`, SSE) handled directly.
3. `/api/*` routes pass through rateLimit → auth (JWT) → protected mux → per-route RBAC + content-type validation.
4. Handler delegates to `internal/<feature>` + `internal/store`.

### 4.3 Webhook delivery

1. Event occurs (record/create, etc.).
2. `internal/webhook.Dispatch(eventType, payload)` builds the payload.
3. Delivery attempted with optional HMAC-SHA256 signature.
4. Attempt recorded in `webhook_logs`.

## 5. Concurrency

- WS hub and SSE hub manage concurrent subscribers.
- SQLite handles concurrent reads/writes with its own locking.
- Cron scheduler checks due jobs on an interval; manual `/run` executes immediately.

## 6. Failure recovery

| Failure             | Behaviour                                                |
| ------------------- | -------------------------------------------------------- |
| SQLite unavailable  | Server fails to start; actionable error                  |
| AES key missing     | Key generated and persisted to `<dataDir>/secrets.key`   |
| Webhook delivery fails | Attempt logged in `webhook_logs`; retry not automatic   |
| Corrupt JWT         | Request rejected with 401                                |

## 7. Security boundaries

- JWT validated on every protected endpoint.
- RBAC enforces role ↔ collection per route.
- Secret values encrypted with AES-256-GCM at rest; list omits values.
- Webhooks signed with HMAC-SHA256 when a secret is configured.
- Rate limiting per IP (token bucket, 200 tokens).
- JSON requests require `application/json`.

## 8. Technology mapping

See [`08-tech-stack.md`](08-tech-stack.md).

## Cross-references

- Data model: [`05-data-model.md`](05-data-model.md)
- API: [`06-api-specification.md`](06-api-specification.md)
- Deployment: [`11-deployment.md`](11-deployment.md)
