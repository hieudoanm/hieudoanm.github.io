# Chi Best Practices: Workflow Checklist

A practical run sheet for applying [Chi Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Router & Route Composition: **chi.NewRouter() at the entry; subrouters per domain group:**
- [ ] 1. Router & Route Composition: **r.Group for middleware-scoped subsets**; r.Mount for sub-apps mounted at a prefix
- [ ] 2. Middleware: **Middleware is a decorator around the handler** — log, recover, auth, request-id, CORS; each does one thing:
- [ ] 2. Middleware: **Order matters**: Logger → Recoverer → Auth → business; request-id and tracing before auth so spans carry the request identity
- [ ] 3. Handlers: **One handler, one concern; small bodies (< 30 lines), explicit error handling:**
- [ ] 3. Handlers: **Parse/validate at the boundary before any mutation** — the handler is a contract gate
- [ ] 4. Context & Request State: **Context carries request-scoped data** (context.WithValue with a private key type) — request-id, authenticated user, deadline:
- [ ] 4. Context & Request State: **Values retrieved only at the handler/repo boundary** — never in deep business logic (hard to test)
- [ ] 5. Errors & Responses: **Domain errors are values**; the service layer returns errors; the handler maps status codes:
- [ ] 5. Errors & Responses: **Panics reserved for truly impossible invariants** — Recoverer middleware turns them into 500s, but the contract says "don't"

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
