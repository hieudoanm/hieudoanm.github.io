# Gin Backend Best Practices: 8. Reliability & Maintainability

## Source guidance

This example applies the **8. Reliability & Maintainability** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Small, focused functions** (≤30 lines — the repo convention); explicit error returns; clear naming over cleverness.
- **Context-aware timeouts and cancellations** — `context.WithTimeout` in handlers/services for DB/HTTP calls.
- **Avoid global mutable state** — DB, verifiers, and config wired via constructors into handlers/services.
- **Deterministic behavior** — no hidden side effects, no implicit init; composition over inheritance.
- **Log at system boundaries** (HTTP, DB, external calls) via a structured logger middleware + boundary logging.

## Example

```go
ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
defer cancel()
rows, err := repo.List(ctx)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for gin-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
