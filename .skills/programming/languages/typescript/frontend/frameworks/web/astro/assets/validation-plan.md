# Astro Best Practices: Validation Plan

Use this plan to verify work guided by [Astro Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Zero JavaScript by default** — Astro ships zero JavaScript by default
- [ ] **Island architecture** — hydrate only interactive components
- [ ] **Image optimization** — use Astro's image component:
- [ ] **Code splitting** — Astro automatically code-splits routes
- [ ] **Lazy loading** — use lazy loading for heavy components
- [ ] **Unit testing** — test components with Vitest:
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
