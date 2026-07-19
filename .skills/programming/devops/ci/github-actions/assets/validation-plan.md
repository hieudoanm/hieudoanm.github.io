# GitHub Actions Best Practices: Validation Plan

Use this plan to verify work guided by [GitHub Actions Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application and its deployment environment.
- Access to the relevant pipeline, infrastructure, or runtime configuration.

## Skill-specific review

- [ ] **Deploy to various platforms:**
- [ ] **Use conditional deployment (only on main branch).**
- [ ] **Use environment-specific workflows.**
- [ ] **Use deployment actions (Heroku, AWS, etc.).**
- [ ] **Use security best practices:**
- [ ] **Use security scanning tools.**
- [ ] **Use code scanning for dependency vulnerabilities.**
- [ ] **Use security alerts for security notifications.**

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
