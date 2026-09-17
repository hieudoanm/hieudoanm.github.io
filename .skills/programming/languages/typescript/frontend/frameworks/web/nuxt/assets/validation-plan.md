# Nuxt Best Practices: Validation Plan

Use this plan to verify work guided by [Nuxt Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Lazy loading** — components are lazy-loaded by default
- [ ] **Image optimization** — use Nuxt Image:
- [ ] **Font optimization** — use Nuxt Fonts:
- [ ] **Code splitting** — Nuxt automatically code-splits routes
- [ ] **Component testing** — test components with Vitest:
- [ ] **E2E testing** — use Playwright for E2E testing:

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
