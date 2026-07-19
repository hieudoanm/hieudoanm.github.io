# tailwindcss: Validation Plan

Use this plan to verify work guided by [tailwindcss](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with CSS and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] Do not use @apply inside the same file you write utilities for (Layers workaround) — apply it only in component layer
- [ ] Avoid dynamic class strings like text-${color} — Tailwind can't inline-extract them (use full class names or safelist)
- [ ] Prefer small @layer for overrides; rely on JIT scan accuracy
- [ ] Missing content globs → classes silently dropped in production
- [ ] Dynamic/concatenated class names break extraction
- [ ] Overriding with CSS specificity fights instead of using config/theme
- [ ] Forgetting dark-mode variant toggling setup (class vs media)

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
