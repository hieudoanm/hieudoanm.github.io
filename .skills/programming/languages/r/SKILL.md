---
name: "r-best-practices"
description: "Best practices for writing R — the language conventions for data analysis, statistics, and reproducible research. Use when writing, structuring, or reviewing R — covers tidy data, tibbles, functional pipelines, functions, error handling, plotting, testing, and reproducibility."
tags:
  - "programming"
  - "language"
  - "r"
when_to_use: "Use when writing, structuring, or reviewing R."
prerequisites:
  - "Basic familiarity with R and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../matlab/SKILL.md"
  - "../bash/SKILL.md"
  - "../ruby/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# R Best Practices

R is a functional, vectorized language for data analysis — the idiom is **tibbles, tidy verbs, and functional pipelines, not mutable loops**. Practical R leans on **tidy data (one row per observation), a dplyr/tidyr pipeline expressed as verbs, explicit functions for reused analysis** and **tests + reproducibility (testthat, renv, quarto) so a result isn't a one-off hallucination**. Vectorization is the performance law; for loops are the last resort.

## When to use

Use when writing, structuring, or reviewing R.

## Prerequisites

- Basic familiarity with R and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Tidy data first; the pipeline is the sentence.**
- **Vectorize; loops are the exception, profiled, and justified.**
- **Reused analysis becomes a tested function.**
- **NA is data — be explicit about who carries it.**
- **Every figure says something (labs) and every number a test can re-derive.**
- **renv + pinned R + testthat + lintr = reproducible "done".**
- [ ] tibbles with typed columns; tidy data (one row per observation)
- [ ] dplyr verbs + |> pipeline; across()/purrr::map* over loops

## Focus areas

- 1. Tidy Data & Tibbles
- 2. Functionality in Pipelines
- 3. Functions & Reuse
- 4. Vectorization & Performance
- 5. Errors & Missing Values
- 6. Plotting & Communication
- 7. Testing & Verification
- 8. Reproducibility
- 9. Style & Tooling

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
