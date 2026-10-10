---
name: "solution-architecture"
description: "Translate business outcomes, constraints, and quality needs into a coherent, implementable solution architecture with explicit trade-offs and validation."
tags:
  - "programming"
  - "design"
  - "solution-architecture"
when_to_use: "Use when designing a new system or a material cross-component change, evaluating architectural options, or producing an architecture handoff."
prerequisites:
  - "A problem statement, stakeholders, known constraints, and a way to resolve unknowns."
  - "Access to the current system, team capabilities, operational context, and relevant policies."
related_skills:
  - "../architecture-decision-records/SKILL.md"
  - "../quality-attribute-analysis/SKILL.md"
  - "../system-context-and-boundaries/SKILL.md"
avoid_when:
  - "When implementing a small local change that fits existing architecture; follow the existing design and coding skills."
  - "When key business or regulatory constraints are unknown; record assumptions and resolve them before committing to a design."
status: "active"
---

# Solution Architecture

## Purpose

Design the smallest coherent system that satisfies functional needs, quality attributes, and operational constraints. Architecture is a set of consequential decisions and boundaries—not a diagram, technology list, or target-state aspiration.

## Workflow

1. **Frame the problem:** outcomes, users, scope, non-goals, constraints, assumptions, and decision owners.
2. **Understand current state:** components, dependencies, data flows, deployment, ownership, incidents, and existing standards.
3. **Make quality needs measurable:** use [quality-attribute-analysis](../quality-attribute-analysis/SKILL.md) for scenarios, targets, and verification.
4. **Model boundaries:** identify actors, systems, trust zones, data ownership, and responsibilities with [system-context-and-boundaries](../system-context-and-boundaries/SKILL.md).
5. **Compare options:** include a credible baseline and alternatives; assess fit, complexity, risk, cost, migration, and exit path.
6. **Detail key contracts:** APIs, events, data, failure semantics, and ownership using [integration-architecture](../integration-architecture/SKILL.md).
7. **Record decisions:** capture material, hard-to-reverse choices with [architecture-decision-records](../architecture-decision-records/SKILL.md).
8. **Validate incrementally:** prototype risky assumptions, review operational readiness, and define migration and rollback steps.

## Architecture deliverable

Tailor detail to the decision. Include context and scope, requirements and measurable qualities, current and proposed views, key flows and contracts, options and trade-offs, risks and assumptions, deployment/operations, migration, and validation. Link diagrams to written decisions; do not rely on diagrams alone.

## Decision principles

- Prefer existing platform capabilities and team familiarity when they satisfy the need.
- Separate confirmed constraints from assumptions; assign owners and resolution dates.
- Optimize for the whole lifecycle: build, operate, secure, evolve, and retire.
- Keep boundaries and abstractions proportional to independent change, ownership, or scaling needs.
- Treat security, privacy, accessibility, resilience, and cost as design inputs, not final checkboxes.
- State consequences and failure modes; do not hide complexity in a vendor or platform choice.

## Validation

Use prototypes, threat analysis, capacity estimates, contract tests, operational exercises, or stakeholder review to test uncertain design claims. A design is not validated merely because it is documented or approved.

## Completion checks

- Outcomes, scope, constraints, assumptions, and quality targets are explicit.
- The design fits the current system and identifies ownership and dependencies.
- Options and significant trade-offs are documented.
- Data, integration, security, and failure paths are addressed.
- Delivery, migration, observability, and rollback are feasible.
- Risky assumptions have owners and validation steps.

## Further detail

- [Architecture workflow](references/architecture-workflow.md)
- [Option analysis](references/option-analysis.md)
- [Architecture views](references/architecture-views.md)
- [Validation and evolution](references/validation-and-evolution.md)
