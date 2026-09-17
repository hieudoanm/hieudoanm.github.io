# Backbone — Test Organization

One responsibility per test file. Tests live next to the package they cover:

- `internal/auth/*_test.go` — auth
- `internal/cache/*_test.go` — cache
- `internal/cron/*_test.go` — cron
- `internal/events/*_test.go` — events
- `internal/httpapi/*_test.go` — HTTP handlers
- `internal/id/*_test.go` — ID generation
- `internal/log/*_test.go` — logs
- `internal/notification/*_test.go` — notifications
- `internal/pubsub/*_test.go` — pubsub
- `internal/rbac/*_test.go` — RBAC
- `internal/realtime/*_test.go` — WS/SSE hubs
- `internal/secrets/*_test.go` — secrets
- `internal/store/*_test.go` — store
- `internal/validation/*_test.go` — validation
- `internal/webhook/*_test.go` — webhooks
- `tests/` — E2E against built binary

Prefer table-driven test names as documentation:
`TestRegisterUser_returnsJWT_forValidCredentials`.
