# Echo Best Practices: 6. Testing

## Source guidance

This example applies the **6. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Handler tests via `httptest` + the full router** — a real HTTP request, not a fake:
- **Fakes at the service/repo boundary** — the handler test owns the HTTP layer; service test owns domain logic.
- **Integration tests via `httptest.NewServer`** for real network round-trips.
- **Contract cases**: valid, invalid, not-found, unauthorized, method-not-allowed.

## Example

```go
func Test_getUser(t *testing.T) {
    req := httptest.NewRequest(http.MethodGet, "/api/users/1", nil)
    rec := httptest.NewRecorder()
    e.ServeHTTP(rec, req)
    assert.Equal(t, http.StatusOK, rec.Code)
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for echo-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
