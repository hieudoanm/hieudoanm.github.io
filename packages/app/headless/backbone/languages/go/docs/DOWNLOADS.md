# Backbone Server (Go)

> A lightweight Back-end as a Service in Go — SQLite storage, REST API, Admin
> Dashboard, WebSockets, SSE, cron, webhooks, pub/sub and more. Runs as a single
> static binary anywhere.

![Platform](https://img.shields.io/badge/platform-cross--platform-blue)
![Build](https://img.shields.io/badge/build-CGO_ENABLED%3D0-blue)
![Go](https://img.shields.io/badge/go-1.26%2B-blue)

---

## Latest release

- **Version:** `app-headless-backbone-latest` — rebuilt automatically on every
  push (see [PACKAGING](PACKAGING)).
- **What's new:** see the [ROADMAP](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the option that fits your environment.

### Install script

```bash
curl -fsSL https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/master/packages/app/headless/backbone/languages/go/scripts/install.sh | bash
```

### Prebuilt binary

| No  | Platform | Architecture | Download Link                                | Note                          |
| --- | -------- | ------------ | -------------------------------------------- | ----------------------------- |
| 1   | Linux    | amd64        | [Download `backbone`][download-linux-amd64]  | Static binary, no deps needed |
| 2   | Linux    | arm64        | [Download `backbone`][download-linux-arm64]  | Static binary, no deps needed |
| 3   | macOS    | amd64        | [Download `backbone`][download-darwin-amd64] | Static binary, no deps needed |
| 4   | macOS    | arm64        | [Download `backbone`][download-darwin-arm64] | Static binary, no deps needed |

[download-linux-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-backbone-latest/app-headless-backbone-backbone-linux-amd64
[download-linux-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-backbone-latest/app-headless-backbone-backbone-linux-arm64
[download-darwin-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-backbone-latest/app-headless-backbone-backbone-darwin-amd64
[download-darwin-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-backbone-latest/app-headless-backbone-backbone-darwin-arm64

```bash
chmod +x backbone
./backbone
# → http://localhost:8080
```

### Docker

A multi-stage `Dockerfile` builds the same static binary into a scratch image:

```bash
cd packages/app/headless/backbone/go
docker build -t backbone-server .
docker run -p 8080:8080 -v backbone-data:/data backbone-server
```

### Build from source

Prefer to build it yourself? Clone, build, and run in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/headless/backbone/go
go build -o bin/backbone .
./bin/backbone
```

See [PACKAGING](PACKAGING) for the CI artifact pipeline and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Backbone is a Supabase/PocketBase-style backend you run yourself.

- **Admin dashboard** — dropped on `/`.
- **REST API** — the full thing, under `/api`.
- **Real-time streams** — over WebSockets and Server-Sent Events.
- **Scheduled jobs** and **webhooks**, with **encrypted secrets**.

All backed by a single SQLite file.

---

## Features

Everything you can manage from the Admin Dashboard or the REST API.

### 🗄️ BackboneBase — Database

- SQLite-backed collections with dynamic JSON schemas (`string`, `number`,
  `integer`, `boolean`, `array`, `object`, `email`, `url`, optional `?`)
- Full CRUD for collections and records, pagination (`page`, `per_page`) and
  search; schema updates trigger column migrations

### 🔐 BackboneAuth

- `POST /api/auth/register` and `POST /api/auth/login` (bcrypt + HS256 JWT,
  72h expiry)

### 🧠 BackboneCache

- In-memory TTL cache with list/get/set/flush + `GET /api/cache/stats`;
  entries persist across restarts

### 📁 BackboneFiles

- Buckets + multipart uploads (max 10 MB), download, delete, and 256px JPEG
  thumbnails for jpeg/png/webp/gif

### 🪝 BackboneHooks

- Webhooks fired on record/collection/bucket/notification/log/secret/cronjob/
  pubsub events, with optional `X-Webhook-Signature-256` HMAC signature and
  delivery logs

### ⏰ BackboneJobs

- Cron jobs (`*/5 * * * *` schedules) executed in-process, manual trigger,
  per-job run logs

### 🧾 BackboneLogs

- Structured log CRUD with SSE stream for live tailing

### 🔔 BackboneNotify

- Notifications (`info`, `success`, `warning`, `error`) with read-marking and
  an SSE stream

### 📨 BackbonePubSub

- Topics and messages, with live fan-out to SSE subscribers
  (`GET /api/pubsub/{name}/stream`)

### 🔌 BackboneSockets

- `/ws` WebSocket: broadcast, per-client send, connection + message history,
  30s ping/keepalive

### 🗝️ BackboneVault

- Secrets encrypted with AES-256-GCM at rest; list omits values, single GET
  decrypts

### 🛡️ RBAC + Admin

- Role-based permissions (`admin`, `editor`, `viewer`) per collection;
  JSON export/import of all data; SQLite backup download (admin only)

### 🖥️ Admin Dashboard

- HTMX + Tailwind UI served at `/` — collections, buckets, files, webhooks,
  secrets, cron jobs, WS connections, cache, notifications and more. No build
  step required.

---

## First run

- Uses `~/.backbone/` for its SQLite database and uploads by default
- Override with `BACKBONE_DATA`, port with `PORT`, JWT key with `JWT_SECRET`
- Register the first user, then manage everything from the dashboard or API

---

## Next steps

- Want to contribute? Read [CONTRIBUTING](CONTRIBUTING).
- Curious what's coming? Check the [ROADMAP](ROADMAP).

---

## License

See [LICENSE](../LICENSE).
