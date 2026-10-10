# Workflow notes

Focused reference for **gorilla-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
