# less: Validation Plan

Use this plan to verify work guided by [less](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with CSS and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] Over-nesting causing high-specificity selectors that remove flexibility
- [ ] Forgetting variable lazy-evaluation order (evaluated at last use)
- [ ] Mixing units in operations without conversion utilities
- [ ] Compiling in production — always precompile before deploy; in-browser mode is dev-only

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
