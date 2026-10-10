# Express.js Backend Best Practices: Validation Plan

Use this plan to verify work guided by [Express.js Backend Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Validate every request with zod at the route edge** — params, query, and body schemas fail fast with 400s and never reach the service:
- [ ] **Return narrowed parsed data, not the raw body** — the handler consumes parsed.data, so types stay honest downstream
- [ ] **Coerce ids/numbers in the schema** (z.coerce.number()), don't Number(req.params.id) in handlers
- [ ] **Validate req.query too** — query shapes are input as much as bodies
- [ ] **helmet() + explicit cors origin policy** on every public app
- [ ] **Rate limiting + auth-z at the router level** for protected resources (before business logic)
- [ ] **Never log request bodies or req.headers.authorization** — default redaction in pino-http for secrets
- [ ] **Payload limits** (express.json({ limit })) and **content-type checks** — reject unexpected shapes early
- [ ] **Input is untrusted**: zod at the boundary + Prisma/Drizzle schema-typed data access (see orm/ skills) close the common injection paths
- [ ] **supertest against the app.ts export** — in-process, no port binding:

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
