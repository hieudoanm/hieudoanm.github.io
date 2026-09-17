# Backbone — Tech Stack

Allowed technologies and dependency policy for Backbone.

## Technology stack

| Layer            | Technology                                         | Responsibility                            |
| ---------------- | -------------------------------------------------- | ----------------------------------------- |
| Language         | Go 1.26+ (module `github.com/hieudoanm/backbone`)  | Server, all features                      |
| HTTP             | Standard `net/http` with Go 1.22 route patterns    | Routing, handlers, middleware             |
| Database         | SQLite via `modernc.org/sqlite` (pure Go, no CGO)  | All persistence                           |
| Auth             | bcrypt passwords, HS256 JWT (`golang-jwt/jwt/v5`)   | Register/login, 72h tokens                |
| Encryption       | AES-256-GCM for secret values at rest              | Encrypted secrets                         |
| WebSocket        | `gorilla/websocket` with ping/keepalive            | `/ws` broadcast, history                  |
| Cron             | `robfig/cron/v3`                                   | Scheduled jobs                            |
| Frontend         | HTMX + Tailwind (CDN) admin dashboard in `public/` | Admin UI, no build step                   |
| Testing          | Standard `go test`, table-driven tests             | Unit + E2E                                |

## Dependency policy

Before adding a dependency:

1. Check whether the standard library can solve the problem.
2. Check whether the dependency is actively maintained.
3. Check its licence.
4. Check its size and transitive dependencies.
5. Check whether it meaningfully improves the project.

Avoid dependency creep. The binary compiles to a standalone static artifact with `CGO_ENABLED=0`.

## Cross-references

- Architecture: [`04-architecture.md`](04-architecture.md)
- Data model: [`05-data-model.md`](05-data-model.md)
- Testing: [`09-testing-strategy.md`](09-testing-strategy.md)
