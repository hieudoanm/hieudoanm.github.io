# Packaging

Backbone ships as a single static Go binary and an OCI container image.

## Binary

`make build` produces `bin/backbone` with `CGO_ENABLED=0`, so the binary is
self-contained (no glibc/musl dependency) and runs on any Linux/amd64 host
(and the user's build platform).

```bash
CGO_ENABLED=0 go build -o bin/backbone .
```

## Container

The `Dockerfile` is a two-stage build:

1. `golang:1.27-alpine` builder compiles the binary (`CGO_ENABLED=0`)
2. `scratch` runtime ships `/backbone`, the `/public` dashboard, `PORT=8080`,
   `BACKBONE_DATA=/data`, a `VOLUME /data`, and a healthcheck against
   `GET /api/health`

The entrypoint is the server binary directly — no shell, no OS layer.

## CI Pipeline

`.github/workflows/ci-app-headless-backbone.yaml` (reusable Go template):

| Stage     | What it does                                                        |
| --------- | ------------------------------------------------------------------- |
| `ci`      | gofmt check, `make lint`, `make test`, `make build-all`, upload `bin/*` |
| `publish` | Publishes a rolling GitHub Release from the uploaded binaries       |

Artifacts (upload name `app-headless-backbone`):

- `app-headless-backbone-backbone-linux-amd64`
- `app-headless-backbone-backbone-linux-arm64`
- `app-headless-backbone-backbone-darwin-amd64`
- `app-headless-backbone-backbone-darwin-arm64`

The release tag `app-headless-backbone-latest` is force-updated on every push,
so the download URL above always points at the newest build.

## Healthcheck

`GET /api/health` returns `{"status":"ok"}` unconditionally (unauthenticated)
so orchestration (Docker healthcheck, docker-compose) can probe readiness.

## Checklist

1. `go vet ./...` clean
2. `go test ./...` green (all packages + `tests/` E2E)
3. `gofmt -l .` empty
4. `CGO_ENABLED=0 go build -o bin/backbone .` succeeds
5. `docker build -t backbone-server .` succeeds and image serves `/api/health`
