# Go Best Practices: Starter Template

A reusable starting point derived from the **7. API & Function Design** section of [Go Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```go
func withLogging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s", r.Method, r.URL.Path)
		next.ServeHTTP(w, r) // the linear chain is visible in one place
	})
}

// auth := withLogging(rateLimit(withAuth(mux)))
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
