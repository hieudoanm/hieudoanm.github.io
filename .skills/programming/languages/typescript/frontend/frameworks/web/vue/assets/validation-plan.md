# Vue.js Best Practices: Validation Plan

Use this plan to verify work guided by [Vue.js Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **v-once for static content** — use v-once for content that doesn't change:
- [ ] **v-memo for conditional rendering** — use v-memo to skip updates:
- [ ] **Lazy loading routes** — lazy load route components:
- [ ] **Async components** — use async components for code splitting:
- [ ] **Vue Test Utils** — test components with Vue Test Utils:
- [ ] **Vitest for unit testing** — use Vitest for fast unit testing
- [ ] **Playwright for E2E testing** — use Playwright for end-to-end testing

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
