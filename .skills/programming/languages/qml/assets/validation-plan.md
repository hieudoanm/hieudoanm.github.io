# QML Best Practices: Validation Plan

Use this plan to verify work guided by [QML Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Qml and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Item as root** — use Item { } as the root Item when you don't need a specific visual type; it's the lightest
- [ ] **Loader for on-demand loading** — Loader { sourceComponent: myComponent; active: visible } loads components only when needed
- [ ] **Avoid JavaScript loops** for large datasets — use Model and Repeater instead

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
