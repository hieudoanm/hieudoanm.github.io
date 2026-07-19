# Apache Pulsar Best Practices: Validation Plan

Use this plan to verify work guided by [Apache Pulsar Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Understand at-least-once delivery** as the default
- [ ] **Expect redelivery on nack or timeout**
- [ ] **Use acknowledgement timeouts carefully** (too short → duplicate storms; too long → silent backlogs)
- [ ] **Design idempotent consumers** — redelivery is normal
- [ ] **Handle backlog growth explicitly** (lag monitoring, DLQs)
- [ ] **Use dead-letter topics when appropriate**
- [ ] **Rely on persistent topics for durability** (non-persistent only for fire-and-forget)
- [ ] **Understand replication guarantees** (geo-replication is eventual per namespace policy)
- [ ] **Scale by adding brokers and partitions**
- [ ] **Tune batching and compression** for throughput vs latency

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
