# emotion: Validation Plan

Use this plan to verify work guided by [emotion](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with CSS and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] With zero-config, styles inject at runtime; for SSR, use @emotion/server to extractCritical
- [ ] Bundle smallest: tree-import only @emotion/react features; emotion is very small already
- [ ] Server/client class mismatch with runtime CSS — use extraction on SSR
- [ ] Passing internal prop through styled without shouldForwardProp
- [ ] Mixing Emotion and other CSS-in-JS (duplicate cache/injectGlobal)

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
