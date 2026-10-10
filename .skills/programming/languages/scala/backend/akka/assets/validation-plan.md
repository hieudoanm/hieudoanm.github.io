# Akka Best Practices: Validation Plan

Use this plan to verify work guided by [Akka Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Scala and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Test actor behavior with ActorTestKit:**
- [ ] **Streams via TestSource/TestSink probes** — the pipeline contract (emit counts, completion, errors)
- [ ] **Event-sourced actors via PersistenceTestKit** — replay and snapshot behaviors asserted
- [ ] **Contract cases**: message protocol, supervision trigger, timeout behavior

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
