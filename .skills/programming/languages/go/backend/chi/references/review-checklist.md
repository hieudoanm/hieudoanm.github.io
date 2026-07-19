# Review checklist

Focused reference for **chi-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
