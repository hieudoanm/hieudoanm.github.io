# DynamoDB Best Practices: 4. Reliability, Scaling & Performance

## Scenario

A project is working on **4. reliability, scaling & performance** for DynamoDB Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- DynamoDB **scales automatically — but keys still matter**
- Monitor: **consumed capacity, throttling events, hot partitions**
- Choose **capacity mode deliberately** (On-Demand vs Provisioned + autoscaling)
- Use **adaptive capacity correctly** — don't fight it, still avoid hot keys
- Design for **burst traffic**; use **DAX only when justified**
- Plan **TTL behavior** and background deletes
- **Test access patterns with production-like volume**; explain cost trade-offs clearly

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Reliability, Scaling & Performance** section of [SKILL.md](../SKILL.md).
