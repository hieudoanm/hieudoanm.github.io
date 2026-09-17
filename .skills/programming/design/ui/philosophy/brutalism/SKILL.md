---
name: "brutalism"
description: "Apply brutalist principles to web/app UI — raw structure, visible mechanics, no polish, and precision so it reads as intentional rather than broken. Covers when refusal-of-finish is the honest choice, the honest-state rule, and the accessibility floor that raw aesthetics do not override. Use when building dev tools, dashboards, status pages, terminals, prototypes, or when a surface is unfinished and polish would misrepresent it."
tags:
  - "programming"
  - "design"
  - "design-philosophy"
  - "brutalism"
when_to_use: "Use when building dev tools, dashboards, status pages, terminals, prototypes, or when a surface is unfinished and polish would misrepresent it."
prerequisites:
  - "A clear product or design goal."
  - "Familiarity with the target audience and existing interface constraints."
related_skills:
  - "../maximalism/SKILL.md"
  - "../flat/SKILL.md"
  - "../minimalism/SKILL.md"
avoid_when:
  - "When the brief does not call for this design system or philosophy; follow the project’s existing design language instead."
status: "active"
---

# Brutalism

Four philosophies in this directory form one map. Minimalism and maximalism vary **how much** is present; flat and brutalism vary **how finished** it looks.

Brutalism is the refusal of finish. Where minimalism says _remove until the structure is clear_, brutalism says **show the structure and stop there** — no rounding, no gradients, no shadows, no smoothing, no borrowed convention.

## When to use

Use when building dev tools, dashboards, status pages, terminals, prototypes, or when a surface is unfinished and polish would misrepresent it.

## Prerequisites

- A clear product or design goal.
- Familiarity with the target audience and existing interface constraints.

## Scope boundary

- When the brief does not call for this design system or philosophy; follow the project’s existing design language instead.

## Essential checks

- **Expose the document** — the page is a document; let it read like one. Show
- the grid, the rules, the raw values
- **Structure is the ornament** — a visible border is decoration. Box-drawing is
- decoration. Reusing a system is decoration
- **Precision is what makes it intentional** — sloppy raw UI is indistinguishable
- from broken UI. Every hard edge must be _decided_
- **Information over impression** — show the data, the error, the empty state, the
- loading state. Honest states are the whole aesthetic

## Focus areas

- 1. Core Principles
- 2. Typography
- 3. Surfaces and Structure
- 4. Interaction
- 5. Honest States
- 6. When Brutalism Is the Honest Choice
- 7. When It Is the Wrong Choice
- 8. The Floor
- 9. Execution Rules

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
