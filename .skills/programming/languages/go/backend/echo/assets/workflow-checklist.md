# Echo Best Practices: Workflow Checklist

A practical run sheet for applying [Echo Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Route Grouping: **echo.New() at the entry; Group for middleware scope:**
- [ ] 1. Route Grouping: **Subroutes per domain** (r.Group("/users", ...) or router.GET); the path contract visible at the route definition
- [ ] 2. Middleware: **Middleware is a function wrapping the handler; order matters** (Logger → Recoverer → CORS → Auth → business):
- [ ] 2. Middleware: **Echo's built-in middleware** (Logger, Recover, Gzip, CORS) are the defaults; custom ones follow the same signature
- [ ] 3. Handlers: **Handler returns error** — the framework renders it; the handler owns the domain:
- [ ] 3. Handlers: **One concern per handler** — parse, validate, call service, return
- [ ] 4. Context & Binding: **c.Bind(&input) for request binding/validation** — JSON, query, form, multipart; the framework does the work:
- [ ] 4. Context & Binding: **c.Set/c.Get for request-scoped values (request-id, user-id)** — keep it minimal; don't store entire services in context
- [ ] 5. Error Handling: **Return errors from handlers; the global HTTPErrorHandler shapes them:**
- [ ] 5. Error Handling: **Domain errors converted to echo.HTTPError at the repo/service boundary** — a named mapping function over error type

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
