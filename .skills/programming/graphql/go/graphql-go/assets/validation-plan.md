# graphql-go: Validation Plan

Use this plan to verify work guided by [graphql-go](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] Add field-level middleware for logging/timing: wrap Resolve functions
- [ ] Use graphql.Extensions for Apollo-style federation (via graphql-go-tools federation composition)
- [ ] Cache: schema is immutable after creation — construct once at startup
- [ ] Cost/limit: analyze queries manually or with graphql-go middleware for depth/complexity
- [ ] Type assertions on p.Args["x"] crashing if type differs → validate via the declared arg types
- [ ] N+1 resolves by synchronous load per parent
- [ ] Ignoring result.Errors when executing — client receives 500s with minimal detail
- [ ] Missing graphql.NewNonNull on required args → silently coerced to null

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
