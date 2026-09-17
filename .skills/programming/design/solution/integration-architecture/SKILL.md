---
name: "integration-architecture"
description: "Design reliable, secure, evolvable contracts and communication patterns across services, platforms, and external systems."
tags:
  - "programming"
  - "design"
  - "integration"
  - "architecture"
when_to_use: "Use when designing or reviewing APIs, events, data exchange, workflow orchestration, or third-party integrations."
prerequisites:
  - "Known producers, consumers, use cases, data ownership, and quality requirements."
  - "Access to existing protocols, platform standards, and integration owners."
related_skills:
  - "../solution-architecture/SKILL.md"
  - "../system-context-and-boundaries/SKILL.md"
  - "../quality-attribute-analysis/SKILL.md"
avoid_when:
  - "When designing an internal function or module call with no independent contract boundary."
  - "When the source of truth and data ownership are unresolved; settle authority before choosing synchronization mechanics."
status: "active"
---

# Integration Architecture

## Purpose

Design communication contracts that preserve clear ownership and behave predictably under change, delay, duplication, partial failure, and security constraints.

## Workflow

1. Identify use cases, producers, consumers, owners, data sensitivity, and source of truth.
2. Define interaction needs: response timing, consistency, throughput, ordering, and availability.
3. Choose synchronous request/response, asynchronous messaging, batch exchange, or a justified combination.
4. Specify contract semantics, versioning, identity, authorization, validation, and error behavior.
5. Design timeouts, retries, idempotency, deduplication, backpressure, and recovery.
6. Define observability, ownership, compatibility testing, rollout, and deprecation.
7. Validate with consumer scenarios and failure tests.

## Pattern choice

Use synchronous integration when a caller needs an immediate result and coupling in availability and latency is acceptable. Use asynchronous integration when work may proceed later or decoupling is valuable and the system can handle eventual consistency and message operations. Batch exchange may fit high-volume or periodic workflows. Do not choose events merely to reduce direct dependencies.

## Contract principles

- Define meaning, not only schema: units, identifiers, state transitions, and error semantics.
- Assign one authority for each fact and a clear owner for each contract.
- Make retries safe through idempotency and explicit duplicate behavior.
- Plan additive evolution, consumer compatibility, and deprecation windows.
- Protect sensitive data and authenticate/authorize every boundary.
- Instrument correlation and outcomes without leaking secrets or personal data.

## Failure behavior

Set deadlines and bounded retries; avoid retry storms and unbounded queues. Define handling for partial results, duplicate or out-of-order messages, poison messages, provider downtime, and reconciliation. A circuit breaker or dead-letter queue is useful only with explicit recovery ownership and procedures.

## Completion checks

- Interaction pattern matches user and consistency needs.
- Contract semantics, ownership, security, and versioning are explicit.
- Timeout, retry, idempotency, and partial-failure behavior are defined.
- Monitoring, reconciliation, compatibility tests, and rollout are planned.

## Further detail

- [Interaction patterns](references/interaction-patterns.md)
- [Contract evolution](references/contract-evolution.md)
- [Reliability semantics](references/reliability-semantics.md)
- [Security and observability](references/security-and-observability.md)
