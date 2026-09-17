# sass: Validation Plan

Use this plan to verify work guided by [sass](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with CSS and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] Using legacy @import (global namespace pollution) instead of @use/@forward
- [ ] Over-nesting/@extend chains that balloon specificity and output size
- [ ] Mixing unit arithmetic without strip-unit/math helpers
- [ ] Assuming media-query + variable values are interpolated everywhere (works in Dart Sass)

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
