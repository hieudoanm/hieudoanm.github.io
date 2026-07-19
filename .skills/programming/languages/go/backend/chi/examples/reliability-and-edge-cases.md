# Chi Best Practices: 5. Errors & Responses

## Source guidance

This example applies the **5. Errors & Responses** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Domain errors are values**; the service layer returns errors; the handler maps status codes:
- **Panics reserved for truly impossible invariants** — `Recoverer` middleware turns them into 500s, but the contract says "don't".
- **Error messages to clients are safe** — internal detail goes to logs; a generic message goes out.

## Example

```go
var ErrNotFound = errors.New("not found")

func renderErr(w http.ResponseWriter, err error) {
    switch {
    case errors.Is(err, ErrNotFound):
        http.Error(w, "not found", http.StatusNotFound)
    case errors.Is(err, ErrInvalid):
        http.Error(w, "invalid input", http.StatusBadRequest)
    default:
        http.Error(w, "internal error", http.StatusInternalServerError)
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for chi-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
