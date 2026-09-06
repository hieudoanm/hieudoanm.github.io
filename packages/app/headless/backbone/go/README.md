# BackboneServer (Go)

A lightweight Supabase/PocketBase-like backend in Go with SQLite, featuring 22+ modules.

| Language | Status | Tests |
| -------- | ------ | ----- |
| Go       | ✅     | 74    |
| Rust     | ✅     | 74    |

## Quick start

```bash
make build
./bin/backbone
# → http://localhost:8080
```

## Admin Dashboard

A web-based admin UI is served at `GET /`. Built with HTMX + Tailwind CSS (CDN).

Manage collections, records, buckets, files, webhooks, secrets, cron jobs, and more — all from the browser. No build step required.

## API Reference

All endpoints (except health, register, login, OpenAPI docs, and Swagger UI) require:

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
# Create (optionally with JSON schema)
POST /api/collections
{"name":"notes","schema":"{\"title\":\"string\",\"count?\":\"number\"}"}
# {"name":"notes","schema":"{...}","created_at":"...","updated_at":"..."}

# List
GET /api/collections
# [{"name":"notes","schema":"{}","created_at":"...","updated_at":"..."}]

# Get
GET /api/collections/notes

# Update schema (triggers column migration)
PATCH /api/collections/notes
{"schema":"{\"title\":\"string\",\"body\":\"string\"}"}

# Delete
DELETE /api/collections/notes
```

Schema types: `string`, `number`, `integer`, `boolean`, `array`, `object`, `email`, `url`. Append `?` for optional.

### Records

```bash
# Create
POST /api/collections/notes/records
{"data":{"title":"Hello","body":"World"}}
# {"id":"...","data":{"title":"Hello","body":"World"},"collection":"notes","created_at":"...","updated_at":"..."}

# List (paginated)
GET /api/collections/notes/records?page=1&per_page=20
# {"records":[...],"total":1,"page":1,"per_page":20,"total_pages":1}

# List with search
GET /api/collections/notes/records?search=hello

# Get
GET /api/collections/notes/records/<id>

# Update
PATCH /api/collections/notes/records/<id>
{"data":{"title":"Updated"}}

# Delete
DELETE /api/collections/notes/records/<id>
```

### Buckets (File Storage)

```bash
POST /api/buckets
{"name":"avatars","is_public":false}

GET /api/buckets
GET /api/buckets/avatars
DELETE /api/buckets/avatars
```

### Files

```bash
# Upload (multipart/form-data with "file" field, max 10 MB)
POST /api/buckets/avatars/files

# List
GET /api/buckets/avatars/files?page=1&per_page=20
# {"files":[...],"total":1,"page":1,"per_page":20,"total_pages":1}

# Download
GET /api/buckets/avatars/files/<id>

# Thumbnail (image types: jpeg, png, webp, gif → 256px JPEG)
GET /api/buckets/avatars/files/<id>/thumb

# Delete
DELETE /api/buckets/avatars/files/<id>
```

### Webhooks

```bash
# Create (events: record.create, record.update, record.delete,
#        collection.create, collection.delete,
#        bucket.create, bucket.delete,
#        notification.create, log.create,
#        secret.create, secret.update, secret.delete,
#        cronjob.create, cronjob.delete,
#        pubsub.topic.create, pubsub.topic.delete,
#        pubsub.message.create)
POST /api/webhooks
{"name":"order webhook","url":"https://example.com/hook","events":["record.create"],"secret":"mysecret"}

GET /api/webhooks
GET /api/webhooks/<id>
PATCH /api/webhooks/<id>
DELETE /api/webhooks/<id>
GET /api/webhooks/<id>/logs
```

Webhooks deliver with HMAC-SHA256 signature in `X-Webhook-Signature-256` header when a secret is configured.

### Secrets (Encrypted Storage)

Values are encrypted with AES-256-GCM at rest.

```bash
POST /api/secrets
{"name":"api key","value":"sk-...","scope":"general"}

GET /api/secrets            # value omitted from list
GET /api/secrets/<id>       # value decrypted
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
# Upgrade to WebSocket
GET /ws

# Management API
GET /api/websockets
GET /api/websockets/<id>
DELETE /api/websockets/<id>

