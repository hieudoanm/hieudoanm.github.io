# RabbitMQ Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for RabbitMQ Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Exchanges/routing explicit; queue names + routing keys stable and meaningful
- [ ] Messages modeled as commands/tasks; payloads versioned deliberately
- [ ] Manual acks with explicit success/failure handling; idempotent consumers
- [ ] Durability for critical messages; quorum queues for HA where needed
- [ ] DLQ + retry queues designed; poison messages not silently dropped
- [ ] Prefetch tuned; no unbounded queues; large messages avoided
- [ ] Queue depth, consumer rates, memory/disk alarms monitored

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
