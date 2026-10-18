# dbml (Go) — Binary Deployment

dbml ships as a single static Go binary. `make build` produces `bin/dbml`; the binary runs standalone or embedded in other tooling with no external assets.

## Build

```bash
cd packages/app/headless/dbml/go
make build    # CGO_ENABLED=0 go build -o bin/dbml .
```

`make install` builds and installs to `$(HOME)/bin/dbml`. The binary is pure Go (no CGO): no runtime, no shared libraries, no asset files.

## Platform artifacts

`make build-all` cross-compiles into `bin/` for every supported platform:

| OS/arch | Artifact |
| ------- | -------- |
| linux/amd64 | `bin/dbml-linux-amd64` |
| linux/arm64 | `bin/dbml-linux-arm64` |
| darwin/amd64 | `bin/dbml-darwin-amd64` |
| darwin/arm64 | `bin/dbml-darwin-arm64` |

CI publishes the same set to the rolling GitHub Release `app-headless-dbml-latest`, with each file prefixed `app-headless-dbml-` (for example `app-headless-dbml-dbml-linux-amd64`).

## Verify a deployed binary

```bash
./bin/dbml --help
./bin/dbml sql schema.dbml -o schema.sql   # conversion smoke test
./bin/dbml serve --port 8080               # if deploying the HTTP API
```

## Deployment checklist

- [ ] Download or build the artifact for the target OS/arch.
- [ ] Run `./bin/dbml --help` to confirm the binary executes on the host.
- [ ] Convert a known DBML file and diff the output against local expectations.
- [ ] If serving HTTP, confirm `GET /api/v1/health` returns `{"status":"ok",...}`.
- [ ] Record the source commit used to build the binary for rollback purposes (see [`12-operations/rollback-strategy.md`](../12-operations/rollback-strategy.md)).

## Notes

- The binary is the vehicle for every use case (CLI, HTTP, MCP); the container image exists for the `serve` use case only.
- There is no installer, package-manager formula, or auto-update mechanism; distribution is the GitHub Release plus local builds.

## Cross-references

- Deployment: [`11-deployment.md`](../11-deployment.md)
- Implementation plan: [`10-implementation-plan.md`](../10-implementation-plan.md)
- Operations: [`12-operations.md`](../12-operations.md)
