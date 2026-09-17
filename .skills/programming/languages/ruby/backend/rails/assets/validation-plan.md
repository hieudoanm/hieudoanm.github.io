# Rails Backend Best Practices: Validation Plan

Use this plan to verify work guided by [Rails Backend Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Ruby and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Test pyramid:**
- [ ] Unit tests for POROs
- [ ] Model tests for invariants
- [ ] Request/system tests for flows
- [ ] **Avoid brittle controller-only tests** — test behavior through requests/feature tests
- [ ] **Use factories intentionally** (FactoryBot) — consistent fixtures, deliberate creates; avoid test-only setup drift
- [ ] **Deterministic tests over heavy mocking** — real DB where invariants matter; stubs for external services
- [ ] **Structured logging and error reporting** — Rails log tags, Rails.logger structured entries, error reporters (Sentry etc.)
- [ ] **Configuration via environment variables** — ENV-driven config, credentials for secrets
- [ ] **Be mindful of N+1, eager/lazy loading, and object allocations** in request paths — measure before optimizing

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
