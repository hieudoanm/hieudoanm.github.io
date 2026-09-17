# mercurius: Validation Plan

Use this plan to verify work guided by [mercurius](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] Forgetting loaders config → N+1 resolver storms on lists
- [ ] Async resolver violating single-instance pubsub (Redis adapter needed in multi-node)
- [ ] Not decorating context in a Fastify-friendly way (decorate + expose instance)
- [ ] Not enabling federationMetadata before adding @key types

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
