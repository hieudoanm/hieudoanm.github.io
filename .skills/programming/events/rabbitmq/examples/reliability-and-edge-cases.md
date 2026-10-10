# RabbitMQ Best Practices: 4. Performance & Operations

## Scenario

A project is working on **4. performance & operations** for RabbitMQ Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Tune prefetch** to control throughput (trade-off: fairness vs concurrency)
- **Monitor queue depth and consumer rates**
- **Avoid hot queues** (single-key contention)
- **Scale consumers horizontally** (competing consumers on the same queue)
- Understand **cluster vs mirrored/quorum queues** and their costs
- **Monitor memory and disk alarms** (flow control, watermark)
- **Test failure and recovery scenarios**; document operational limits

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Performance & Operations** section of [SKILL.md](../SKILL.md).
