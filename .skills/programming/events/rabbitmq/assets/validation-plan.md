# RabbitMQ Best Practices: Validation Plan

Use this plan to verify work guided by [RabbitMQ Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Use acknowledgements explicitly**; understand **auto-ack vs manual ack**
- [ ] **Ensure idempotent consumers** — **expect duplicate deliveries**
- [ ] **Persist messages** that must survive broker restarts (durable queues + PERSISTENT)
- [ ] **Use quorum queues** where appropriate (replicated, HA)
- [ ] **Handle poison messages explicitly** — route to DLQ, don't silently drop
- [ ] **Never drop messages silently unless intentional**
- [ ] **Tune prefetch** to control throughput (trade-off: fairness vs concurrency)
- [ ] **Monitor queue depth and consumer rates**
- [ ] **Avoid hot queues** (single-key contention)
- [ ] **Scale consumers horizontally** (competing consumers on the same queue)

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
