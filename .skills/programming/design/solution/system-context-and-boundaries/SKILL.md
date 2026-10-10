---
name: "system-context-and-boundaries"
description: "Define system scope, actors, external dependencies, responsibilities, ownership, trust zones, and domain boundaries before detailed design."
tags:
  - "programming"
  - "design"
  - "system-context"
  - "boundaries"
when_to_use: "Use when scoping a new system, decomposing a monolith, clarifying service or team ownership, or mapping dependencies and trust boundaries."
prerequisites:
  - "A business capability, user journey, or change request and access to relevant stakeholders or existing-system evidence."
related_skills:
  - "../solution-architecture/SKILL.md"
  - "../integration-architecture/SKILL.md"
  - "../quality-attribute-analysis/SKILL.md"
avoid_when:
  - "When only a local class/module structure is needed; use implementation-level design patterns."
  - "When boundaries are being drawn solely to maximize service count or technology diversity."
status: "active"
---

# System Context and Boundaries

## Purpose

Make system scope, responsibilities, and dependencies explicit so teams can reason about ownership, change, security, and integration. A boundary should reflect meaningful responsibility or change—not simply a box in a diagram.

## Workflow

1. State the system's purpose, users, outcomes, and scope.
2. Identify people, external systems, data sources, and organizational roles.
3. Map interactions and important information exchanged.
4. Identify trust zones, sensitive data, and authority boundaries.
5. Allocate responsibilities and data ownership; expose overlaps and gaps.
6. Decompose only where independent change, ownership, policy, scaling, or failure isolation justifies it.
7. Validate the model with domain, security, and operational stakeholders.

## Boundary tests

For each proposed component or service, ask:

- Does it own a cohesive business capability or policy?
- Can a team change and operate it with a clear responsibility?
- Is its data authority explicit?
- Is the interface stable enough to justify independent deployment?
- What new network, consistency, security, and operational costs appear?

If answers are unclear, retain a simpler boundary until evidence supports separation. Use [integration-architecture](../integration-architecture/SKILL.md) to define contracts across accepted boundaries.

## Context and container views

Show users and external systems in a context view; show deployable units, responsibilities, and relationships in a container view. Label system scope, ownership, data flows, trust zones, and uncertainty. Diagrams are explanatory views and do not replace written contracts or threat analysis.

## Completion checks

- System purpose, scope, users, and external actors are explicit.
- Responsibilities and data authority have named owners.
- Trust boundaries and sensitive flows are visible.
- Decomposition has a rationale and its operational cost is acknowledged.
- Stakeholders validate disputed or assumed boundaries.

## Further detail

- [Context modeling](references/context-modeling.md)
- [Responsibility and domain boundaries](references/responsibility-and-domain-boundaries.md)
- [Data ownership](references/data-ownership.md)
- [Trust boundaries](references/trust-boundaries.md)
