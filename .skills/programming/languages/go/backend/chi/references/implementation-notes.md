# Implementation notes

Focused reference for **chi-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Context & Request State

- **Context carries request-scoped data** (`context.WithValue` with a private key type) — request-id, authenticated user, deadline:

```go
type contextKey string
const userIDKey contextKey = "user_id"

func withUserID(ctx context.Context, id string) context.Context {
    return context.WithValue(ctx, userIDKey, id)
}
```

- **Values retrieved only at the handler/repo boundary** — never in deep business logic (hard to test).
- **`r.Context()` propagated through services and DB calls** — cancellation flows to the I/O layer.
- **Private key types prevent collisions** — `string` keys are a known bug vector.

---

## 5. Errors & Responses

- **Domain errors are values**; the service layer returns errors; the handler maps status codes:

```go
var ErrNotFound = errors.New("not found")

func renderErr(w http.ResponseWriter, err error) {
    switch {
    case errors.Is(err, ErrNotFound):
        http.Error(w, "not found", http.StatusNotFound)
    case errors.Is(err, ErrInvalid):
        http.Error(w, "invalid input", http.StatusBadRequest)
    default:
        http.Error(w, "internal error", http.StatusInternalServerError)
    }
}
```

- **Panics reserved for truly impossible invariants** — `Recoverer` middleware turns them into 500s, but the contract says "don't".
- **Error messages to clients are safe** — internal detail goes to logs; a generic message goes out.

---
