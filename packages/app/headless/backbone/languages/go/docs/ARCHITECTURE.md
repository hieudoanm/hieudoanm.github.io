# Architecture

## Tech Stack

| Layer      | Choice                                             |
| ---------- | -------------------------------------------------- |
| Language   | Go 1.26+ (module `github.com/hieudoanm/backbone`)  |
| HTTP       | Standard `net/http` with Go 1.22 route patterns    |
| Database   | SQLite via `modernc.org/sqlite` (pure Go, no CGO)  |
| Auth       | bcrypt passwords, HS256 JWT (`golang-jwt/jwt/v5`)  |
| Encryption | AES-256-GCM for secret values at rest              |
| WebSocket  | `gorilla/websocket` with ping/keepalive            |
| Cron       | `robfig/cron/v3`                                   |
| Frontend   | HTMX + Tailwind (CDN) admin dashboard in `public/` |
| Testing    | Standard `go test`, table-driven tests             |

## Directory Structure

```txt
go/
├── main.go              # Server entrypoint (package main)
├── main_test.go         # Entrypoint tests incl. subprocess startup test
├── internal/
│   ├── auth/            # bcrypt + JWT issue/validate (JWTSecret, RegisterUser, LoginUser)
│   ├── cache/           # In-memory TTL cache with SQLite persistence
│   ├── cron/            # CronJobs: schedule execution + run logs
│   ├── events/          # Webhook event-type constants + fan-out
│   ├── httpapi/         # Server, routes, handlers, middleware
│   ├── id/              # Public ID generation
│   ├── log/             # Log CRUD + SSE hub integration
│   ├── notification/    # Notifications CRUD + SSE hub integration
│   ├── pubsub/          # Topics + messages (hub-generic bus)
│   ├── rbac/            # Role↔collection permission checks
│   ├── realtime/        # WS hub and SSE hub
│   ├── secrets/         # AES-256-GCM encrypt/decrypt + key management
│   ├── store/           # SQLite schema, migrations, low-level store funcs
│   ├── validation/      # Schema validation helpers
│   └── webhook/         # EventPayload, event→payload builders, delivery
├── tests/               # End-to-end tests against a built binary
├── public/              # Admin dashboard (HTMX + Tailwind)
└── docs/                # This documentation set
```

## Entrypoint (`main.go`)

The module root is `package main`. `main.go`:

1. Opens SQLite (`store.OpenDB`) in `BACKBONE_DATA` (default `~/.backbone/backbone.db`)
2. Runs migrations (`store.MigrateDB`)
3. Loads or creates the AES-256 key (`secrets.GetOrCreateKey`)
4. Builds the HTTP server (`httpapi.NewServer`) and serves on `PORT` (default `8080`)
5. Prints local + network URLs; shuts down gracefully on `SIGINT`/`SIGTERM`

## Request Flow

```
client → http.ServeMux
  ├─ public handlers (/, /ws, SSE streams)
  └─ /api/* → rateLimit → auth (JWT) → protected mux
       └─ per-route RBAC + content-type validation
```

- `rateLimitMiddleware`: token bucket (200 tokens, refill rate-limited) keyed per IP
- `authMiddleware`: validates `Authorization: Bearer <token>` via `auth.ValidateToken`
- `rbacMiddleware("admin", ...)`: checks role ↔ collection from `permissions` table
- `validateContentType`: JSON requests must send `application/json`

## Modules

### BackboneAuth (JWT)

`internal/auth` — register/login into `users`, password hashing with bcrypt, HS256
tokens valid 72h. `JWTSecret()` reads `JWT_SECRET` (dev default
`dev-secret-change-in-production`).

### BackboneBase (SQLite)

`internal/store` — all persistence lives here: users, collections, records,
buckets, files, webhooks, secrets, cronjobs, ws connections, ws messages,
cache, notifications, logs, pubsub topics/messages, permissions. On-disk SQLite
in `BACKBONE_DATA`.

### BackboneCache

`internal/cache` — TTL cache (eviction sweep periodic), entries copied to the
SQLite `cache` table so restarts survive.

### BackboneFiles

`internal/httpapi/buckets.go` + `image.go` — multipart upload to disk under
`<dataDir>/uploads`, listing, download, delete, and image thumbnail generation
(JPEG 256px) for jpeg/png/webp/gif via `golang.org/x/image`. Max upload 10 MB.

### BackboneHooks

`internal/webhook` — event types (`record.*`, `collection.*`, `bucket.*`,
`notification.*`, `log.*`, `secret.*`, `cronjob.*`, `pubsub.*`). Handlers
dispatch through `Dispatch(eventType, payload)` with HMAC-SHA256 signature in
`X-Webhook-Signature-256` when a secret is configured. Delivery attempts are
recorded in `webhook_logs`.

### BackboneJobs

`internal/cron` — CRUD + manual `/run`, plus an in-process scheduler that checks
due jobs every interval and fires due cron jobs via `events` fan-out.

### BackboneLogs

`internal/log` + `s.logHub` — structured log CRUD with SSE stream. Levels:
`debug`, `info`, `warn`, `error`.

### BackboneNotify

`internal/notification` + `s.sseHub` — notification CRUD with SSE stream.
Types: `info`, `success`, `warning`, `error`.

### BackbonePubSub

`internal/pubsub` — topics and messages stored in SQLite. Publishing a message
fans out to all SSE subscribers of `GET /api/pubsub/{name}/stream` and fires a
`pubsub.message.create` webhook event.

### BackboneSockets

`internal/realtime` — `wsHub` for `/ws` (broadcast, per-client send, message
history, ping/keepalive) and `sseHub` for notification/log/pubsub streams.

### BackboneVault

`internal/secrets` — values encrypted with AES-256-GCM at rest. Key loaded from
`BACKBONE_SECRETS_KEY`, else persisted to `<dataDir>/secrets.key`. List omits
values; single GET decrypts.

## Configuration

| Env                    | Default                           | Purpose                       |
| ---------------------- | --------------------------------- | ----------------------------- |
| `PORT`                 | `8080`                            | HTTP listen port              |
| `BACKBONE_DATA`        | `~/.backbone`                     | Data dir (`data.db`, uploads) |
| `JWT_SECRET`           | `dev-secret-change-in-production` | JWT signing key               |
| `BACKBONE_SECRETS_KEY` | (generated file)                  | AES-256 key for Secrets       |
