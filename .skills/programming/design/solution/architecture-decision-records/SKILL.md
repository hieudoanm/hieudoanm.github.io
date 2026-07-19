---
name: 'architecture-decision-records'
description: 'Capture consequential architecture decisions, alternatives, rationale, status, and consequences in concise, reviewable records.'
tags:
  - 'programming'
  - 'design'
  - 'architecture'
  - 'decision-record'
when_to_use: 'Use when making, revisiting, or communicating an architectural choice with meaningful long-term consequences or trade-offs.'
prerequisites:
  - 'A decision question, context, constraints, stakeholders, and known alternatives.'
related_skills:
  - '../solution-architecture/SKILL.md'
  - '../quality-attribute-analysis/SKILL.md'
  - '../integration-architecture/SKILL.md'
avoid_when:
  - 'When documenting routine implementation details that are easy to reverse and need no shared decision.'
  - 'When the decision is unresolved; record an open question or investigation instead of presenting it as accepted.'
status: 'active'
---

# Architecture Decision Records

## Purpose

Preserve why an architectural choice was made, what alternatives were considered, and what consequences follow. A decision record supports future change; it is not an approval form or substitute for a clear design.

## Workflow

1. State one decision question and why it matters now.
2. Record context: goals, constraints, assumptions, current state, and quality needs.
3. Identify realistic alternatives, including retaining the current approach.
4. Compare evidence, trade-offs, risks, reversibility, and operational impact.
5. State the chosen decision and rationale, or record that it remains open.
6. Document consequences, follow-up actions, owners, and review triggers.
7. Link related records; supersede rather than silently rewrite historical decisions.

## Good records

Keep one record focused on one decision. Use enough context for a reader unfamiliar with the meeting to understand the choice. Separate facts from assumptions and evidence from preference. Record dissent or unresolved risk when it matters.

Statuses should be explicit, such as proposed, accepted, rejected, deprecated, or superseded. Date decisions and identify accountable roles. Do not include secrets or sensitive details in broadly accessible records.

## Lifecycle

Revisit when constraints, evidence, quality targets, ownership, or costs change. If a decision is reversed, create a follow-up record explaining why and link the prior record. Do not edit history to make the current choice appear inevitable.

## Completion checks

- Decision and scope are specific.
- Alternatives and rationale are intelligible and evidence-aware.
- Consequences, risks, owners, and review triggers are captured.
- Status and links to related design artifacts are current.

## Further detail

- [Record structure](references/record-structure.md)
- [Option evaluation](references/option-evaluation.md)
- [Status and lifecycle](references/status-and-lifecycle.md)
- [Decision quality](references/decision-quality.md)
