# unocss: Validation Plan

Use this plan to verify work guided by [unocss](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with CSS and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] Effective content scanning keeps bundles at ~1-10 KB for typical apps
- [ ] Cache (.cache folder) to avoid re-scan; scan content vectors precisely
- [ ] Use the browser DevTools preflight to inspect generated CSS
- [ ] Missing content configuration → icons/classes not generated for dynamic markup
- [ ] Preset conflicts when mixing preset-uno and preset-wind variants
- [ ] Dynamic class names (text-${color}) can't be extracted — use safelist

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
