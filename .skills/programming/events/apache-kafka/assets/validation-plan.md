# Apache Kafka Best Practices: Validation Plan

Use this plan to verify work guided by [Apache Kafka Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Be explicit about delivery semantics** (at-most-once / at-least-once / exactly-once)
- [ ] Understand **producer acknowledgements (acks)** — acks=all for no silent loss
- [ ] Handle **retries and idempotence** correctly (enable.idempotence=true)
- [ ] **Commit offsets deliberately** — after processing completes, not before
- [ ] **Do not assume exactly-once without full pipeline support** (producer + consumer + downstream)
- [ ] **Design consumers to be idempotent** — duplicates and reprocessing are normal
- [ ] **Expect and handle reprocessing** (replaying from an older offset)
- [ ] **Balance partition count vs throughput** (partitions = parallelism; too many = overhead)
- [ ] **Monitor consumer lag continuously** (should trend to ~0, not grow unbounded)
- [ ] **Avoid hot partitions** — skew in keys causes single-partition hotspots

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
