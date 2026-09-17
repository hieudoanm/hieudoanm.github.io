# Material Design 3: Validation Plan

Use this plan to verify work guided by [Material Design 3](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] Mixing M2 and M3 components — token mismatch (e.g., Surface with old elevation)
- [ ] Hardcoding colors instead of using scheme roles (breaks dark/dynamic theming)
- [ ] Ignoring **accessibility**: contrast on tonal surfaces, localizedStrings, touch targets (minimumInteractiveComponentSize)
- [ ] Loading dynamic color on unsupported OS versions without fallback

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
