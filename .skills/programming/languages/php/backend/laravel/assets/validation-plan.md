# Laravel Backend Best Practices: Validation Plan

Use this plan to verify work guided by [Laravel Backend Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Php and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Test pyramid:**
- [ ] Unit tests for domain logic
- [ ] Feature tests for HTTP flows
- [ ] **Avoid over-mocking Eloquent** — test against a real test DB where invariants matter; stub only external services
- [ ] **Use database factories intentionally** — User::factory()->create() in tests, seed data deliberately
- [ ] **Deterministic tests over brittle mocks** — refresh database between tests (RefreshDatabase)
- [ ] **Portable across FPM, CLI (Artisan), and queues/workers** — domain/services work in all entrypoints
- [ ] **Structured logging & exception handling** — Laravel logging channels; exception reporters; API error shapes centralized
- [ ] **Validate input early via Form Requests** — authorization + rules colocated with the request
- [ ] **Fail fast on invalid input** — Laravel's validation redirects/422s before business logic runs

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
