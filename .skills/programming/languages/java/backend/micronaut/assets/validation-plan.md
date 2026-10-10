# Micronaut Best Practices: Validation Plan

Use this plan to verify work guided by [Micronaut Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Java and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Bean Validation (@Valid, @NotBlank, @Size) at the request boundary (see @Valid CreateUser); @NotNull in services:**
- [ ] **Custom error mapping via @Error/@ExceptionHandler:**
- [ ] **Fail-fast validation before side effects** — invalid input never reaches a service
- [ ] **Unknown exceptions logged + mapped to 500** — no stack trace to the client
- [ ] **@MicronautTest spins the full context; inject mocks/real beans:**
- [ ] **Service/repository tests against a real container Postgres for the mapping layer; fakes elsewhere.**
- [ ] **Contract cases**: valid, invalid, not-found, validation-failure — at the HTTP boundary and the service boundary

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
