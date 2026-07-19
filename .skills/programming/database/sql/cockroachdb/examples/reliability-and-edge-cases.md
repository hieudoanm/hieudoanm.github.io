# CockroachDB Best Practices: 4. Reliability & Performance

## Scenario

A project is working on **4. reliability & performance** for CockroachDB Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Optimize queries to minimize node fan-out**
- **Batch writes inside transactions**; avoid long-running transactions
- Monitor **contention and retry rates** (`crdb_internal`, metrics)
- **Index carefully to avoid write amplification**
- Load-test with **realistic geography**; measure **tail latency, not just averages**
- Document **SLOs and consistency expectations**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Reliability & Performance** section of [SKILL.md](../SKILL.md).
