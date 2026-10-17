# Deployment

dbml ships as a single static Go binary, with a container image for self-hosting the HTTP server. Local development with Docker Compose and CI quality gates.

## Sections

- [Binary](./11-deployment/binary.md)
- [Container](./11-deployment/container.md)
- [CI/CD Pipeline](./11-deployment/ci-cd-pipeline.md)
- [Local Development](./11-deployment/local-development.md)

## Binary

`make build` produces `bin/dbml`:

```bash
cd packages/app/headless/dbml/go
make build    # go build -o bin/dbml .
```

The binary is pure Go (no CGO) — it ships as a standalone artifact with no external assets. The binary is meant to run standalone or embedded in other tooling; the container is for the `serve` use case only.

## Container

`Dockerfile` builds on `golang:1.23-alpine` and ships the binary on `alpine:3.22` as user `dbml` (uid 10001). `ENTRYPOINT` is the binary, so every subcommand is reachable:

```bash
docker build -t dbml .
docker run --rm dbml sql --help

# serve the HTTP API, mounting a DBML file
docker run --rm -p 8080:8080 -v "$PWD:/work:ro" dbml serve --port 8080
```

The default command is `serve --port 8080`, bound to all interfaces because the default `127.0.0.1` is unreachable from outside the container.

## CI Pipeline

`.github/workflows/ci-app-headless-dbml.yaml` (reusable Go template):

| Stage | What it does |
| ----- | ------------ |
| `ci` | gofmt check, `make lint`, `make test`, `make build-all`, upload `bin/*` |
| `publish` | Publishes a rolling GitHub Release from the uploaded artifact |

Artifacts:

- `app-headless-dbml-dbml-linux-amd64`
- `app-headless-dbml-dbml-linux-arm64`
- `app-headless-dbml-dbml-darwin-amd64`
- `app-headless-dbml-dbml-darwin-arm64`

The release tag `app-headless-dbml-latest` is force-updated on every push.

## Quick start

```bash
make build
./bin/dbml sql schema.dbml -o schema.sql
```

## Cross-references

- Architecture: [`04-architecture.md`](04-architecture.md)
- Operations: [`12-operations.md`](12-operations.md)
