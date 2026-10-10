# Play Framework Backend Best Practices: Validation Plan

Use this plan to verify work guided by [Play Framework Backend Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Scala and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Validate input explicitly; never trust client input.**
- [ ] **Security-sensitive logic lives in services** — controllers enforce the boundary, services enforce policy
- [ ] **Be explicit about authentication and authorization boundaries** — Play filters (Filters via HttpFilters) for request-level cross-cutting, explicit policy checks in services
- [ ] **No global mutable state** for config or security context — inject via DI, thread through calls
- [ ] **Small, focused methods**; clear naming; prefer immutability (Scala default)
- [ ] **Explicit async boundaries** — every .flatMap/.map tells the reader where composition happens; no hidden blocking
- [ ] **Log at system boundaries** — controllers, DB, outbound integrations, errors
- [ ] **Clarity over clever abstractions** — idiomatic Scala, but readable for the whole team
- [ ] **scalatestplus-play for route/controller tests** — in-process via the Play test app:
- [ ] **Unit-test services** with constructor-injected fakes — no app boot needed

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
