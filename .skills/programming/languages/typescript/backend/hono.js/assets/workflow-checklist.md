# Hono.js Backend Best Practices: Workflow Checklist

A practical run sheet for applying [Hono.js Backend Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Runtime Choice: hono — the framework
- [ ] 1. Core Stack & Runtime Choice: @hono/node-server (Node), Bun/Deno/Workers run hono via their native fetch/serve — one framework, choose the adapter per deployment
- [ ] 2. App & Route Structure: **c.req.param()/c.req.query() return strings; validate before trusting** (see §4)
- [ ] 2. App & Route Structure: **Nest routers via app.route("/api/v1", api)** — namespacing without string-concatenating early; per-resource new Hono() subtypes keep route definitions grouped
- [ ] 3. Middleware (app.use): **One middleware per app.use, onion-style with await next()** — setup/logging in, teardown out:
- [ ] 3. Middleware (app.use): **Scope by path pattern** ("/api/*") — auth, CORS, and rate-limit target route families, not everything
- [ ] 4. Validation & Typed Input: **hono/zod-validator** — validate json/form/query/header/cookie with zod, and the parsed value rides c.req.valid("json") _typed_:
- [ ] 4. Validation & Typed Input: **c.req.valid() is set only after its validator ran** — handlers never touch raw c.req payloads
- [ ] 5. Error Handling & Lifecycle: **A single error-catcher middleware** (app.onError) maps ZodError/domain errors → status + envelope:
- [ ] 5. Error Handling & Lifecycle: **app.onError is the single funnel** — throw from handlers/schema errors alike; never c.status(...)+hand-build a 500 in a handler

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
