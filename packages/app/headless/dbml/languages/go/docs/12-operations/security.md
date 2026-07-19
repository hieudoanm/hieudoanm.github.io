# dbml (Go) — Security

Security posture of the shipped tool. dbml is a demonstration converter: it handles schema definitions, not data, and it makes no compliance claims (see [`00-overview.md`](../00-overview.md) §6).

## Shipped controls

| Control | Detail |
| ------- | ------ |
| No secrets | No credentials in code, configuration, or container image |
| No network calls | The CLI and generators make no outbound requests by default |
| Small attack surface | Pure Go (no CGO), minimal dependencies (Cobra, Gorilla Mux) |
| Input validation | Missing or unparseable DBML returns HTTP 400 with a JSON `error`; malformed input is never silently accepted |
| No real data | Demonstrations use synthetic schemas; no personal data is processed or committed |
| Pinned dependencies | `go.mod`/`go.sum` pin the dependency graph; Renovate/Dependabot branches trigger CI |

## Known exposure — read before deploying the API

- The HTTP server has **no authentication and no TLS**. Anyone who can reach the port can convert input and read responses.
- The listener binds to all interfaces (`http.ListenAndServe(":"+port, ...)`) regardless of flags. [`12-operations.md`](../12-operations.md) describes a `127.0.0.1` default in local mode; the implementation does not restrict the bind address, so network isolation is the operator's responsibility.
- The container image runs as root: no `USER` directive exists in the `Dockerfile` yet (see [`11-deployment/container.md`](../11-deployment/container.md)).

Practical rule: run `dbml serve` on localhost or a trusted network only, or place it behind a reverse proxy that terminates TLS and enforces access.

## Operator checklist

- [ ] Do not publish the serve port to untrusted networks.
- [ ] Mount DBML sources read-only into containers.
- [ ] Keep the binary/image current with the rolling release or a rebuild from source.
- [ ] Report parse crashes as bugs; the API should fail with 400, never 500, on bad input.

## Cross-references

- Operations: [`12-operations.md`](../12-operations.md)
- Deployment: [`11-deployment.md`](../11-deployment.md)
- Overview: [`00-overview.md`](../00-overview.md)
