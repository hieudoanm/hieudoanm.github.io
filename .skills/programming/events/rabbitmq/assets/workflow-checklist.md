# RabbitMQ Best Practices: Workflow Checklist

A practical run sheet for applying [RabbitMQ Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: Assume RabbitMQ **3.x**
- [ ] 1. Core Stack & Constraints: RabbitMQ is **message-queue–oriented**, not a log — messages are **consumed and removed**
- [ ] 2. Messaging & Exchange Design: **Model messages around commands and tasks**, not free-form events
- [ ] 2. Messaging & Exchange Design: **Choose exchange types intentionally**: direct (targeted), topic (patterned), fanout (broadcast)
- [ ] 3. Reliability & Delivery Guarantees: **Use acknowledgements explicitly**; understand **auto-ack vs manual ack**
- [ ] 3. Reliability & Delivery Guarantees: **Ensure idempotent consumers** — **expect duplicate deliveries**
- [ ] 4. Performance & Operations: **Tune prefetch** to control throughput (trade-off: fairness vs concurrency)
- [ ] 4. Performance & Operations: **Monitor queue depth and consumer rates**
- [ ] 5. General Rules of Thumb: **Broker for workflows, not logs** — messages are consumed and gone
- [ ] 5. General Rules of Thumb: **Explicit routing and explicit retries** — exchanges/DLX/retry queues are design, not magic

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
