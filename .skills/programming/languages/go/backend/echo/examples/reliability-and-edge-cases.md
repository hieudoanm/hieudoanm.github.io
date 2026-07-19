# Echo Best Practices: 5. Error Handling

## Source guidance

This example applies the **5. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Return errors from handlers; the global `HTTPErrorHandler` shapes them:**
- **Domain errors converted to `echo.HTTPError` at the repo/service boundary** — a named mapping function over error type.
- **No panics as control flow** — `Recoverer` catches them, but the contract says "return error".
- **Safe messages out** — internal detail to logs; a generic shape to the client.

## Example

```go
func customErrorHandler(err error, c echo.Context) {
    if he, ok := err.(*echo.HTTPError); ok {
        c.JSON(he.Code, map[string]string{"error": he.Message.(string)})
    } else {
        c.JSON(http.StatusInternalServerError, map[string]string{"error": "internal"})
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for echo-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
