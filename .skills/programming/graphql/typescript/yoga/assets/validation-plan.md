# yoga: Validation Plan

Use this plan to verify work guided by [yoga](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] Use useResponseCache plugin (automatic) for GET-side caching
- [ ] Enable persisted queries: usePersistedOperations
- [ ] Compose with @graphql-tools/stitching/merge for modular schemas
- [ ] Using graphql-yoga v2 API with v3 (access yoga.fetch/yoga.handleRequest instead of legacy handleRequest in newer major versions)
- [ ] Forgetting subscriptions' async iterator errors are swallowed without logging
- [ ] Uploads hitting default body size limits without configuring body size in the HTTP layer
- [ ] Mixing SSE and WS semantics without knowing the client supports them

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
