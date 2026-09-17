# Koa.js Backend Best Practices: Validation Plan

Use this plan to verify work guided by [Koa.js Backend Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **koa-bodyparser with a limit** (e.g. { limit: "1mb" }) mounted early — unbounded bodies are a memory-exhaustion risk
- [ ] **Validate ctx.params (strings), ctx.query (strings), and ctx.request.body** with zod at the route, coerce ids/numbers in the schema:
- [ ] **Fail fast — a ZodError reaching the error middleware becomes a 400** (see §6); never forward raw req payloads to services
- [ ] Prefer parsing to safeParse at the route edge (throw → centralized 400) over hand-rolled ifs per field
- [ ] **No blocking I/O in handlers** — async fs/fetch/DB; keep the event loop honest (Node runtime skill)
- [ ] **Outbound calls AbortSignal.timeout(…)** so a hung upstream can't hang the request
- [ ] **koa-helmet + @koa/cors (explicit origin) + rate limiting on auth routes** — the trio you bolt onto every public app
- [ ] **Never log sensitive bodies/headers**; redact authorization/cookie from logs; respect NO_COLOR-style conventions in any CLI-adjacent spans
- [ ] **Stream large responses via ctx.body = createReadStream(path)** instead of buffers where payloads are big
- [ ] **app.callback() composes the app into a plain (req,res)=>void handler** — perfect for supertest without a listener:

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
