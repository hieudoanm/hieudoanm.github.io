# Gin Backend Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`httptest` + Gin's test mode** — build the real router, ride actual middleware:
- **Table-driven tests** (the Go norm) for handlers with cases: success, validation failure, not-found, unauthenticated.
- **Handlers depend on interfaces** — stub services/repos per suite (no DB, no network).
- **Test contract status codes and bodies**, not internals.

## Example

```go
func TestGetUser_NotFound(t *testing.T) {
    gin.SetMode(gin.TestMode)
    r := app.NewRouter(serviceWithStubRepo(t))
    w := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodGet, "/api/v1/users/999", nil)
    r.ServeHTTP(w, req)
    if w.Code != http.StatusNotFound { t.Fatalf("got %d, want 404", w.Code) }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for gin-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
