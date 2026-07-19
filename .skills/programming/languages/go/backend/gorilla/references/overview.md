# Overview

Focused reference for **gorilla-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
