# Backbone — Product Specification

Product strategy · Functional requirements · Architecture · Data model · Delivery roadmap

> This document is the product-strategy source. The normative implementation set is [`00`–`12`](#normative-documents). Where this document and the numbered documents disagree on implementation detail, the numbered documents govern.

## Normative documents

| #   | Document                                                 | Governs                                                      |
| --- | -------------------------------------------------------- | ------------------------------------------------------------ |
| 00  | [`00-overview.md`](00-overview.md)                       | Project vision and scope                                     |
| 01  | [`01-requirements.md`](01-requirements.md)               | Functional/non-functional requirements                       |
| 02  | [`02-features.md`](02-features.md)                       | User-visible behaviour                                       |
| 03  | [`03-user-stories.md`](03-user-stories.md)               | User goals and acceptance scenarios                          |
| 04  | [`04-architecture.md`](04-architecture.md)               | Module boundaries, request lifecycle, tenancy                |
| 05  | [`05-data-model.md`](05-data-model.md)                   | Schema, constraints, state transitions                       |
| 06  | [`06-api-specification.md`](06-api-specification.md)     | REST contract, status codes, error envelope                  |
| 07  | [`07-ui-ux-design.md`](07-ui-ux-design.md)               | UI tokens, layout, states, accessibility                     |
| 08  | [`08-tech-stack.md`](08-tech-stack.md)                   | Allowed technologies and dependency policy                   |
| 09  | [`09-testing-strategy.md`](09-testing-strategy.md)       | Test layers, fixtures, acceptance criteria                   |
| 10  | [`10-implementation-plan.md`](10-implementation-plan.md) | Phased delivery plan                                         |
| 11  | [`11-deployment.md`](11-deployment.md)                   | CI, Docker, and local development                            |
| 12  | [`12-operations.md`](12-operations.md)                   | Operations: backup, monitoring, security, rollback, recovery |

---

## 1. Product vision

**Backbone** is a lightweight Back-end as a Service in Go — a single static binary that bundles SQLite storage, a REST API, an admin dashboard (HTMX + Tailwind), WebSockets, SSE, cron jobs, webhooks, encrypted secrets, and pub/sub.

Run it anywhere. Backbone is a Supabase/PocketBase-style backend you run yourself, backed by a single SQLite file.

## 2. Target users

| Persona            | Primary need                                  | Desired outcome                            |
| ------------------ | --------------------------------------------- | ------------------------------------------ |
| Developer          | Self-hosted backend with minimal ops          | Single binary, SQLite, instant API + dashboard |
| Operator           | Run and maintain a BaaS                       | Docker image, healthchecks, backup/restore |

Primary persona: a developer who wants a full-featured backend (auth, database, files, real-time, webhooks, cron) without managing a cloud account.

## 3. Scope and priorities

- **P0** — Core platform: necessary for the first usable release.
- **P1** — Enhancement: important for a complete experience.

The first release delivers one complete BaaS: auth, dynamic collections/records, files, real-time streams, webhooks, cron jobs, encrypted secrets, pub/sub, logs, notifications, cache, and an admin dashboard.

## 4. Functional requirements

See [`01-requirements.md`](01-requirements.md) for the complete requirements specification.

### P0 — Core platform

SQLite storage with migrations, REST API (`net/http`), auth (bcrypt + HS256 JWT), RBAC, admin dashboard, collections/records with dynamic schemas, files/buckets, WebSocket + SSE streams, webhooks with HMAC, cron jobs, encrypted secrets, pub/sub, logs, notifications, cache, import/export, Docker packaging, CI.

### P1 — Enhancement

Durable async job queues, Prometheus metrics, config file/CLI flags, pluggable Postgres backend, clustered WS/SSE fan-out, Redis/S3 adapters, OIDC/SSO, horizontal scaling.

## 5. User journeys

### Journey A — Run a self-hosted backend

Goal: stand up a BaaS in minutes.

1. Download the static binary (or run the Docker image).
2. Run `./backbone` — it opens SQLite at `~/.backbone/backbone.db` and serves on `:8080`.
3. Register the first user via the admin dashboard at `/`.
4. Manage collections, records, files, webhooks, cron jobs, and secrets from the dashboard or REST API.

### Journey B — Build an app on the REST API

Goal: use Backbone as the backend for a client application.

1. `POST /api/auth/register` / `POST /api/auth/login` to get a JWT.
2. Call `POST /api/collections` to define a dynamic schema.
3. `POST /api/records` to create records; `GET /api/records` with pagination/search.
4. Subscribe to real-time updates via `/ws` or `/api/pubsub/{name}/stream`.
5. Receive webhooks on record/collection/bucket events.

## 6. Application structure

| Area            | Purpose                                            |
| --------------- | -------------------------------------------------- |
| Admin dashboard | HTMX + Tailwind UI at `/` — collections, records, files, webhooks, secrets, cron, cache, notifications |
| REST API        | Full API under `/api` — auth, collections, records, buckets, pubsub, WS/SSE streams |
| OpenAPI/Swagger | `GET /api/openapi.json` and `GET /api/docs`        |

## 7. Technical architecture

### 7.1 System design

Backbone is a **single Go binary** with SQLite storage. All persistence lives in `internal/store`; handlers live in `internal/httpapi`; feature logic lives in `internal/<feature>`. Real-time is provided by `internal/realtime` (WS hub + SSE hub).

```text
client → http.ServeMux
  ├─ public handlers (/, /ws, SSE streams)
  └─ /api/* → rateLimit → auth (JWT) → protected mux
       └─ per-route RBAC + content-type validation
```

### 7.2 Technology stack

| Layer            | Technology                                         | Responsibility                            |
| ---------------- | -------------------------------------------------- | ----------------------------------------- |
| Language         | Go 1.26+ (module `github.com/hieudoanm/backbone`)  | Server, all features                      |
| HTTP             | Standard `net/http` with Go 1.22 route patterns    | Routing, handlers, middleware             |
| Database         | SQLite via `modernc.org/sqlite` (pure Go, no CGO)  | All persistence                           |
| Auth             | bcrypt passwords, HS256 JWT (`golang-jwt/jwt/v5`)   | Register/login, 72h tokens                |
| Encryption       | AES-256-GCM for secret values at rest              | Encrypted secrets                         |
| WebSocket        | `gorilla/websocket` with ping/keepalive            | `/ws` broadcast, history                  |
| Cron             | `robfig/cron/v3`                                   | Scheduled jobs                            |
| Frontend         | HTMX + Tailwind (CDN) admin dashboard in `public/` | Admin UI, no build step                   |
| Testing          | Standard `go test`, table-driven tests             | Unit + E2E                                |

## 8. Current implementation status

See [`AGENTS.md`](AGENTS.md) and [`10-implementation-plan.md`](10-implementation-plan.md) for the implementation snapshot and phased plan.

### Shipped (Phase 1–2)

- Go module layout (`main.go` + `internal/` + `tests/`)
- SQLite storage with migrations
- Admin Dashboard (`GET /`, HTMX + Tailwind)
- REST API with `net/http` method+path routing
- Middleware: rate limit, auth (JWT), RBAC, content-type validation
- OpenAPI/Swagger (`GET /api/openapi.json`, `GET /api/docs`)
- Import/export, SQLite backup download
- CI (`go vet`, `go test`, binary build + rolling GitHub Release)
- Docker packaging
- All core modules: Auth, Base, Files, Hooks, Jobs, Logs, Notify, PubSub, Sockets, Vault, Cache

## 9. Non-functional requirements

See [`01-requirements.md`](01-requirements.md) for the complete NFR specification.

### Key targets

- Single static binary (`CGO_ENABLED=0`), no runtime dependencies.
- SQLite at `$BACKBONE_DATA/data.db` (default `~/.backbone/`).
- Healthcheck `GET /api/health` returns `{"status":"ok"}` unauthenticated.
- Docker image: multi-stage, `scratch` runtime, `VOLUME /data`, healthcheck.

## 10. Design and UX

See [`07-ui-ux-design.md`](07-ui-ux-design.md) for complete design specifications.

### Design principles

- Admin dashboard: HTMX + Tailwind CSS served at `/`, no build step.
- Responsive, clean, technical interface.
- All data manageable from dashboard or REST API.

## 11. Testing strategy

See [`09-testing-strategy.md`](09-testing-strategy.md) for complete testing strategy.

### Test layers

- Unit: colocated `*_test.go`, table-driven, behaviour-spec names.
- `httpapi`: full HTTP surface through `newTestServer` + `newTestDB`.
- `main_test.go`: re-executes the binary as a subprocess (`GO_MAIN_TEST=1`).
- `tests/`: end-to-end CRUD over HTTP against the built binary.

## 12. Deployment

See [`11-deployment.md`](11-deployment.md) for the complete deployment strategy and [`12-operations.md`](12-operations.md) for ongoing operations.

### Options

- Local: `go build -o bin/backbone .` then `./bin/backbone`.
- Docker: multi-stage `Dockerfile` into `scratch` image.
- CI: GitHub Actions reusable Go template (ci + publish stages).

## 13. Contributing

See [`AGENTS.md`](AGENTS.md) for development setup and guidelines.

### Repository conventions

- Go: `go build`, `go test`, `go vet`, `gofmt`
- Docs: numbered `docs/00`–`12` govern implementation detail
- Generated `bin/` output is gitignored

## 14. License

See [LICENSE](LICENSE).
