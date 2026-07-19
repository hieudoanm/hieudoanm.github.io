# dbml (Go) — Monitoring and Alerting

dbml has minimal runtime surface: the CLI is fire-and-forget, and the only long-running process is the HTTP server. What follows describes what the repository ships today, plus clearly labelled aspirational practices.

## What ships today

| Signal | Source |
| ------ | ------ |
| Health check | `GET /api/v1/health` returns `{"status":"ok","version":"dev"}` with HTTP 200 |
| Structured logs | `slog` — server start, request handling; `serve --debug` raises the level to debug |
| Process exit status | Always `0` — `main.go` discards `Execute()`'s return, so alert on the `dbml: ` stderr line instead |
| CI status | GitHub Actions pass/fail on every push touching the package path |

Routes are defined in `internal/server/server.go`; the health payload is static (`version` is currently the literal `dev`), so it signals liveness, not build identity.

## What does not ship

Per the implementation snapshot in [`docs/README.md`](../README.md) §8, observability beyond structured logs and health endpoints is not implemented:

- No Prometheus metrics, no request-duration instrumentation.
- No distributed tracing.
- No dashboards or alert rules.
- No log shipping or retention policy.

Any document or runbook promising SLOs, error budgets, or paging for dbml would be aspirational. Treat the practices below as demonstration guidance, not shipped capability.

## Aspirational practices (planned, not implemented)

- Scrape `/api/v1/health` from an existing uptime checker and alert on non-200 responses.
- Alert on CI failures of the package workflow (`ci-app-headless-dbml.yaml`).
- If metrics are ever added, instrument request counts and conversion duration at the HTTP layer only; the parser and generators stay transport-free.

## Monitoring checklist for operators

- [ ] Poll `/api/v1/health` at a interval appropriate to your deployment.
- [ ] Capture container or systemd logs from the `slog` output.
- [ ] Treat any conversion failure as an input or code issue — the API returns HTTP 400 with a JSON `error` field that identifies the parse problem.

## Cross-references

- Operations: [`12-operations.md`](../12-operations.md)
- Deployment: [`11-deployment.md`](../11-deployment.md)
- API specification: [`06-api-specification.md`](../06-api-specification.md)
