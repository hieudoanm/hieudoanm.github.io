# SimpleServer

## Table of Contents

- [SimpleServer](#simpleserver)
  - [Table of Contents](#table-of-contents)
  - [Quick start](#quick-start)
  - [Admin Dashboard](#admin-dashboard)
  - [API](#api)
    - [Health](#health)
    - [Auth](#auth)
    - [Collections](#collections)
    - [Records](#records)
    - [Buckets](#buckets)
    - [Files](#files)
  - [Config](#config)
  - [Build](#build)
  - [Docker](#docker)

## Quick start

A lightweight Supabase/PocketBase-like backend in Go with SQLite.

```bash
make build
./bin/simplebase
```

Open [http://localhost:8080](http://localhost:8080) for the admin dashboard.

## Admin Dashboard

A web-based admin UI is served at the root URL (`/`). Built with HTMX and Tailwind CSS (loaded via CDN).

Features:

- Login/authentication with JWT
- Manage collections (create, browse, delete)
- Manage records within collections (create, edit, delete, pagination)
- Manage buckets (create, delete)
- Manage files within buckets (upload, download, delete)

No build step required — the dashboard is a single static HTML file served by the Go server.

## API

### Health

```bash
GET /api/health
```

### Auth

```bash
POST /api/auth/register
{"email":"user@test.com","password":"pass123"}

POST /api/auth/login
{"email":"user@test.com","password":"pass123"}
# => {"user":{...},"token":"eyJ..."}
```

All endpoints below require `Authorization: Bearer <token>` header.

### Collections

```bash
POST /api/collections
{"name":"notes","schema":"{\"title\":\"string\"}"}

GET /api/collections
# => [{"name":"notes","schema":"{}","created_at":"...","updated_at":"..."}]

GET /api/collections/notes
DELETE /api/collections/notes
```

### Records

```bash
POST /api/collections/notes/records
{"data":{"title":"Hello","body":"World"}}

GET /api/collections/notes/records?page=1&per_page=20
# => {"records":[...],"total":1,"page":1,"per_page":20,"total_pages":1}

GET /api/collections/notes/records/<id>
PATCH /api/collections/notes/records/<id>
{"data":{"title":"Updated"}}

DELETE /api/collections/notes/records/<id>
```

### Buckets

```bash
POST /api/buckets
{"name":"avatars","is_public":false}

GET /api/buckets
# => [{"name":"avatars","is_public":false,"created_at":"...","updated_at":"..."}]

GET /api/buckets/avatars
DELETE /api/buckets/avatars
```

### Files

```bash
# Upload (multipart/form-data with "file" field)
POST /api/buckets/avatars/files

GET /api/buckets/avatars/files?page=1&per_page=20
# => {"files":[...],"total":1,"page":1,"per_page":20,"total_pages":1}

GET /api/buckets/avatars/files/<id>
DELETE /api/buckets/avatars/files/<id>
```

## Config

| Env               | Default                           | Description     |
| ----------------- | --------------------------------- | --------------- |
| `PORT`            | `8080`                            | Server port     |
| `JWT_SECRET`      | `dev-secret-change-in-production` | JWT signing key |
| `SIMPLEBASE_DATA` | `~/.simplebase`                   | Data directory  |

## Build

```bash
make build      # build binary
make test       # run tests
make lint       # go vet
make format     # go fmt
make clean      # remove bin/
make all        # format + lint + test + build
```

## Docker

```bash
docker build -t simplebase .
docker run -p 8080:8080 -v simplebase-data:/data simplebase
```
