# ActiveMQ Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for ActiveMQ Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Queue vs Topic chosen explicitly per use case; durable subs where needed
- [ ] Destination names stable; retry destinations separated from primary
- [ ] Acknowledgment modes deliberate (`CLIENT_ACKNOWLEDGE` for critical flows)
- [ ] Transactions for atomic multiple-send/receive; rollback handled
- [ ] Redelivery policies configured; poison messages routed to DLQ
- [ ] Message payloads versioned; schema treated as contract
- [ ] Queue depth, lag, disk monitored; prefetch/persistence tuned

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
