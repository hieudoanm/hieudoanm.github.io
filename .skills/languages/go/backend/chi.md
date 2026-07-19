---
name: chi-best-practices
description: Best practices for building Go web services with Chi — the lightweight, composable HTTP router conventions. Use when writing, structuring, or reviewing Chi services — covers routing, middleware, handlers, context, validation, errors, testing, and deployment.
---

# Chi Best Practices

Chi is a lightweight Go router that composes like `net/http` — **route groups (`chi.NewRouter`) with middleware, handlers returning `http.Handler`, and `chi.URLParam` for parameter extraction**. Practical Chi leans on **small, composable middleware, handlers that own one request concern, context-carried request IDs and scoped values**, and **errors as values (not panics) flowing to a uniform error handler**.

---

## 1. Router & Route Composition

- **`chi.NewRouter()` at the entry; subrouters per domain group:**

```go
func apiRouter() chi.Router {
    r := chi.NewRouter()
    r.Use(middleware.Logger, middleware.Recoverer)
    r.Route("/users", func(r chi.Router) {
        r.Get("/", listUsers)
        r.Post("/", createUser)
        r.Get("/{id}", getUser)
    })
    return r
}
```

- **`r.Group` for middleware-scoped subsets**; `r.Mount` for sub-apps mounted at a prefix.
- **Route patterns named at the `Route`/`Get`/`Post` level** — the path is visible in one place, not across scattered params.
- **Method-not-allowed handled automatically** (`chi.Router` sets `405` on known routes with the wrong verb).
- **`chi.URLParam(r, "id")` at the handler boundary** — the URL contract is the type boundary; parse + validate early:

```go
id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
```

- **`r.NotFound`/`r.MethodNotAllowed` for custom fallback handlers** — 404/405 shaped consistently.

---

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

## 6. Testing

- **`httptest.NewRecorder` + `http.NewRequest` to test handlers as pure HTTP:**

```go
func Test_getUser(t *testing.T) {
    r := http.NewRequest("GET", "/users/1", nil)
    w := httptest.NewRecorder()
    getUser(w, r)
    if w.Code != http.StatusOK { t.Fatal() }
}
```

- **Spin the full router in integration tests** — `httptest.NewServer(apiRouter())` for real HTTP round-trips.
- **Fakes/mocks at the repo boundary** — handler tests verify HTTP shape + error mapping; repo tests verify query logic.
- **Contract tests**: valid, invalid ID, not-found, method-not-allowed, unauthorized.

---

## General Rules of Thumb

- **Routes compose from `Route`/`Group`/`Mount`; middleware scoped to the group owning the concern.**
- **Handlers are small, boundary-focused; parse/validate before mutation; call the service.**
- **Context carries request-scoped values with private keys; cancel propagates to I/O.**
- **Errors as values flow to a render function that maps domain → status; panic only for invariants.**
- **Tests via `httptest.NewRecorder` + contract; integration tests via `httptest.NewServer`.**

---

## Quick-Start Checklist

- [ ] `chi.NewRouter()` with `Route` per domain; middleware via `Use` on groups
- [ ] `chi.URLParam` parsed + validated at handler entry
- [ ] One handler per concern; business logic in a service, not in the handler
- [ ] Request-id/user-id/context via private-key context; `r.Context()` propagated
- [ ] Errors as values; `renderErr` maps domain errors to HTTP status
- [ ] `Recoverer`/`Logger` wired in the correct order; auth on the protected group
- [ ] `httptest.NewRecorder` + `httptest.NewServer` tests; contract covered