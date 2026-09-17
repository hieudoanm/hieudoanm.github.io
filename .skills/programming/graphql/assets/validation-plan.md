# graphql: Validation Plan

Use this plan to verify work guided by [graphql](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **N+1 problem**: resolvers that fire one DB query per parent row — solve with **DataLoader** (batching + caching per request) or joins in single resolvers
- [ ] **Batching**: DataLoader loader.load(key) coalesces concurrent loads per tick
- [ ] Cost/limiting: guard against expensive queries (depth, alias-count, complexity limits) before abuse
- [ ] Use **persisted queries** for high-traffic clients and to reduce HTTP payload
- [ ] Resolver N+1 without batching — the performance cliff
- [ ] Non-null fields propagated on a fragile upstream, causing cascading query failures
- [ ] No limits on depth/aliases, enabling denial-of-service via query cost
- [ ] Schema stubs with no real types: always design the contract first
- [ ] Mutating inside a Query field — keep read/write separation

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
