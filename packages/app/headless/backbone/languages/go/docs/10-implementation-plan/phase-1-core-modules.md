# Backbone — Phase 1: Core Modules

## Goal

Ship all A–Z feature modules: Auth, Base, Files, Hooks, Jobs, Logs, Notify, PubSub, Sockets, Vault, Cache.

## Deliverables

- `internal/auth` — register/login, bcrypt, HS256 JWT
- `internal/store` — collections, records, dynamic schemas
- `internal/httpapi/buckets.go` + `image.go` — files, thumbnails
- `internal/webhook` — HMAC signing, delivery logs
- `internal/cron` — scheduled jobs, run logs
- `internal/secrets` — AES-256-GCM encryption
- `internal/pubsub` — topics, messages, SSE fan-out
- `internal/log` + `internal/notification` — SSE streams
- `internal/realtime` — WS hub, SSE hub
- `internal/cache` — TTL cache with persistence
- Admin dashboard (HTMX + Tailwind) at `/`
- OpenAPI/Swagger at `/api/openapi.json`, `/api/docs`
- Import/export, SQLite backup download

## Acceptance criteria

- All A–Z modules ship with tests.
- Admin dashboard manages all features.
- `make all` passes.
