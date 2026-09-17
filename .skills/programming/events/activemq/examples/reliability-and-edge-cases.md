# ActiveMQ Best Practices: 4. Performance & Operations

## Scenario

A project is working on **4. performance & operations** for ActiveMQ Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- Monitor: **queue depth, consumer lag, disk usage**
- Tune: **prefetch**, persistence adapters (KahaDB/AMQ for Classic; Artemis journal)
- **Scale consumers horizontally**; avoid hot destinations
- **Test broker restart and failover**
- **Understand Classic vs Artemis operational differences** (they are different brokers)
- Document **operational limits clearly**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Performance & Operations** section of [SKILL.md](../SKILL.md).
