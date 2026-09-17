# Backbone — Project Overview

## 1. Project Summary

**Backbone** is a lightweight Back-end as a Service in Go — SQLite storage, REST API, Admin Dashboard, WebSockets, SSE, cron, webhooks, encrypted secrets and pub/sub, all in a single static binary.

Run it anywhere. Backbone is a Supabase/PocketBase-style backend you run yourself, backed by a single SQLite file.

The project showcases end-to-end backend engineering: a Go HTTP server, SQLite persistence, JWT auth, RBAC, real-time streams, scheduled jobs, webhook delivery, and an HTMX admin dashboard — all in one deployable artifact.

## 2. Problem Statement

Running a modern backend still involves stitching together too many services: auth, database, file storage, real-time, cron, webhooks, secrets, and an admin UI. A useful self-hosted BaaS needs to make it possible to:

- Download one binary and have a complete backend.
- Store everything in a single SQLite file.
- Manage data via a REST API or an admin dashboard.
- Stream real-time updates over WebSockets and SSE.
- Run scheduled jobs and deliver webhooks reliably.
- Encrypt secrets at rest.
- Deploy via a static binary or a `scratch` Docker image.

Backbone brings these capabilities together in one coherent, dependency-light package.

## 3. Product Vision

Build a polished, production-style self-hosted BaaS that demonstrates how modern Go engineering can support a complete backend-in-a-box.

The product should be sufficiently complete that a reviewer can download the binary, run it, register a user, define a collection, create records, and receive webhooks — all without a cloud account or external database.

The project should prioritise correctness of the storage layer, API stability, and operational clarity over the number of features.

## 4. Target Users

### 4.1 Developer

A person who wants a backend without managing infrastructure.

Primary needs:

- One binary, one SQLite file, zero external services.
- REST API and admin dashboard for data management.
- Auth, real-time, files, webhooks, cron, secrets out of the box.
- Deploy via binary or Docker.

### 4.2 Operator

A person responsible for running and maintaining the BaaS.

Primary needs:

- Healthcheck endpoint for orchestration.
- Backup/restore via SQLite file copy.
- Logs and notifications with SSE streams.
- Cross-platform static builds (Linux, macOS; amd64/arm64).

## 5. Product Goals

### Goal 1: Deliver a complete backend-in-a-box

A user can download one binary and have auth, database, files, real-time, webhooks, cron, and secrets ready to use.

### Goal 2: Demonstrate full-stack backend ownership

The implementation covers HTTP serving, SQLite schema/migrations, JWT auth, RBAC, real-time hubs, scheduled jobs, webhook delivery, and an admin UI.

### Goal 3: Keep ops simple

Single SQLite file, healthcheck endpoint, `scratch` Docker image, cross-platform builds.

### Goal 4: Keep the binary dependency-light

`CGO_ENABLED=0` static binary; pure-Go SQLite; no external runtime dependencies.

### Goal 5: Provide a maintainable codebase

Clear package boundaries (`internal/<feature>`), colocated table-driven tests, reproducible Docker builds, and documented engineering decisions.

## 6. Non-Goals

The initial release will not:

- Durable async job queues (SQS-style).
- Prometheus metrics endpoint.
- Config file/CLI flags (env vars only).
- Pluggable Postgres backend.
- Clustered WebSocket/SSE fan-out.
- Redis/S3 adapters.
- OIDC/SSO adapters.
- Horizontal scaling + leader election.
- Managed hosted offering.

These features may be considered later (Phase 3–5), but they must not compromise the initial delivery.

## 7. Primary User Workflow

1. Download the static binary (or run the Docker image).
2. Run `./backbone` — SQLite at `~/.backbone/`, HTTP on `:8080`.
3. Register the first user via the admin dashboard at `/`.
4. Define collections with dynamic JSON schemas.
5. Create, read, update, delete records via the API or dashboard.
6. Subscribe to real-time updates via `/ws` or SSE streams.
7. Configure webhooks and cron jobs.

Every stage should provide clear feedback via the dashboard or API responses.

## 8. Technology Direction

- **Language:** Go 1.26+, module `github.com/hieudoanm/backbone`.
- **HTTP:** Standard `net/http` with Go 1.22 route patterns.
- **Database:** SQLite via `modernc.org/sqlite` (pure Go, no CGO).
- **Auth:** bcrypt passwords, HS256 JWT (`golang-jwt/jwt/v5`).
- **Encryption:** AES-256-GCM for secret values at rest.
- **WebSocket:** `gorilla/websocket` with ping/keepalive.
- **Cron:** `robfig/cron/v3`.
- **Frontend:** HTMX + Tailwind (CDN) admin dashboard.
- **Testing:** Standard `go test`, table-driven tests.
- **Containerisation:** Multi-stage Dockerfile, `scratch` runtime.
- **CI/CD:** GitHub Actions reusable Go template.

## 9. Security and Privacy Principles

Security is part of the architecture even for self-hosted deployments.

The application must:

- Validate JWT on every protected endpoint.
- Enforce RBAC (role ↔ collection) per route.
- Encrypt secret values with AES-256-GCM at rest.
- Sign webhooks with HMAC-SHA256 when a secret is configured.
- Rate-limit per IP (token bucket).
- Require `application/json` for JSON requests.
- Never log raw secret values.

Backbone must not claim SOC 2, GDPR certification, or production compliance.

## 10. MVP Definition of Done

The canonical release definition of done lives in [`10-implementation-plan/definition-of-done.md`](10-implementation-plan/definition-of-done.md); this section summarises it and defers to it.

The minimum viable product is complete when:

- A developer can download/run the binary with no external services.
- A user can register, log in, and access the admin dashboard.
- Collections and records work via REST API with dynamic schemas.
- Files upload/download with thumbnails.
- Real-time updates stream via WebSocket and SSE.
- Webhooks fire with HMAC signatures and delivery logs.
- Cron jobs run on schedule with per-job run logs.
- Secrets are encrypted at rest.
- `go vet`, `go test`, `gofmt` are clean.
- Docker image builds and serves `/api/health`.

## 11. Success Criteria

| Area            | Success criterion                                                                 |
| --------------- | --------------------------------------------------------------------------------- |
| User experience | A reviewer completes binary → dashboard → CRUD → webhook without assistance.      |
| API             | Full REST surface under `/api` with OpenAPI/Swagger docs.                         |
| Auth            | Register/login with bcrypt + HS256 JWT, 72h expiry.                              |
| Database        | SQLite with migrations; dynamic JSON schemas; pagination + search.                |
| Real-time       | WebSocket broadcast/history; SSE streams for logs, notifications, pubsub.         |
| Testing         | Colocated table-driven tests; E2E `tests/` package green.                         |
| DevOps          | Static binary, `scratch` Docker image, CI with rolling release.                  |

## 12. Guiding Principles

1. **One binary:** a single static artifact with no external runtime dependencies.
2. **SQLite first:** one file for all persistence; simple to back up and operate.
3. **API + dashboard:** everything manageable via REST or the HTMX admin UI.
4. **Real-time by default:** WebSocket and SSE streams for live updates.
5. **Security by default:** JWT auth, RBAC, AES-256-GCM secrets, HMAC webhooks, rate limiting.
6. **Dependency-light:** pure-Go SQLite, `CGO_ENABLED=0`, no CGO/glibc requirements.
7. **Ops-friendly:** healthcheck, `scratch` Docker image, backup via file copy.
8. **No production compliance claims:** Backbone is a self-hosted BaaS demo, not a certified platform.
