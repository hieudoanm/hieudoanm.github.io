# Backbone — Test Layers

| Layer              | Target                                   | Tools            |
| ------------------ | ---------------------------------------- | ---------------- |
| Unit               | Feature packages (`internal/<feature>`)  | Go testing       |
| Integration        | HTTP handlers (`internal/httpapi`)       | Go testing       |
| E2E                | `tests/` package against built binary    | Go testing       |
| Security           | Authz, RBAC, input validation            | Go testing       |

Prefer table-driven Go tests. Tests assert observable behaviour, not implementation details.
