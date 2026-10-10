# Beego Best Practices: Validation Plan

Use this plan to verify work guided by [Beego Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Go and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Config as env; graceful shutdown; runmode=prod with AutoRender=false for API mode:**
- [ ] **Tests: httptest+controller harness; service packages unit-tested; golden-response checks.**
- [ ] **Pin versions (go.mod); CI pipeline builds + tests + lint; health endpoints for SWR.**

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
