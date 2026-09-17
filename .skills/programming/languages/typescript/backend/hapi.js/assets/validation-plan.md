# Hapi.js Backend Best Practices: Validation Plan

Use this plan to verify work guided by [Hapi.js Backend Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Joi at the route edge, failAction: "error"** — schemas for payload, params, query, and headers where relevant; no manual ifs:
- [ ] **Coerce and default in the schema** (Joi.number(), .default(...), .allow("", null)) so handlers receive normalized data
- [ ] **Joi.any().unknown(true) only for open-ended payloads** — prefer strict, closed shapes for APIs you control
- [ ] **Cross-field constraints** (Joi.object().and("a", "b"), .oxor(...)) express invariants Joi understands natively; keep schemas colocated with each route's options.validate
- [ ] **server.inject()** — in-process, no network, tests the full lifecycle (validation, auth, hooks, error mapping):
- [ ] **Build the app through a buildServer() factory** (create, register plugins, no start) — tests inject into that instance
- [ ] **Assert the contract**: validation-failure 400s (with Boom detail), auth 401s, cache hit vs miss, and the onPreResponse envelope on a 500
- [ ] **Isolate** — in-memory/test DB per suite; mock at the service seam; exercise onPreResponse for error-shape stability

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
