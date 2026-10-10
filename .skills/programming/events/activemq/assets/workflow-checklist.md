# ActiveMQ Best Practices: Workflow Checklist

A practical run sheet for applying [ActiveMQ Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: Assume **ActiveMQ Classic or Artemis (latest stable)**
- [ ] 1. Core Stack & Constraints: ActiveMQ is **message-oriented middleware, not a stream** — messages are **consumed, acknowledged, and removed**
- [ ] 2. Messaging Models & Destination Design: **Queues** — point-to-point workflows with **competing consumers**
- [ ] 2. Messaging Models & Destination Design: **Topics** — publish–subscribe fan-out; **durable subscriptions when required**
- [ ] 3. Reliability, Transactions & Delivery Semantics: Understand **JMS acknowledgement modes**:
- [ ] 3. Reliability, Transactions & Delivery Semantics: AUTO_ACKNOWLEDGE — auto after delivery handed to consumer
- [ ] 4. Performance & Operations: Monitor: **queue depth, consumer lag, disk usage**
- [ ] 4. Performance & Operations: Tune: **prefetch**, persistence adapters (KahaDB/AMQ for Classic; Artemis journal)
- [ ] 5. General Rules of Thumb: **JMS is the model** — Queue/Topic, ack modes, transactions are the vocabulary
- [ ] 5. General Rules of Thumb: **Explicit delivery semantics** — ack, redelivery, and DLQ are design decisions

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
