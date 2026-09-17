# Fastify.js Backend Best Practices: Validation Plan

Use this plan to verify work guided by [Fastify.js Backend Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Declare JSON Schema per route** — validation _and serialization_ from one declaration; fast, typed, and enforced:
- [ ] **Validation is at the edge, for free** — validation errors return 400 automatically with the schema's issue list; no manual ifs
- [ ] **response schemas validate & serialize outgoing** — they shape the payload and (via the response map) guarantee a stable public contract, catching drift before it ships
- [ ] **TypeBox/json-schema-to-ts so runtime and types agree** — pick one type-provider and register it once (app.setValidatorCompiler(...) via the provider plugin); don't mix
- [ ] **Zod also first-class** (@fastify/type-provider-zod) if the team standard is zod — the point is _one_ provider, shared with the boundary-validation skills
- [ ] **Schema validation is the performance story** — route schema makes handlers parse-free & pre-validated; don't replace it with zod-in-handler checks that defeat Fastify's fast path
- [ ] **Async everywhere, awaited** — handlers return payloads (Fastify serializes); never await next-blocking I/O; keep the event loop honest (see Node runtime skill)
- [ ] **Outbound calls timed** (AbortSignal.timeout) so a hung upstream can't pin a worker
- [ ] **Instance cost is zero-ish** — prefer await app.ready() + app.listen once; don't create a new Fastify() per request
- [ ] **process.availableMemory / --expose-gc tuning is an optimization** — measure before you tune; the default config is the sensible baseline until profiled

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
