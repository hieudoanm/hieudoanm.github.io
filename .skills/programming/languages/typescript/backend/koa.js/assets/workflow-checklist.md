# Koa.js Backend Best Practices: Workflow Checklist

A practical run sheet for applying [Koa.js Backend Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: koa — the app (current v2/v3)
- [ ] 1. Core Stack: @koa/router — routing (Koa ships none)
- [ ] 2. The Context Model: **ctx is both request and response** — ctx.method, ctx.url, ctx.params/ctx.request.body, and output via ctx.body/ctx.status:
- [ ] 2. The Context Model: **Setting ctx.body is the response** — Koa serializes and assigns status; ctx.body = null means 204. Prefer assigning a value over mutating ctx.res directly
- [ ] 3. Onion Middleware (The Core Idea): **await next() composes up and down** — setup before next, teardown after; this is _the_ Koa idiom:
- [ ] 3. Onion Middleware (The Core Idea): **Order matters and is explicit** — security → logging/request-id → body parsing → routes → error handler (see §4–5)
- [ ] 4. Routing: **Router prefix for versioning/namespacing** (api/v1/users); one router file per resource
- [ ] 4. Routing: **allowedMethods()** yields proper 405 Method Not Allowed for undefined verbs on a path — free correctness
- [ ] 5. Validation & Input Handling: **koa-bodyparser with a limit** (e.g. { limit: "1mb" }) mounted early — unbounded bodies are a memory-exhaustion risk
- [ ] 5. Validation & Input Handling: **Validate ctx.params (strings), ctx.query (strings), and ctx.request.body** with zod at the route, coerce ids/numbers in the schema:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
