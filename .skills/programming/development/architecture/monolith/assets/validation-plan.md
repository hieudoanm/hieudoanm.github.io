# Monolithic Architecture Best Practices: Validation Plan

Use this plan to verify work guided by [Monolithic Architecture Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Authentication** — implement authentication mechanism
- [ ] **Authorization** — implement role-based access control
- [ ] **Input validation** — validate all input
- [ ] **Secure communication** — use HTTPS
- [ ] **Secrets management** — manage secrets securely
- [ ] **Containerization** — use Docker for consistent deployment:
- [ ] **CI/CD** — implement continuous integration and deployment
- [ ] **Environment configuration** — manage environment-specific configuration
- [ ] **Health checks** — implement health check endpoints

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
