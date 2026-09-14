# Roadmap

> Phased roadmap. Shipped items map to the backbone A–Z feature table.

## Phase 1 — Foundation (shipped)

- [x] Go module layout (`main.go` + `internal/` + `tests/`)
- [x] SQLite storage with migrations (`internal/store`)
- [x] Admin Dashboard (`GET /`, HTMX + Tailwind)
- [x] REST API with `net/http` method+path routing
- [x] Middleware: rate limit, auth (JWT), RBAC, content-type validation
- [x] OpenAPI/Swagger (`GET /api/openapi.json`, `GET /api/docs`)
- [x] Import/export of all data, SQLite backup download
- [x] CI (`go vet`, `go test`, binary build + rolling GitHub Release)
- [x] Docker packaging (`Dockerfile`, `docker-compose.yml` for Go + Rust)

## Phase 2 — Core modules (shipped)

- [x] BackboneAuth — register/login, bcrypt, HS256 JWT (72h)
- [x] BackboneBase — collections/records, dynamic JSON schemas, column
      migrations, pagination + search
- [x] BackboneFiles — buckets, uploads, downloads, image thumbnails
- [x] BackboneHooks — webhooks with HMAC signing and delivery logs
- [x] BackboneJobs — cron jobs, manual triggers, run logs
- [x] BackboneLogs — structured logs with SSE stream
- [x] BackboneNotify — notifications with SSE stream
- [x] BackbonePubSub — topics/messages with live fan-out
- [x] BackboneSockets — `/ws` with broadcast, history, keepalive
- [x] BackboneVault — AES-256-GCM encrypted secrets
- [x] BackboneCache — in-memory TTL cache with persistence

## Phase 3 — Reliability & ops

- [ ] BackboneQueues — durable async job queues (SQS-style)
- [ ] Rate limiting + security hardening audit
- [ ] Structured logging to file/stdout with levels and rotation
- [ ] Backup/restore CLI (`backbone backup`, `backbone restore`)
- [ ] Config via config file/CLI flags as an alternative to env vars
- [ ] Prometheus metrics endpoint (`/api/metrics`)

## Phase 4 — Production scalability

- [ ] Pluggable SQLite → Postgres backends
- [ ] Clustered WebSocket/SSE fan-out via pub/sub broker
- [ ] In-memory cache → Redis adapter
- [ ] File storage → S3-compatible adapter
- [ ] Auth → external OIDC/SSO adapters
- [ ] Horizontal scaling + leader election for cron/webhooks

## Phase 5 — Ecosystem

- [ ] Kotlin (Ktor) implementation parity with the Go module
- [ ] Cross-language client SDKs (Go, Rust)
- [ ] Terraform/Helm deploys for production
- [ ] Managed hosted offering (Auth→Cognito, DB→RDS, Files→S3,
      Notify→SNS, Jobs→EventBridge, Logs→CloudWatch as the parent
      `README.md` roadmap sketches)
