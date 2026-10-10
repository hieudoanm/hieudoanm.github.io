# Quarkus Best Practices: Validation Plan

Use this plan to verify work guided by [Quarkus Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Java and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **@QuarkusTest boots the app in-process — real HTTP, real config:**
- [ ] **@TestHTTPResource/test HTTP client; @InjectMock for seams; panache test with a test database.**
- [ ] **Native-image contract**: quarkus build -Dnative produces a binary the CI actually runs — tests against the native artifact, not just the JVM:
- [ ] GraalVM reachability (reflection) surprises surface only in native — assert the native profile in CI
- [ ] **Contract cases** at HTTP + service boundaries: valid, invalid, not-found, validation-failure

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
