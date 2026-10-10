# CI/CD Harness Best Practices: Validation Plan

Use this plan to verify work guided by [CI/CD Harness Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application and its deployment environment.
- Access to the relevant pipeline, infrastructure, or runtime configuration.

## Skill-specific review

- [ ] **Secret masking** — never log secrets; use CircleCI's secure environment variables
- [ ] **Pipeline approvals** — require manual approval before production deployments
- [ ] **Dependency scanning** — run npm audit, pip-audit, or trivy as pipeline steps

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
