# CockroachDB Best Practices: Workflow Checklist

A practical run sheet for applying [CockroachDB Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: **Distributed transactions by default** — serializable isolation is the norm
- [ ] 1. Core Stack & Constraints: **Expect higher latency than single-node databases**; avoid chatty transaction patterns
- [ ] 2. Data Modeling & Architecture: **Avoid monotonically increasing primary keys**; prefer UUIDs / well-distributed keys
- [ ] 2. Data Modeling & Architecture: Design schemas to **reduce contention**
- [ ] 3. Integrity & Consistency: **Serializable isolation is the default—embrace it**, don't downgrade casually
- [ ] 3. Integrity & Consistency: **Expect transaction retries under contention** (40001 SQLSTATE — retry with max_retry backoff)
- [ ] 4. Reliability & Performance: **Optimize queries to minimize node fan-out**
- [ ] 4. Reliability & Performance: **Batch writes inside transactions**; avoid long-running transactions
- [ ] 5. General Rules of Thumb: **It is a distributed database first** — latency, retries, and contention are first-class
- [ ] 5. General Rules of Thumb: **Keys and schemas shape distribution** — hotspots and write amplification are design failures

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
