# Hono.js Backend Best Practices: Validation Plan

Use this plan to verify work guided by [Hono.js Backend Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **hono/zod-validator** — validate json/form/query/header/cookie with zod, and the parsed value rides c.req.valid("json") _typed_:
- [ ] **c.req.valid() is set only after its validator ran** — handlers never touch raw c.req payloads
- [ ] **Coerce params/query in-schema** (z.coerce.number()) before use; validation failures return 400 with the zod issues by default, surface them consistently via a shared error middleware
- [ ] **hono/type-test** (expectTypeOf-style type-level tests) pins the contract between routes and typed clients (hono/client)
- [ ] **Small middleware surface** — each app.use is runtime cost; compose few, targeted layers
- [ ] **Prefer Static/serveStatic and built-ins over node-only magic on edge targets**; validate bundle size before edge deploy (workers freeze on heavy modules)
- [ ] **Atomic responses** — return c.json/c.text/c.body(...).status and let the framework handle headers; avoid mutating a shared response object across handlers
- [ ] **Keep handlers thin and promise-typed** — async handlers returning responses compose with Promise.all for parallel independent reads
- [ ] **app.request()** — in-process, fetch-shaped, no network:
- [ ] **Test the contract across adapters** — app.request exercises middlewares/handlers; a pair of adapter-level tests (Bun/Node serve) verify the deployment wiring

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
