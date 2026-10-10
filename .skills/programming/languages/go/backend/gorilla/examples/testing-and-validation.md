# Gorilla Best Practices: 7. Testing

## Source guidance

This example applies the **7. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Handler tests via `httptest` + the router** — real HTTP requests, no framework-specific runner:
- **Fakes at the service boundary** — handler tests verify HTTP shape; service tests verify domain.
- **Contract tests** via `httptest.NewServer` for real round-trips.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for gorilla-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
