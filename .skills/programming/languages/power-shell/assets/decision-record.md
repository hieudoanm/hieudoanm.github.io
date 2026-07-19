# PowerShell Best Practices: Decision Record

Use this record when applying [PowerShell Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for writing PowerShell — the conventions for Windows and cross-platform scripting, DSC, and CI automation. Use when writing, structuring, or reviewing PowerShell — covers script safety, cmdlets over aliases, quoting, functions, error handling, the pipeline, and linting.

PowerShell is an object-pipeline language — cmdlets emit objects, and | passes them without text-parsing liability. Practical PowerShell leans on **cmdlets and named parameters over aliases and positional magic, -ErrorAction/try-catch as the explicit error contract**, and **Set-StrictMode/PSScriptAnalyzer to rescue the interpreter's silence**. The pipeline is the product: filter left, format right, keep types flowing.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Power-shell and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Script Safety
- [ ] 2. Cmdlets over Aliases, Verbs over Shortcuts
- [ ] 3. Quoting & Expansion
- [ ] 4. Functions & Advanced Functions
- [ ] 5. Error Handling
- [ ] 6. Pipeline & Input
- [ ] 7. Conventions & Style
- [ ] 8. Security

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
