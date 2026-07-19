# Chi Best Practices: 6. Testing

## Source guidance

This example applies the **6. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`httptest.NewRecorder` + `http.NewRequest` to test handlers as pure HTTP:**
- **Spin the full router in integration tests** — `httptest.NewServer(apiRouter())` for real HTTP round-trips.
- **Fakes/mocks at the repo boundary** — handler tests verify HTTP shape + error mapping; repo tests verify query logic.
- **Contract tests**: valid, invalid ID, not-found, method-not-allowed, unauthorized.

## Example

```go
func Test_getUser(t *testing.T) {
    r := http.NewRequest("GET", "/users/1", nil)
    w := httptest.NewRecorder()
    getUser(w, r)
    if w.Code != http.StatusOK { t.Fatal() }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for chi-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
