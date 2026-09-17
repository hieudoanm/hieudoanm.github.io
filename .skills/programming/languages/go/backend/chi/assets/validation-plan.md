# Chi Best Practices: Validation Plan

Use this plan to verify work guided by [Chi Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Go and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **httptest.NewRecorder + http.NewRequest to test handlers as pure HTTP:**
- [ ] **Spin the full router in integration tests** — httptest.NewServer(apiRouter()) for real HTTP round-trips
- [ ] **Fakes/mocks at the repo boundary** — handler tests verify HTTP shape + error mapping; repo tests verify query logic
- [ ] **Contract tests**: valid, invalid ID, not-found, method-not-allowed, unauthorized

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
