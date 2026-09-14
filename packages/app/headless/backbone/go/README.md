# Backbone (Go)

> A lightweight Back-end as a Service — SQLite-backed storage, a full REST API,
> an Admin Dashboard, WebSockets, SSE, cron jobs, webhooks, encrypted secrets
> and pub/sub, all in a single static Go binary.

## Features

- **Database** — dynamic JSON-schema collections with column migrations,
  paginated record CRUD, search
- **Auth** — register/login with bcrypt + HS256 JWT
- **Real-time** — WebSocket `/ws` (broadcast/history), SSE streams for
  notifications, logs and pub/sub
- **Automation** — cron jobs with manual triggers, webhooks with HMAC signing,
  pub/sub topics and messages
- **Files** — buckets, uploads, downloads, image thumbnails
- **Ops** — encrypted secrets (AES-256-GCM), in-memory cache, structured logs,
  RBAC permissions, JSON import/export, SQLite backup, OpenAPI + Swagger
- **Admin Dashboard** — HTMX + Tailwind UI served at `/`

See [docs/](./docs/) for architecture, contributing, downloads, packaging and
roadmap.

## Development

```bash
make build        # build bin/backbone (CGO_ENABLED=0)
make build-all    # cross-compile 4 platforms into bin/ (CGO_ENABLED=0)
make test         # go test ./...
make lint         # go vet ./...
make format       # go fmt ./...
make coverage     # HTML coverage report
make all          # format + lint + test + build
make install      # install to ~/bin/backbone
```

Run straight from source:

```bash
go build -o bin/backbone .
./bin/backbone     # → http://localhost:8080
```

## Docker

```bash
docker build -t backbone-server -f Dockerfile .
docker run -p 8080:8080 -v backbone-data:/data backbone-server
```

Docker Compose at the repo root runs both the Go (:8080) and Rust (:8081)
implementations.

## API Reference

All endpoints (except health, register, login, OpenAPI docs, Swagger UI, and
the dashboard) require:

```
Authorization: Bearer <token>
```

### Health

```bash
GET /api/health
# {"status":"ok"}
```

### Auth

```bash
POST /api/auth/register
{"email":"user@test.com","password":"pass123"}
# {"id":"...","email":"user@test.com","created_at":"...","updated_at":"..."}

POST /api/auth/login
{"email":"user@test.com","password":"pass123"}
# {"user":{"id":"...","email":"user@test.com","created_at":"...","updated_at":"..."},"token":"eyJ..."}
```

### Collections

```bash
POST /api/collections
{"name":"notes","schema":"{\"title\":\"string\",\"count?\":\"number\"}"}

GET /api/collections
GET /api/collections/notes
PATCH /api/collections/notes    # schema update triggers column migration
DELETE /api/collections/notes
```

Schema types: `string`, `number`, `integer`, `boolean`, `array`, `object`,
`email`, `url`. Append `?` for optional.

### Records

```bash
POST /api/collections/notes/records
{"data":{"title":"Hello","body":"World"}}

GET /api/collections/notes/records?page=1&per_page=20
GET /api/collections/notes/records?search=hello
GET /api/collections/notes/records/<id>
PATCH /api/collections/notes/records/<id>
DELETE /api/collections/notes/records/<id>
```

### Buckets & Files

```bash
POST /api/buckets       {"name":"avatars","is_public":false}
GET /api/buckets
GET /api/buckets/avatars
DELETE /api/buckets/avatars

POST /api/buckets/avatars/files           # multipart "file", max 10 MB
GET /api/buckets/avatars/files
GET /api/buckets/avatars/files/<id>
GET /api/buckets/avatars/files/<id>/thumb # jpeg/png/webp/gif → 256px JPEG
DELETE /api/buckets/avatars/files/<id>
```

### Webhooks

```bash
POST /api/webhooks
{"name":"order webhook","url":"https://example.com/hook","events":["record.create"],"secret":"mysecret"}

GET /api/webhooks
GET /api/webhooks/<id>
PATCH /api/webhooks/<id>
DELETE /api/webhooks/<id>
GET /api/webhooks/<id>/logs
```

Events: `record.*`, `collection.*`, `bucket.*`, `notification.create`,
`log.create`, `secret.*`, `cronjob.*`, `pubsub.*`. Deliveries include an
HMAC-SHA256 `X-Webhook-Signature-256` header when a secret is set.

### Secrets

Values are encrypted with AES-256-GCM at rest.

```bash
POST /api/secrets         {"name":"api key","value":"sk-...","scope":"general"}
GET /api/secrets          # value omitted from list
GET /api/secrets/<id>     # value decrypted
PATCH /api/secrets/<id>
DELETE /api/secrets/<id>
```

