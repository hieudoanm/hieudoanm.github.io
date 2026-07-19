# React Best Practices: Validation Plan

Use this plan to verify work guided by [React Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **React.memo for expensive components** — memoize components that re-render unnecessarily:
- [ ] **Code splitting** — use React.lazy and Suspense for code splitting:
- [ ] **Virtualization for long lists** — use react-window or react-virtual for long lists
- [ ] **Avoid unnecessary re-renders** — use proper memoization techniques
- [ ] **React Testing Library** — test components as users interact with them:
- [ ] **Test behavior, not implementation** — test what users see and do
- [ ] **Integration testing** — test component interactions together

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
