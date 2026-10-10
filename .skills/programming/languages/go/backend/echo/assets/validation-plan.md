# Echo Best Practices: Validation Plan

Use this plan to verify work guided by [Echo Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Go and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Handler tests via httptest + the full router** — a real HTTP request, not a fake:
- [ ] **Fakes at the service/repo boundary** — the handler test owns the HTTP layer; service test owns domain logic
- [ ] **Integration tests via httptest.NewServer** for real network round-trips
- [ ] **Contract cases**: valid, invalid, not-found, unauthorized, method-not-allowed

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
