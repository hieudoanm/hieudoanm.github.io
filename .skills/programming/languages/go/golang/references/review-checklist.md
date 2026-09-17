# Review checklist

Focused reference for **go-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Zero values should be useful.** Design structs so `var s Server` is either immediately usable or clearly documented as requiring `New()`.
- **Guard clauses over nested `if`** — return early instead of indenting the happy path:

```go
if err != nil {
	return err // bail out before the nesting starts
}
// happy path stays at one indent level
```

- **Don't over-use generics.** Reach for them when you'd otherwise duplicate identical logic across types (e.g. a `Map[T, U]` helper) — not as a default for every function signature.
- **Compose with the `net/http` middleware pattern** — cross-cutting concerns (auth, logging, tracing, rate limits) stack as linear layers rather than being sprinkled through handlers:

```go
func withLogging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s", r.Method, r.URL.Path)
		next.ServeHTTP(w, r) // the linear chain is visible in one place
	})
}

// auth := withLogging(rateLimit(withAuth(mux)))
```

---

## 8. General Rules of Thumb

- **Simplicity over abstraction.** Go rewards direct, readable code over deep interface hierarchies or heavy dependency injection frameworks.
- **Keep functions short and single-purpose** — if a function needs a table of contents comment, it should probably be split.
- **Comment the "why," not the "what"** — code should read clearly enough that comments explain rationale, not restate logic. Exported identifiers get doc comments starting with their own name (`// Server handles ...`).
- **Avoid global mutable state** — pass dependencies explicitly (constructors, function params) instead of package-level `var`s that tests then have to reset.
- **Module versioning:** follow semver, and remember a `v2+` module path requires the `/v2` suffix in the import path.

---

## Quick-Start Checklist

- [ ] `internal/` used for anything not meant for external import
- [ ] Errors wrapped with `%w` and context, checked immediately, not silently discarded
- [ ] Every goroutine has a clear termination path
- [ ] `context.Context` threaded through I/O-bound functions
- [ ] Table-driven tests for multi-case logic
- [ ] `gofmt`, `go vet`, and a linter running in CI
- [ ] Functional options used for complex constructors instead of long positional args
- [ ] No unexplained `_ = err` discards
- [ ] `go test -race` run in CI for any concurrent code
