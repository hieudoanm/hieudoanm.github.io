# Review checklist

Focused reference for **echo-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```go
func Test_getUser(t *testing.T) {
    req := httptest.NewRequest(http.MethodGet, "/api/users/1", nil)
    rec := httptest.NewRecorder()
    e.ServeHTTP(rec, req)
    assert.Equal(t, http.StatusOK, rec.Code)
}
```

- **Fakes at the service/repo boundary** — the handler test owns the HTTP layer; service test owns domain logic.
- **Integration tests via `httptest.NewServer`** for real network round-trips.
- **Contract cases**: valid, invalid, not-found, unauthorized, method-not-allowed.

---

## General Rules of Thumb

- **Route groups scope middleware; middleware order is the request-processing pipeline.**
- **Handler returns `error`; the global error handler maps domain → HTTP response.**
- **Validate at the boundary; bind via `c.Bind`; context carries the request down.**
- **Handlers are thin adapters; business logic lives in services.**
- **Tests via `httptest` + full router; contract covered.**

---

## Quick-Start Checklist

- [ ] `Group` per domain; middleware ordered (Logger → Recover → CORS → Auth)
- [ ] Handler returns `error`; `echo.HTTPError` for boundary conversions
- [ ] `c.Bind` at entry; validation before any mutation; `c.Request().Context()` down
- [ ] Domain errors converted to `HTTPError` in a shared mapper
- [ ] `echo.HTTPErrorHandler` set once; JSON error response shape uniform
- [ ] No panic-as-control-flow; `Recoverer` for the unexpected
- [ ] `httptest` handler tests + contract; service/repo fakes in unit tests
