# Workflow notes

Focused reference for **chi-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Middleware

- **Middleware is a decorator around the handler** — log, recover, auth, request-id, CORS; each does one thing:

```go
func requestID(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ctx := context.WithValue(r.Context(), requestIDKey, uuid.NewString())
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
```

- **Order matters**: Logger → Recoverer → Auth → business; request-id and tracing before auth so spans carry the request identity.
- **Middleware returns `http.Handler`** — composable, testable, no hidden global state.
- **Auth middleware on the protected group** (`r.Use(authMiddleware)`) — never per-route; the whole group is the security domain.

---

## 3. Handlers

- **One handler, one concern; small bodies (< 30 lines), explicit error handling:**

```go
func getUser(w http.ResponseWriter, r *http.Request) {
    id, err := parseID(r)
    if err != nil {
        http.Error(w, "invalid id", http.StatusBadRequest)
        return
    }
    user, err := repo.Find(id)
    if err != nil {
        renderErr(w, err)   // domain-specific mapping
        return
    }
    renderJSON(w, user)
}
```

- **Parse/validate at the boundary before any mutation** — the handler is a contract gate.
- **No business logic in handlers** — a handler calls a service; the service owns the domain.
- **Return JSON (`renderJSON`) via a helper; render errors via `renderErr` with a status code** — a consistent response shape across every endpoint.
- **Handlers don't leak state through closure** — dependencies arrive via DI (constructor of the handler struct) or context, never globals.

---
