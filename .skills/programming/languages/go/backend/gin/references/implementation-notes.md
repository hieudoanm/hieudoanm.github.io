# Implementation notes

Focused reference for **gin-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Validate all external input; fail fast on invalid requests** — never trust client data.
- **Validation at the handler edge, domain invariants in services** — handler validates shape, service validates rules.
- **Custom validators registered once** (`binding.Validator`) for app-specific rules; keep them colocated with their structs.

---

## 6. Error Handling

- **Go's explicit `if err != nil { return ... }` discipline** — no hidden panic recovery as primary flow; handlers return errors mapped to HTTP:

```go
if err := svc.Create(...); err != nil {
    c.JSON(statusFrom(err), ErrResponse{publicMessage(err)})
    return
}
```

- **Map domain errors to API-safe responses** — a small `statusFrom`/`toHTTP` mapping keeps HTTP out of services:

```go
func statusFrom(err error) int {
    switch err.(type) {
    case *domain.NotFoundError: return http.StatusNotFound
    case *domain.ValidationError: return http.StatusBadRequest
    default: return http.StatusInternalServerError
    }
}
```

- **Do not leak internal errors or stack traces** — log the cause, respond with the safe message.
- **`gin.Recovery()` catches panics** — but treat it as a safety net, not a substitute for explicit error returns.

---

## 7. Security

- **Authentication and authorization handled explicitly** — middleware verifies, services/policies authorize.
- **Avoid exposing internal IDs unintentionally** — external IDs/ULIDs where persistence IDs shouldn't leak.
- **Never trust client input**; escape/protect against injection at the persistence layer.
- **Secrets via environment, never code** — config loaded in `main`, injected where needed (no global mutable config).
- Map internal errors to generic responses; keep failure details in logs, not responses.

---

## 8. Reliability & Maintainability

- **Small, focused functions** (≤30 lines — the repo convention); explicit error returns; clear naming over cleverness.
- **Context-aware timeouts and cancellations** — `context.WithTimeout` in handlers/services for DB/HTTP calls.
