# Express.js Backend Best Practices: Workflow Checklist

A practical run sheet for applying [Express.js Backend Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: express — router/handler framework (express@5 for current releases; promises errors flow to the error middleware automatically)
- [ ] 1. Core Stack: zod — request validation at the boundary (see §5)
- [ ] 2. Project Layout: **app.ts builds the app; server.ts only listen()s** — integration tests import app.ts and use supertest without binding a port
- [ ] 2. Project Layout: **Router per resource** (express.Router() in routes/users.ts), mounted under /api/v1 — routes stay short and namespaced
- [ ] 3. Middleware & Ordering: **Order is the entire contract** — middleware runs top-down; logging → body parsing → security → request-id → routes → error handler:
- [ ] 3. Middleware & Ordering: **app.use for global middleware, router-level router.use for namespaced**; mount versioned routers by path (/api/v1) for API evolution
- [ ] 4. Routing & Handlers: **express@5 handles rejected promises natively** — async handlers that throw reach the error middleware without a manual try/catch; on express@4, wrap with a small asyncHandler(fn) helper
- [ ] 4. Routing & Handlers: **Resource-noun routes, HTTP-verb methods, REST-ish naming** — users/:id, POST/GET/PATCH/DELETE; keep routes 2 levels deep (/users/:id/orders only when a real nested resource exists)
- [ ] 5. Validation at the Boundary: **Validate every request with zod at the route edge** — params, query, and body schemas fail fast with 400s and never reach the service:
- [ ] 5. Validation at the Boundary: **Return narrowed parsed data, not the raw body** — the handler consumes parsed.data, so types stay honest downstream

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
