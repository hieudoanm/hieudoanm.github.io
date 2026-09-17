# Backbone — Testing Strategy

Test layers, fixtures, acceptance criteria, and quality gates for Backbone.

## Test layers

| Layer              | Target                                   | Tools            |
| ------------------ | ---------------------------------------- | ---------------- |
| Unit               | Feature packages (`internal/<feature>`)  | Go testing       |
| Integration        | HTTP handlers (`internal/httpapi`)       | Go testing       |
| E2E                | `tests/` package against built binary    | Go testing       |
| Security           | Authz, RBAC, input validation            | Go testing       |

## 1. Test Layers

- Unit: colocated `*_test.go`, table-driven (`[]struct{...}` + `t.Run`), behaviour-spec names.
- `httpapi`: full HTTP surface through `newTestServer` + `newTestDB`.
- `main_test.go`: re-executes the binary as a subprocess (`GO_MAIN_TEST=1`) to verify real startup/shutdown.
- `tests/`: builds the real binary (`go build ./..`) and runs end-to-end CRUD flows over HTTP.

## 2. Test Fixtures

- Each test uses a fresh `t.TempDir()` for `BACKBONE_DATA`; never share mutable state between cases.
- Fixtures are synthetic; never commit real user data.

## 3. Test Organization

- `internal/auth/*_test.go` — auth tests
- `internal/cache/*_test.go` — cache tests
- `internal/httpapi/*_test.go` — handler tests
- `internal/store/*_test.go` — store tests
- `tests/api.rs` ... (Go) — E2E tests

## 4. Quality Gates

| Gate       | Command                  |
| ---------- | ------------------------ |
| Format     | `gofmt -w .`             |
| Vet        | `go vet ./...`           |
| Test       | `go test ./...`          |
| Build      | `go build ./...`         |
| All        | `make all`               |

All must be clean before committing. Add a test alongside every change in behaviour.

## 5. Critical Test Scenarios

| Scenario                                 | Expectation                                  |
| ---------------------------------------- | -------------------------------------------- |
| Auth                                     | Register/login returns valid JWT; invalid creds rejected |
| RBAC                                     | Role ↔ collection enforced per route         |
| Rate limiting                            | 429 after exceeding token bucket             |
| Webhook delivery                         | HMAC signature; attempts logged              |
| Cron job                                 | Schedule triggers; run logs recorded         |
| Secrets                                  | Values encrypted at rest; list omits values  |
| E2E CRUD                                 | Full create/read/update/delete over HTTP     |

## 6. Definition of Done

See [`09-testing-strategy/06-definition-of-done.md`](09-testing-strategy/06-definition-of-done.md).

## Cross-references

- Requirements: [`01-requirements.md`](01-requirements.md)
- Tech stack: [`08-tech-stack.md`](08-tech-stack.md)
- Implementation plan: [`10-implementation-plan.md`](10-implementation-plan.md)
