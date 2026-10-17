# Backbone — Functional and Non-Functional Requirements

See [`00-overview.md`](00-overview.md) for the product vision and [`AGENTS.md`](../AGENTS.md) for contribution conventions.

## Functional Requirements (FR)

| ID    | Requirement                                                        | Priority |
| ----- | ------------------------------------------------------------------ | -------- |
| FR-001 | Single static Go binary (`CGO_ENABLED=0`) with no runtime deps.    | P0       |
| FR-002 | SQLite storage with migrations at `$BACKBONE_DATA/data.db`.        | P0       |
| FR-003 | REST API under `/api` with `net/http` method+path routing.         | P0       |
| FR-004 | Auth: register/login with bcrypt + HS256 JWT (72h expiry).         | P0       |
| FR-005 | RBAC: role ↔ collection permission checks per route.               | P0       |
| FR-006 | Admin dashboard (HTMX + Tailwind) served at `/`, no build step.    | P0       |
| FR-007 | Collections/records with dynamic JSON schemas, pagination, search. | P0       |
| FR-008 | Files/buckets: multipart upload (max 10 MB), download, delete.     | P0       |
| FR-009 | Image thumbnails (256px JPEG) for jpeg/png/webp/gif.               | P0       |
| FR-010 | Real-time: WebSocket (`/ws`) with broadcast, history, keepalive.   | P0       |
| FR-011 | Real-time: SSE streams for logs, notifications, pubsub.            | P0       |
| FR-012 | Webhooks with HMAC-SHA256 signatures and delivery logs.            | P0       |
| FR-013 | Cron jobs with in-process scheduler, manual triggers, run logs.    | P0       |
| FR-014 | Encrypted secrets (AES-256-GCM) at rest.                           | P0       |
| FR-015 | Pub/sub topics and messages with live fan-out.                     | P0       |
| FR-016 | Structured logs (debug/info/warn/error) with SSE stream.          | P0       |
| FR-017 | Notifications (info/success/warning/error) with read-marking.      | P0       |
| FR-018 | In-memory TTL cache with SQLite persistence.                       | P0       |
| FR-019 | Import/export of all data; SQLite backup download (admin only).    | P0       |
| FR-020 | OpenAPI/Swagger: `GET /api/openapi.json`, `GET /api/docs`.         | P0       |
| FR-021 | Healthcheck: `GET /api/health` returns `{"status":"ok"}`.          | P0       |
| FR-022 | Docker packaging: multi-stage `Dockerfile`, `scratch` runtime.     | P0       |
| FR-023 | CI: gofmt, `go vet`, `go test`, binary build, rolling GitHub Release. | P0   |

## Non-Functional Requirements (NFR)

| ID    | Requirement                                                        | Priority |
| ----- | ------------------------------------------------------------------ | -------- |
| NFR-001 | Single static binary; runs on any Linux/amd64 host (and build platform). | P0 |
| NFR-002 | Pure-Go SQLite (`modernc.org/sqlite`); no CGO, no glibc/musl.      | P0       |
| NFR-003 | Healthcheck endpoint unauthenticated for orchestration probing.    | P0       |
| NFR-004 | Docker image: multi-stage build, `scratch` runtime, `VOLUME /data`.| P0       |
| NFR-005 | Cross-platform builds: Linux, macOS (amd64/arm64).                 | P0       |
| NFR-006 | Errors handled explicitly; `error` last return value; no `_ = err`.| P0       |
| NFR-007 | No stack traces, credentials, or secrets in errors/logs.           | P0       |
| NFR-008 | Table-driven tests with behaviour-spec names; colocated `*_test.go`.| P0      |
| NFR-009 | E2E `tests/` package runs CRUD over HTTP against the built binary. | P0       |
| NFR-010 | Admin dashboard requires no build step (HTMX + Tailwind CDN).      | P0       |

## Cross-references

- Overview: [`00-overview.md`](00-overview.md)
- Features: [`02-features.md`](02-features.md)
- Architecture: [`04-architecture.md`](04-architecture.md)
- Data model: [`05-data-model.md`](05-data-model.md)
- API: [`06-api-specification.md`](06-api-specification.md)
- Testing: [`09-testing-strategy.md`](09-testing-strategy.md)
