# Redis Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Redis Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Namespaced keys with clear ownership; TTLs explicit
- [ ] Correct data structure per access pattern; Hashes over key sprawl
- [ ] Bounded structures; no large values; no `KEYS` — only `SCAN`
- [ ] Eviction policy chosen deliberately; memory + hit ratio monitored
- [ ] Pipelining/Lua for batches; known O(N) vs O(1) costs
- [ ] Hot keys avoided; failover/cold-start plans in place
- [ ] Not exposed publicly; auth + ACLs; sensitive data not plaintext

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
