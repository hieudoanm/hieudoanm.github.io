# Actix-web Best Practices: Validation Plan

Use this plan to verify work guided by [Actix-web Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **.await handlers via actix_web::test** — build the App once, reuse in tests:
- [ ] **test::TestRequest gives the full HTTP contract; service/repo fakes injected via AppState.**
- [ ] **Contract cases**: valid, not-found, bad input, unauthorized, method-not-allowed

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
