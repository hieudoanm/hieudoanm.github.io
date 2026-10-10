# MariaDB Best Practices: 4. Reliability, Performance & Operations

## Scenario

A project is working on **4. reliability, performance & operations** for MariaDB Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- Use **`EXPLAIN`** and engine-specific diagnostics
- Monitor **slow queries and lock waits**
- **Validate indexes after schema changes**
- Avoid long-running transactions
- Understand **Galera/replica behavior** (certification, lag, failover)
- Plan for **failover and recovery**; test with production-scale data
- Document **engine and configuration choices**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Reliability, Performance & Operations** section of [SKILL.md](../SKILL.md).
