# Backbone — Definition of Done

The canonical release definition of done.

A release is complete when:

- `gofmt`, `go vet`, `go test`, `go build` are clean (`make all`).
- Table-driven tests cover core behaviour (auth, RBAC, store, handlers, webhooks, cron, secrets).
- E2E `tests/` package runs CRUD over HTTP against the built binary.
- `make build` produces `bin/backbone` with `CGO_ENABLED=0`.
- Docker image builds and serves `GET /api/health`.
- Admin dashboard reachable at `/` with no build step.
- Documentation is updated when behaviour or scope changes.
- `10-implementation-plan.md` milestones in sync with what actually ships.
