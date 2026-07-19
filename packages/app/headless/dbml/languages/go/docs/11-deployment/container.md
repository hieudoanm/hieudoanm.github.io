# dbml (Go) — Container Deployment

The container image exists for the self-hosted HTTP server use case. The `Dockerfile` at the package root is a two-stage build.

## Image contents

| Stage | Base | What it does |
| ----- | ---- | ------------ |
| builder | `golang:1.27-alpine` | `go mod download`, then `CGO_ENABLED=0 go build -o /dbml .` |
| runtime | `alpine:3.24` | Copies the binary to `/usr/local/bin/dbml`, installs `ca-certificates` |

Runtime configuration baked into the image:

- `EXPOSE 8080`
- `ENV PORT=8080`
- `ENTRYPOINT ["dbml"]` — every subcommand is reachable through the entrypoint
- `CMD ["serve", "--port", "8080"]` — the default command; the port flag is what `serve` reads

## Build and run

```bash
docker build -t dbml .
docker run --rm dbml sql --help

# serve the HTTP API, mounting a DBML file
docker run --rm -p 8080:8080 -v "$PWD:/work:ro" dbml serve --port 8080
```

The default command binds all interfaces because a `127.0.0.1` bind is unreachable from outside a container. Verify with `curl http://localhost:8080/api/v1/health`.

## Hardening status

The current `Dockerfile` has no `USER` directive, so the process runs as root inside the container. [`11-deployment.md`](../11-deployment.md) describes a non-root `dbml` user (uid 10001) as the intended shape; that hardening is planned, not implemented. Until it lands, add `--user 10001:10001` at run time if your environment requires it.

## Container checklist

- [ ] Image builds from a clean checkout (`docker build -t dbml .`).
- [ ] `docker run --rm dbml sql --help` prints usage.
- [ ] Health endpoint answers on the published port.
- [ ] DBML sources are mounted read-only (`:ro`); the container needs no writable state.
- [ ] The published port is restricted to the networks that need the API (see [`12-operations/security.md`](../12-operations/security.md)).

## Cross-references

- Deployment: [`11-deployment.md`](../11-deployment.md)
- Implementation plan: [`10-implementation-plan.md`](../10-implementation-plan.md)
- Operations: [`12-operations.md`](../12-operations.md)
