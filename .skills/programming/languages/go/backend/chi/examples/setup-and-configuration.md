# Chi Best Practices: 1. Router & Route Composition

## Source guidance

This example applies the **1. Router & Route Composition** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`chi.NewRouter()` at the entry; subrouters per domain group:**
- **`r.Group` for middleware-scoped subsets**; `r.Mount` for sub-apps mounted at a prefix.
- **Route patterns named at the `Route`/`Get`/`Post` level** — the path is visible in one place, not across scattered params.
- **Method-not-allowed handled automatically** (`chi.Router` sets `405` on known routes with the wrong verb).
- **`chi.URLParam(r, "id")` at the handler boundary** — the URL contract is the type boundary; parse + validate early:
- **`r.NotFound`/`r.MethodNotAllowed` for custom fallback handlers** — 404/405 shaped consistently.

## Example

```go
id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for chi-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
