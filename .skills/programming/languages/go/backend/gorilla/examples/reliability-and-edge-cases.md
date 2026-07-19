# Gorilla Best Practices: 3. Handlers & Responses

## Source guidance

This example applies the **3. Handlers & Responses** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Handlers are `http.HandleFunc`-compatible** — they take `(w, r)` and return error via context; no framework-specific signature:
- **Parse + validate at the top of the handler** before mutation.
- **One concern per handler** — call the service; service owns domain logic.
- **JSON responses via `json.NewEncoder` (or `gorilla/encoding/json`)** — explicit, no magic.
- **Error → status mapping** at the handler (or a middleware error handler); never silently swallow.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for gorilla-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
