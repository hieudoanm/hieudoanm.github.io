# tailwindcss-plus: Validation Plan

Use this plan to verify work guided by [tailwindcss-plus](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with CSS and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] JIT: only used utilities are generated → tiny output vs old full builds
- [ ] Use @apply/@utility to compose; keep purging active in production builds
- [ ] Mixing v3 config needs with v4 CSS-first (double configs confuse)
- [ ] Overuse of arbitrary values killing the design-token system
- [ ] Forgetting @layer when overriding base styles with custom utilities

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
