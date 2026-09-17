# Javalin Best Practices: Validation Plan

Use this plan to verify work guided by [Javalin Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Java and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Validate at the handler entry, fail fast:**
- [ ] **exceptionHandler per exception class, registered once:**
- [ ] **Domain exceptions carry status intent** (NotFoundException, BadRequestException) — the mapping is config, not handler boilerplate
- [ ] **Never fall through to an unhandled exception stack trace** — a LogAndComplete catch-all at the boundary
- [ ] **Javalin.create() in-memory + HttpClient (or TestClient)**:
- [ ] **app.port() dynamic for CI; before-middleware swapped with fakes in tests.**
- [ ] **Contract tests**: valid, invalid ID, not-found, unauthorized, validation rejection

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
