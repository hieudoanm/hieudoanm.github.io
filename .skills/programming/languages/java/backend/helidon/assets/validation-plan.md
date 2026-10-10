# Helidon Best Practices: Validation Plan

Use this plan to verify work guided by [Helidon Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Java and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Validate at the boundary; map to 400/404** explicitly:
- [ ] **ExceptionMapper/ErrorHandler for the rest** — a domain exception becomes an HTTP response in one place
- [ ] **Log + render**: internal detail goes to logs (structured); a safe, generic message to the client
- [ ] **Failures are not thrown from every handler layer** — a handler that returns early with a status is the readable path
- [ ] **Unit-test handlers with fake ServerRequest/ServerResponse or the in-memory WebServer:**
- [ ] **Service/repository boundaries mocked** with real fakes; boundary contract tested over infrastructure
- [ ] **MP**: helidon-microprofile-tests JUnit5 support for containers
- [ ] **Contract tests against a real dependency (DB) in a container** — the mapping layer is the integration

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