### Cron Jobs

```bash
POST /api/cronjobs
{"name":"ping healthcheck","schedule":"*/5 * * * *","command":"https://example.com/health","method":"GET","headers":"","body":"","is_active":true}

GET /api/cronjobs
GET /api/cronjobs/<id>
PATCH /api/cronjobs/<id>
DELETE /api/cronjobs/<id>
POST /api/cronjobs/<id>/run     # manual trigger
GET /api/cronjobs/<id>/logs
```

### WebSockets

```bash
GET /ws                          # upgrade

GET /api/websockets              # management API
GET /api/websockets/<id>
DELETE /api/websockets/<id>
POST /api/websockets/broadcast   {"content":"hello all"}
POST /api/websockets/<id>/send   {"content":"hello"}
GET /api/websockets/messages
GET /api/websockets/<id>/messages
```

### In-Memory Cache

```bash
POST /api/cache          {"key":"mykey","value":"myvalue","ttl":3600}
GET /api/cache
GET /api/cache/mykey
DELETE /api/cache/mykey
DELETE /api/cache        # flush all
GET /api/cache/stats     # total + expired
```

Cache supports TTL-based expiry with periodic eviction and SQLite persistence.

### Notifications

Types: `info`, `success`, `warning`, `error`.

```bash
POST /api/notifications   {"title":"Server Started","body":"...","type":"success"}
GET /api/notifications
GET /api/notifications/<id>
PATCH /api/notifications/<id>   # mark as read
DELETE /api/notifications/<id>
DELETE /api/notifications       # clear all
GET /api/notifications/stream   # SSE
```

### Logs

Levels: `debug`, `info`, `warn`, `error`.

```bash
POST /api/logs           {"level":"info","message":"User logged in","meta":{...}}
GET /api/logs
DELETE /api/logs
GET /api/logs/stream     # SSE
```

### Pub/Sub

```bash
POST /api/pubsub/topics   {"name":"orders"}
GET /api/pubsub/topics
GET /api/pubsub/topics/orders
DELETE /api/pubsub/topics/orders

POST /api/pubsub/topics/orders/messages   {"body":"New order received"}
GET /api/pubsub/topics/orders/messages
GET /api/pubsub/orders/stream             # SSE fan-out
```

### RBAC Permissions

Roles: `admin`, `editor`, `viewer`. Collection `*` grants the role globally.

```bash
POST /api/permissions   {"user_id":"<id>","collection":"*","role":"admin"}
GET /api/permissions
DELETE /api/permissions/<id>
```

### Import / Export / Backup

```bash
GET /api/export                  # full JSON export
POST /api/import?skip_existing=true
GET /api/backup                  # SQLite backup (admin only)
```

### OpenAPI / Swagger

```bash
GET /api/openapi.json
GET /api/docs                    # Swagger UI
```

## Configuration

| Env                    | Default                           | Purpose                |
| ---------------------- | --------------------------------- | ---------------------- |
| `PORT`                 | `8080`                            | Server port            |
| `BACKBONE_DATA`        | `~/.backbone`                     | Data dir               |
| `JWT_SECRET`           | `dev-secret-change-in-production` | JWT signing key        |
| `BACKBONE_SECRETS_KEY` | (generated file)                  | AES-256 key for Secrets|

## Architecture

- **Database:** SQLite via `modernc.org/sqlite` (pure Go, no CGO)
- **Routing:** standard `net/http` with method+path patterns
- **Auth:** bcrypt password hashing, HS256 JWT (72h expiry)
- **Encryption:** AES-256-GCM for secrets storage
- **Rate limiting:** token bucket per IP
- **Static files:** dashboard served from disk via `http.FileServer`
- **Middleware:** rate limiting, auth, RBAC, content-type validation
- **Cron:** `robfig/cron` scheduler with per-job run logs
- **WebSocket:** `gorilla/websocket` with ping/keepalive

## Documentation

| Document                              | Description                          |
| ------------------------------------- | ------------------------------------ |
| [Architecture](./docs/ARCHITECTURE.md)| Tech stack, module map, request flow |
| [Contributing](./docs/CONTRIBUTING.md)| Setup, commands, conventions, testing|
| [Downloads](./docs/DOWNLOADS.md)      | Binary, Docker image, or source      |
| [Packaging](./docs/PACKAGING.md)      | Build + CI artifact pipeline         |
| [Roadmap](./docs/ROADMAP.md)          | Phased feature roadmap               |