# Messaging
POST /api/websockets/broadcast  {"content":"hello all"}
POST /api/websockets/<id>/send  {"content":"hello"}
GET /api/websockets/messages
GET /api/websockets/<id>/messages
```

### In-Memory Cache

```bash
POST /api/cache   {"key":"mykey","value":"myvalue","ttl":3600}

GET /api/cache
GET /api/cache/mykey
DELETE /api/cache/mykey
DELETE /api/cache              # flush all
GET /api/cache/stats           # total + expired entries
```

Cache supports TTL-based expiry with periodic eviction (30s interval) and SQLite persistence.

### Notifications

Types: `info`, `success`, `warning`, `error`.

```bash
POST /api/notifications  {"title":"Server Started","body":"The server is running","type":"success"}

GET /api/notifications
GET /api/notifications/<id>
PATCH /api/notifications/<id>   # mark as read
DELETE /api/notifications/<id>
DELETE /api/notifications       # clear all

# SSE stream for real-time notifications
GET /api/notifications/stream
```

### Logs

Levels: `debug`, `info`, `warn`, `error`.

```bash
POST /api/logs  {"level":"info","message":"User logged in","meta":{"user_id":"..."}}

GET /api/logs
DELETE /api/logs                # clear all

# SSE stream for real-time logs
GET /api/logs/stream
```

### Pub/Sub

```bash
POST /api/pubsub/topics         {"name":"orders"}

GET /api/pubsub/topics
GET /api/pubsub/topics/orders
DELETE /api/pubsub/topics/orders

POST /api/pubsub/topics/orders/messages  {"body":"New order received"}
GET /api/pubsub/topics/orders/messages

# SSE stream for real-time topic messages
GET /api/pubsub/orders/stream
```

### RBAC Permissions

Roles: `admin`, `editor`, `viewer`. Collection `*` grants the role globally.

```bash
POST /api/permissions  {"user_id":"<id>","collection":"*","role":"admin"}

GET /api/permissions
DELETE /api/permissions/<id>
```

### Import/Export

```bash
# Export all data as JSON
GET /api/export

# Import data (use skip_existing to avoid conflicts)
POST /api/import?skip_existing=true
```

### Database Backup

```bash
# Download a full SQLite backup (admin only)
GET /api/backup
```

### OpenAPI / Swagger

```bash
# OpenAPI 3.0 spec
GET /api/openapi.json

# Swagger UI
GET /api/docs
```

## Config

| Env             | Default                           | Description     |
| --------------- | --------------------------------- | --------------- |
| `PORT`          | `8080`                            | Server port     |
| `JWT_SECRET`    | `dev-secret-change-in-production` | JWT signing key |
| `BACKBONE_DATA` | `~/.backbone`                     | Data directory  |

## Build

```bash
make build      # build binary
make test       # run 74 tests
make lint       # go vet
make format     # go fmt
make clean      # remove bin/
make all        # format + lint + test + build
```

## Docker

```bash
docker build -t backbone-go -f Dockerfile .
docker run -p 8080:8080 -v backbone-data:/data backbone-go
```

Or use Docker Compose (includes both Go and Rust):

```bash
docker compose up
# Go on :8080, Rust on :8081
```

## Architecture

- **Database:** SQLite via `modernc.org/sqlite` (pure Go, no CGO)
- **Routing:** Standard `net/http` with hand-written route matching
- **Auth:** bcrypt password hashing, HS256 JWT tokens (72h expiry)
- **Encryption:** AES-256-GCM for secrets storage
- **Rate Limiting:** Token bucket per IP (200 capacity, 100 refill/s)
- **Static Files:** Served from disk via `http.FileServer`
- **Middleware:** Rate limiting, auth, RBAC, content-type validation, request logging
- **Cron:** `robfig/cron` scheduler polling every 30s
- **WebSocket:** `gorilla/websocket` with ping/keepalive (30s)

## Test Coverage (74 tests)

| Module        | Tests |
| ------------- | ----- |
| Health        | 1     |
| Auth          | 6     |
| Collections   | 5     |
| Records       | 6     |
| Buckets/Files | 6     |
| Webhooks      | 8     |
| Secrets       | 3     |
| Cron Jobs     | 2     |
| WebSocket     | 5     |
| Cache         | 7     |
| Notifications | 7     |
| Logs          | 5     |
| Pub/Sub       | 7     |
| Permissions   | 1     |
| Import/Export | 1     |
| Cache Stats   | 2     |
| Backup        | —     |
| OpenAPI       | —     |
