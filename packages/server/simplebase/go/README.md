# SimpleBase

## Table of Contents

- [SimpleBase](#simplebase)
  - [Table of Contents](#table-of-contents)
  - [Quick start](#quick-start)
  - [API](#api)
    - [Health](#health)
    - [Auth](#auth)
    - [Collections](#collections)
    - [Records](#records)
  - [Config](#config)
  - [Build](#build)
  - [Docker](#docker)

## Quick start

A lightweight Supabase/PocketBase-like backend in Go with SQLite.

```bash
make build
./bin/simplebase
```

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
