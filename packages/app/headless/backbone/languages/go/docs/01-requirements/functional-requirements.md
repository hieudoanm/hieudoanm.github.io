# Backbone — Functional Requirements

Each requirement is testable and maps to acceptance criteria in [`09-testing-strategy.md`](../09-testing-strategy.md).

## FR-001 — Single static binary

`make build` produces `bin/backbone` with `CGO_ENABLED=0`, so the binary is self-contained and runs on any Linux/amd64 host (and the user's build platform).

## FR-002 — SQLite storage

All persistence lives in `internal/store`. SQLite at `$BACKBONE_DATA/data.db` (default `~/.backbone/`). Migrations run on startup via `store.MigrateDB`.

## FR-003 — REST API

The HTTP server uses `net/http` with Go 1.22 route patterns. All API endpoints live under `/api`.

## FR-004 — Authentication

`POST /api/auth/register` and `POST /api/auth/login`. Passwords hashed with bcrypt; HS256 JWT tokens valid 72h. `JWTSecret()` reads `JWT_SECRET` (dev default `dev-secret-change-in-production`).

## FR-005 — Role-based access control

Role-based permissions (`admin`, `editor`, `viewer`) per collection, checked via the `permissions` table.

## FR-006 — Admin dashboard

HTMX + Tailwind UI served at `/`. Manages collections, buckets, files, webhooks, secrets, cron jobs, WS connections, cache, notifications. No build step required.

## FR-007 — Collections and records

SQLite-backed collections with dynamic JSON schemas (`string`, `number`, `integer`, `boolean`, `array`, `object`, `email`, `url`, optional `?`). Full CRUD, pagination (`page`, `per_page`), search; schema updates trigger column migrations.

## FR-008 — Files and buckets

Buckets + multipart uploads (max 10 MB), download, delete, stored under `<dataDir>/uploads`.

## FR-009 — Image thumbnails

256px JPEG thumbnails for jpeg/png/webp/gif via `golang.org/x/image`.

## FR-010 — WebSockets

`/ws` WebSocket: broadcast, per-client send, connection + message history, 30s ping/keepalive via `gorilla/websocket`.

## FR-011 — Server-Sent Events

SSE streams for logs, notifications, and pubsub via `internal/realtime` SSE hub.

## FR-012 — Webhooks

Webhooks fired on record/collection/bucket/notification/log/secret/cronjob/pubsub events. Optional `X-Webhook-Signature-256` HMAC-SHA256 signature; delivery attempts recorded in `webhook_logs`.

## FR-013 — Cron jobs

Cron jobs (`*/5 * * * *` schedules) executed in-process via `robfig/cron/v3`, manual trigger, per-job run logs.

## FR-014 — Encrypted secrets

Values encrypted with AES-256-GCM at rest. Key loaded from `BACKBONE_SECRETS_KEY`, else persisted to `<dataDir>/secrets.key`. List omits values; single GET decrypts.

## FR-015 — Pub/sub

Topics and messages stored in SQLite. Publishing fans out to SSE subscribers of `GET /api/pubsub/{name}/stream` and fires a `pubsub.message.create` webhook event.

## FR-016 — Structured logs

Log CRUD with SSE stream for live tailing. Levels: `debug`, `info`, `warn`, `error`.

## FR-017 — Notifications

Notifications (`info`, `success`, `warning`, `error`) with read-marking and an SSE stream.

## FR-018 — Cache

In-memory TTL cache with list/get/set/flush + `GET /api/cache/stats`; entries persist across restarts via the SQLite `cache` table.

## FR-019 — Import/export

JSON export/import of all data; SQLite backup download (admin only).

## FR-020 — OpenAPI/Swagger

`GET /api/openapi.json` returns the OpenAPI document; `GET /api/docs` serves the Swagger UI.

## FR-021 — Healthcheck

`GET /api/health` returns `{"status":"ok"}` unconditionally (unauthenticated) for Docker healthchecks and orchestration.

## FR-022 — Docker packaging

Two-stage `Dockerfile`: `golang:1.27-alpine` builder compiles the binary (`CGO_ENABLED=0`); `scratch` runtime ships `/backbone`, `/public` dashboard, `PORT=8080`, `BACKBONE_DATA=/data`, `VOLUME /data`, healthcheck against `GET /api/health`.

## FR-023 — CI pipeline

Reusable GitHub Actions Go template: `ci` (gofmt check, `make lint`, `make test`, `make build-all`, upload `bin/*`) and `publish` (rolling GitHub Release from uploaded binaries).
