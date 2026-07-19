# http4s Best Practices: Validation Plan

Use this plan to verify work guided by [http4s Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Scala and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **org.http4s.client.test/withHttpApp on the real app; or Request-to-Response directly:**
- [ ] **Mock the F boundary** — repo fakes; the route test verifies HTTP shape and status mapping
- [ ] **Contract cases**: valid, not-found, bad JSON body, invalid path param, auth rejection

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
