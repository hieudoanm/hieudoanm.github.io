# Svelte Best Practices: Validation Plan

Use this plan to verify work guided by [Svelte Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Optimization** — Svelte is already optimized by compilation
- [ ] **Lazy loading** — lazy load components:
- [ ] **Virtual lists** — use virtual lists for long lists:
- [ ] **Testing Library** — test components with Testing Library:
- [ ] **Unit tests** — test reactive logic separately
- [ ] **E2E tests** — use Playwright for E2E testing

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
