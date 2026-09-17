# Python Best Practices: Validation Plan

Use this plan to verify work guided by [Python Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **pytest + fixtures over unittest boilerplate** — conftest.py for shared setup; fixtures inject, don't global-setup:
- [ ] **@pytest.mark.parametrize for table-driven cases** — data and expectation in one readable declaration
- [ ] **Name tests as sentences** — def test_returns_404_when_user_not_found(): reads as a specification
- [ ] **Tests import via the public API**, not internals — black-box tests catch design issues that white-box ones miss
- [ ] **Keep tests isolated** — each test gets fresh fixtures; no ordering dependencies, no shared mutable state
- [ ] **Mock the boundaries** (network, clock, filesystem) with monkeypatch/freeze_time, not the logic under test

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
