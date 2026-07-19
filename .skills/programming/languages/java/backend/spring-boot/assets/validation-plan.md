# Spring Boot Backend Best Practices: Validation Plan

Use this plan to verify work guided by [Spring Boot Backend Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Java and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Combine Bean Validation with DTOs** — @Valid on the controller parameter, constraints on the record:
- [ ] **Fail fast on invalid input** — validation happens at the boundary before any service work
- [ ] **Never trust client input** — validate path/query/body; use constraint annotations (@NotBlank, @Email, @Positive, ranges)
- [ ] **Domain invariant checks live in services** — HTTP-shape validation via annotations, business rules via explicit service checks throwing domain exceptions
- [ ] **Prefer method-level security over controller checks** — @PreAuthorize/@Secured declaratively:
- [ ] **Spring Security for authN/authZ** — JWT/OAuth2 via the security filter chain, configured explicitly per route
- [ ] **Security-sensitive logic lives in the service layer** — controllers enforce the boundary, services enforce policy
- [ ] **Never trust client input; validate everything at the boundary.**
- [ ] **Small, focused methods**; clear intent-revealing naming; prefer immutability where possible
- [ ] **Avoid side effects in entity constructors** — keep construction and behavior distinct

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
