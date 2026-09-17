---
name: 'quality-attribute-analysis'
description: 'Turn non-functional requirements into measurable scenarios, design choices, and verification plans for reliability, performance, security, and operability.'
tags:
  - 'programming'
  - 'design'
  - 'quality-attributes'
when_to_use: 'Use when architecture depends on qualities such as availability, latency, scalability, security, privacy, usability, maintainability, or cost.'
prerequisites:
  - 'Stakeholders, key workflows, expected workload, operating context, and known constraints.'
related_skills:
  - '../solution-architecture/SKILL.md'
  - '../architecture-decision-records/SKILL.md'
  - '../system-context-and-boundaries/SKILL.md'
avoid_when:
  - 'When a request is a vague aspiration with no stakeholder or operating context; first clarify what success means.'
  - 'When a detailed discipline-specific threat model or capacity test is required; involve the relevant specialist.'
status: 'active'
---

# Quality-Attribute Analysis

## Purpose

Make architecture-shaping quality needs concrete enough to compare designs and verify the delivered system. “Fast,” “secure,” and “scalable” are not requirements until their context, response, and success measure are defined.

## Scenario format

For each important quality, record:

1. **Source:** user, operator, dependency, attacker, or regulator.
2. **Stimulus:** event or condition.
3. **Context:** normal, peak, degraded, deployment, or recovery.
4. **Response:** observable system behavior.
5. **Measure:** threshold, percentile, proportion, time, or test outcome.

Example: “At expected peak load, 95% of search requests complete within the agreed latency target while error rate remains below the service objective.”

## Workflow

1. Identify critical user journeys, business risks, operational constraints, and obligations.
2. Elicit scenarios and rank them by impact and likelihood.
3. Clarify workload, failure assumptions, environment, and measurement method.
4. Map each scenario to architectural tactics and their costs or interactions.
5. Define verification: test, monitoring, review, exercise, or operational evidence.
6. Revisit trade-offs when scenarios conflict; obtain decision-owner agreement.

## Common attributes

Consider availability and recoverability, latency and throughput, capacity, security and privacy, resilience, accessibility, modifiability, observability, deployability, compatibility, and cost. Select only qualities material to the system; do not create an unprioritized checklist.

## Trade-offs

Quality attributes interact. Caching may improve latency but complicate consistency and privacy; redundancy may improve availability but increase cost and failure modes. Record the target, tactic, side effects, and verification evidence rather than claiming a universal best practice.

## Completion checks

- Priority scenarios have sources, context, response, and measurable outcomes.
- Workload and failure assumptions are stated.
- Each major scenario maps to a design and verification plan.
- Conflicting qualities and accepted residual risks are documented.

## Further detail

- [Scenario construction](references/scenario-construction.md)
- [Reliability and recovery](references/reliability-and-recovery.md)
- [Performance and capacity](references/performance-and-capacity.md)
- [Security and operability](references/security-and-operability.md)
