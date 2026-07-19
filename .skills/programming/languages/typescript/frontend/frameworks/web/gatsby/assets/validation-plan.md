# Gatsby Best Practices: Validation Plan

Use this plan to verify work guided by [Gatsby Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Image optimization** — use gatsby-plugin-image:
- [ ] **Code splitting** — Gatsby automatically code-splits routes
- [ ] **Lazy loading** — use React.lazy for lazy loading:
- [ ] **Component testing** — test components with Jest:
- [ ] **E2E testing** — use Cypress for E2E testing:

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
