# Apache Kafka Best Practices: Workflow Checklist

A practical run sheet for applying [Apache Kafka Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: Assume Kafka **3.x**
- [ ] 1. Core Stack & Constraints: Kafka is **not** a request-response system and **not** a database
- [ ] 2. Topic & Data Modeling: **Design topics around business events** (past-tense, domain-derived: order.placed)
- [ ] 2. Topic & Data Modeling: Use **clear, stable topic naming conventions**
- [ ] 3. Reliability & Delivery Guarantees: **Be explicit about delivery semantics** (at-most-once / at-least-once / exactly-once)
- [ ] 3. Reliability & Delivery Guarantees: Understand **producer acknowledgements (acks)** — acks=all for no silent loss
- [ ] 4. Performance & Operations: **Balance partition count vs throughput** (partitions = parallelism; too many = overhead)
- [ ] 4. Performance & Operations: **Monitor consumer lag continuously** (should trend to ~0, not grow unbounded)
- [ ] 5. General Rules of Thumb: **Log, not queue** — consumers read their own offset and replay freely
- [ ] 5. General Rules of Thumb: **Order per partition, keys define it** — design partition keys as first-class

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
