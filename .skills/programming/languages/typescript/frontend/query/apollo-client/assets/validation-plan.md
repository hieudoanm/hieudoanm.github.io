# Apollo Client Best Practices: Validation Plan

Use this plan to verify work guided by [Apollo Client Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Bundle/fetch: @apollo/client fused; persisted queries where hot.**
- [ ] **React Profiler + Apollo DevTools for cache shapes; gql modularized so only used fields ship.**
- [ ] **End-to-end: typed hooks (@graphql-codegen) reduce string-drift — codegen on schema changes.**

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
