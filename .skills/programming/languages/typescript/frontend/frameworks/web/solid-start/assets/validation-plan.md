# SolidStart Best Practices: Validation Plan

Use this plan to verify work guided by [SolidStart Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Fine-grained reactivity** — Solid's reactivity is already optimized
- [ ] **Lazy loading** — lazy load components:
- [ ] **Code splitting** — SolidStart automatically code-splits routes
- [ ] **Image optimization** — optimize images for web
- [ ] **Component testing** — test components with Solid Testing Library:
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
