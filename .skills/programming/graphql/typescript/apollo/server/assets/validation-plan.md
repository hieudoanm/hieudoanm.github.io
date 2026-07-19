# apollo-server: Validation Plan

Use this plan to verify work guided by [apollo-server](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] Use @apollo/server tracing: tracing: { includeUnusedVariables }, engine/reporting to Apollo Studio (or Prometheus)
- [ ] Persisted queries for safe, cheap, high-traffic clients
- [ ] **Batching**: enable batchEnabled: true in applyMiddleware (send multiple ops) — but usually N-1 queries are the issue; fix with DataLoader
- [ ] Set sensible VARIABLES/payload limits; enable csrfPrevention and logger
- [ ] Skipping await server.start() before applyMiddleware → runtime 500s
- [ ] Returning null vs throwing for nullable fields (client gets null + no error vs error)
- [ ] Leaking internal errors via formatError default (stack traces)
- [ ] Forgetting DataLoader → N+1 avalanche
- [ ] Not validating input beyond SDL types (injection, huge payloads)

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
