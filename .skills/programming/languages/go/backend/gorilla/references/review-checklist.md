# Review checklist

Focused reference for **gorilla-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
