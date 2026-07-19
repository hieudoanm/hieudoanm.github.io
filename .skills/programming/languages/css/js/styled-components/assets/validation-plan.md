# styled-components: Validation Plan

Use this plan to verify work guided by [styled-components](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with CSS and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] CSS-in-JS has runtime cost: render passes on every prop change; use memo/PureComponent where possible
- [ ] Consider styled-components/macro for combinator/to-something-safe builds
- [ ] Passing internal props into DOM (shouldForwardProp to filter)
- [ ] Server/client class mismatch when SSR extraction isn't wired
- [ ] Compute functions referencing props wrongly (function form uses returns)

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
