---
name: "matlab-best-practices"
description: "Best practices for writing MATLAB — the language conventions for numerical computing, data analysis, and prototyping. Use when writing, structuring, or reviewing MATLAB — covers vectorization, arrays, functions, types, error handling, plotting, performance, and tooling."
tags:
  - "programming"
  - "language"
  - "matlab"
when_to_use: "Use when writing, structuring, or reviewing MATLAB."
prerequisites:
  - "Basic familiarity with Matlab and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../r/SKILL.md"
  - "../bash/SKILL.md"
  - "../php/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# MATLAB Best Practices

MATLAB is a language built around **arrays and linear-algebra primitives** — the whole point is to let the environment do heavy numeric work with few, clear operations. Practical MATLAB leans on **vectorized, preallocated arrays over growing loops, functions with explicit inputs/outputs over scripts with shared workspaces**, and **unit-testable, documented code (function files + checkcode + the test framework)**. Scripts are for exploration; functions are for product.

## When to use

Use when writing, structuring, or reviewing MATLAB.

## Prerequisites

- Basic familiarity with Matlab and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Think in arrays:** vectorize, preallocate, broadcast — loops are the last resort
- **Functions are the product; scripts are the scratchpad.**
- **Every input validated; every error carries an identifier and message.**
- **Shape is the contract:** row/column, size intent, categorical vs numeric spelled out
- **Every plot labeled; every concluding number in a test with a tolerance.**
- **checkcode + unit tests are part of "done".**
- [ ] Vectorized + implicit expansion over element loops; preallocated arrays
- [ ] Function files with explicit [outs] = f(ins); no shared-workspace borrowing

## Focus areas

- 1. Arrays & Data Shape
- 2. Vectorization over Loops
- 3. Preallocation & Memory
- 4. Functions & Modularity
- 5. Types & Structuring
- 6. Error Handling
- 7. Plotting & Visualization
- 8. Performance & Profiling
- 9. Testing & Verification

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
