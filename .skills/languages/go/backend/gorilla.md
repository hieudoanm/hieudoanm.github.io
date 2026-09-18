---
name: gorilla-best-practices
description: Best practices for using Gorilla Toolkit in Go — the classic library conventions for HTTP routing, middleware, JSON handling, and WebSocket sessions. Use when writing, structuring, or reviewing Gorilla-based services — covers mux, middleware, JSON handling, WebSocket, sessions, testing, and deployment.
---

# Gorilla Best Practices

Gorilla is a **library, not a framework** — `gorilla/mux` for routing, `gorilla/handlers`/`gorilla/mux.MiddlewareFunc` for middleware, `gorilla/encoding/json` for JSON, and `gorilla/websocket` for WebSocket. Practical Gorilla leans on **`mux.NewRouter` as a plain `http.Handler`, middleware via `r.Use`/`MiddlewareFunc`, and the `context` for request-scoped state**. The toolkit composes with `net/http` rather than replacing it — you write a standard handler, the framework helps where the stdlib is verbose.

---

## 1. Router

- **`mux.NewRouter()` as the top-level handler; route by path/method:** `r.HandleFunc`, `r.Methods`, `r.PathPrefix`:

```go
r := mux.NewRouter()
r.HandleFunc("/users/{id:[0-9]+}", getUser).Methods("GET")
r.Use(middleware.RequestID)
http.ListenAndServe(":8080", r)
```

- **Path parameters via `mux.Vars(r)`** — parse + validate at the handler boundary.
- **Subrouters via `r.PathPrefix("/api").Subrouter()`** for middleware-scoped groups; `r.Use` scoped per subrouter.
- **Method-not-allowed handled automatically** by `mux.Router`.
- **`r.NotFoundHandler`/`r.MethodNotAllowedHandler` set once** — consistent 404/405 shape.

---

## 2. Middleware

- **Middleware wraps the handler** — `func(next http.Handler) http.Handler` or `mux.MiddlewareFunc`:

```go
func requestID(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ctx := context.WithValue(r.Context(), requestIDKey, uuid.NewString())
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
```

- **`r.Use()` to add middleware to the router/subrouter** — order matters.
- **Auth middleware on the protected subrouter** — never per-route; the subrouter is the security domain.
- **Recovery/panic handling via custom middleware** (`recover` inside the wrapper) or the stdlib `recover`:

```go
func recoverMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if p := recover(); p != nil {
                http.Error(w, "internal error", http.StatusInternalServerError)
            }
        }()
        next.ServeHTTP(w, r)
    })
}
```

---

## 3. Handlers & Responses

- **Handlers are `http.HandleFunc`-compatible** — they take `(w, r)` and return error via context; no framework-specific signature:

```go
func getUser(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id, err := strconv.ParseInt(vars["id"], 10, 64)
    if err != nil {
        http.Error(w, "invalid id", http.StatusBadRequest)
        return
    }
    user, err := svc.Find(id)
    if err != nil {
        http.Error(w, "not found", http.StatusNotFound)
        return
    }
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}
```

- **Parse + validate at the top of the handler** before mutation.
- **One concern per handler** — call the service; service owns domain logic.
- **JSON responses via `json.NewEncoder` (or `gorilla/encoding/json`)** — explicit, no magic.
- **Error → status mapping** at the handler (or a middleware error handler); never silently swallow.

---

## 4. JSON Handling

- **`json.NewEncoder(w).Encode(...)` for output; `json.NewDecoder(r.Body).Decode(&into)` for input:**

```go
var req CreateUserRequest
if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
    http.Error(w, "invalid json", http.StatusBadRequest)
    return
}
```

- **Validate the decoded struct before touching any state** — `validate` tags / manual validation.
- **`Content-Type: application/json` header set explicitly** — don't let middleware be the only source.
- **Use `gorilla/json` only when its features are needed** — the stdlib `encoding/json` is fine for the common case.

---

## 5. WebSocket

- **`gorilla/websocket.Upgrader` for the HTTP upgrade path:**

```go
var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
    CheckOrigin:     func(r *http.Request) bool { return true },
}
```

- **Read/write handled in a goroutine pair**; the connection is shared; write-lock via `Conn.WriteMessage`.
- **Handshake errors handled**; `SetReadDeadline`/`SetWriteDeadline` for connection timeouts.
- **`Pong` handler registered early**; heartbeat goroutine for keep-alive.
- **WS session scope** — the HTTP request context should carry auth/user; the WS connection carries the stream lifecycle.

---

## 6. Sessions

- **`gorilla/sessions` for cookie or server-side sessions**:

```go
var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_SECRET")))
func getSession(w http.ResponseWriter, r *http.Request) (*sessions.Session, error) {
    return store.Get(r, "session")
}
```

- **Session secret from env, never hardcoded**; rotate on deploy.
- **Session data minimal** — a user-ID, not the entire user; store heavy data in DB/DB-backed session store.
- **`MaxAge`/`HttpOnly`/`Secure` set explicitly** — cookie hygiene is a security decision.

---

## 7. Testing

- **Handler tests via `httptest` + the router** — real HTTP requests, no framework-specific runner:

```go
func Test_getUser(t *testing.T) {
    r := mux.NewRouter()
    r.HandleFunc("/users/{id:[0-9]+}", getUser).Methods("GET")
    req := httptest.NewRequest("GET", "/users/1", nil)
    w := httptest.NewRecorder()
    r.ServeHTTP(w, req)
    if w.Code != http.StatusOK { t.Fatal() }
}
```

- **Fakes at the service boundary** — handler tests verify HTTP shape; service tests verify domain.
- **Contract tests** via `httptest.NewServer` for real round-trips.

---

## General Rules of Thumb

- **`mux.Router` is a plain `http.Handler`; compose with the stdlib, not against it.**
- **Middleware scoped to subrouters; auth applied at the security boundary, not per-route.**
- **Handlers parse/validate at the top; call the service; render via `json.NewEncoder`.**
- **WebSocket reads/writes in goroutine pairs; sessions store a minimum.**
- **Tests via `httptest` + router; contract cases covered.**

---

## Quick-Start Checklist

- [ ] `mux.NewRouter` + `HandleFunc` + `Methods`; path params via `mux.Vars`
- [ ] Middleware via `r.Use`; scoped to subrouters; recovery + auth wired
- [ ] Handler validates at entry; service owns domain; JSON via `json.NewEncoder`
- [ ] WebSocket upgrader with deadlines; pong + write-lock; auth from HTTP request
- [ ] Sessions via `gorilla/sessions`; secrets from env; minimal data
- [ ] 404/405 via `NotFoundHandler`/`MethodNotAllowedHandler`
- [ ] `httptest` + real router tests; service fakes in unit tests