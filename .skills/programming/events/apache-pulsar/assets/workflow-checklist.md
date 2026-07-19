# Apache Pulsar Best Practices: Workflow Checklist

A practical run sheet for applying [Apache Pulsar Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: Assume Pulsar **2.x / 3.x**
- [ ] 1. Core Stack & Constraints: Pulsar is a **distributed log with cursor-based consumption** — retained independent of consumption
- [ ] 2. Topic, Subscription & Schema Design: **Design topics by domain and ownership**; use **namespaces for quotas and isolation**
- [ ] 2. Topic, Subscription & Schema Design: **Choose subscription type intentionally:**
- [ ] 3. Reliability & Delivery Guarantees: **Understand at-least-once delivery** as the default
- [ ] 3. Reliability & Delivery Guarantees: **Expect redelivery on nack or timeout**
- [ ] 4. Performance, Scaling & Operations: **Scale by adding brokers and partitions**
- [ ] 4. Performance, Scaling & Operations: **Tune batching and compression** for throughput vs latency
- [ ] 5. General Rules of Thumb: **Log + cursors, not queues** — retention and consumption are decoupled
- [ ] 5. General Rules of Thumb: **Subscriptions are state** — type chosen by ordering/scale needs, managed explicitly

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
