# bootstrap: Validation Plan

Use this plan to verify work guided by [bootstrap](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with CSS and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] Importing JS but missing Popper for tooltips/popovers
- [ ] Overriding components by hacky class overrides instead of Sass variables
- [ ] Neglecting responsiveness on custom content (fixed widths outside grid)
- [ ] Conflict between Bootstrap and existing CSS (order/layer management)

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
