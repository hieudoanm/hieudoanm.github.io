# React Native Best Practices: Validation Plan

Use this plan to verify work guided by [React Native Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **FlatList for long lists** — use FlatList instead of ScrollView for long lists:
- [ ] **memoization** — use React.memo for expensive components:
- [ ] **Avoid inline functions** — avoid inline functions in render:
- [ ] **Image optimization** — optimize images for mobile
- [ ] **React Native Testing Library** — test components:
- [ ] **Detox for E2E testing** — use Detox for end-to-end testing:

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
