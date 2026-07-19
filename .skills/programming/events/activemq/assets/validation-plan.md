# ActiveMQ Best Practices: Validation Plan

Use this plan to verify work guided by [ActiveMQ Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] Understand **JMS acknowledgement modes**:
- [ ] AUTO_ACKNOWLEDGE — auto after delivery handed to consumer
- [ ] CLIENT_ACKNOWLEDGE — consumer controls the ack point
- [ ] DUPS_OK_ACKNOWLEDGE — lazy, may deliver duplicates
- [ ] **Prefer explicit acknowledgement for critical flows**
- [ ] Use **transactions** for exactly-once-like semantics: **at-least-once + idempotency**
- [ ] **Expect duplicate deliveries**; **configure redelivery policies explicitly**
- [ ] **Route poison messages to DLQ** (ActiveMQ default ActiveMQ.DLQ)
- [ ] **Never assume "exactly once" without design support**
- [ ] Monitor: **queue depth, consumer lag, disk usage**

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
