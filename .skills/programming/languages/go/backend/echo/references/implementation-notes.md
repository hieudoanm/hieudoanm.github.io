# Implementation notes

Focused reference for **echo-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```go
var req CreateUserRequest
if err := c.Bind(&req); err != nil {
    return err
}
```

- **`c.Set`/`c.Get` for request-scoped values (request-id, user-id)** — keep it minimal; don't store entire services in context.
- **Context cancellation flows downstream** (`c.Request().Context()`) to DB/HTTP calls; the handler owns the deadline.
- **`echo.Map` for ad-hoc JSON**; typed structs for all API boundaries.

---

## 5. Error Handling

- **Return errors from handlers; the global `HTTPErrorHandler` shapes them:**

```go
func customErrorHandler(err error, c echo.Context) {
    if he, ok := err.(*echo.HTTPError); ok {
        c.JSON(he.Code, map[string]string{"error": he.Message.(string)})
    } else {
        c.JSON(http.StatusInternalServerError, map[string]string{"error": "internal"})
    }
}
```

- **Domain errors converted to `echo.HTTPError` at the repo/service boundary** — a named mapping function over error type.
- **No panics as control flow** — `Recoverer` catches them, but the contract says "return error".
- **Safe messages out** — internal detail to logs; a generic shape to the client.

---

## 6. Testing

- **Handler tests via `httptest` + the full router** — a real HTTP request, not a fake:
