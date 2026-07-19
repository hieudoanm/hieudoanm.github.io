---
name: "powershell-best-practices"
description: "Best practices for writing PowerShell — the conventions for Windows and cross-platform scripting, DSC, and CI automation. Use when writing, structuring, or reviewing PowerShell — covers script safety, cmdlets over aliases, quoting, functions, error handling, the pipeline, and linting."
tags:
  - "programming"
  - "language"
  - "power"
  - "shell"
  - "powershell"
when_to_use: "Use when writing, structuring, or reviewing PowerShell."
prerequisites:
  - "Basic familiarity with Power-shell and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../bash/SKILL.md"
  - "../csharp/SKILL.md"
  - "../matlab/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# PowerShell Best Practices

PowerShell is an object-pipeline language — cmdlets emit objects, and | passes them without text-parsing liability. Practical PowerShell leans on **cmdlets and named parameters over aliases and positional magic, -ErrorAction/try-catch as the explicit error contract**, and **Set-StrictMode/PSScriptAnalyzer to rescue the interpreter's silence**. The pipeline is the product: filter left, format right, keep types flowing.

## When to use

Use when writing, structuring, or reviewing PowerShell.

## Prerequisites

- Basic familiarity with Power-shell and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Objects flow through the pipeline; text is the last resort.**
- **Full cmdlet names, approved verbs, typed parameters — the contract is the name.**
- **try/catch + -ErrorAction Stop as the explicit error path; never swallow.**
- **Set-StrictMode + $ErrorActionPreference='Stop' on every script.**
- **Functions mutate only with -WhatIf/-Confirm.**
- **PSScriptAnalyzer + Pester are part of "done".**
- [ ] Set-StrictMode -Version Latest + $ErrorActionPreference = 'Stop' up top
- [ ] Full cmdlet/named-parameter calls; approved verbs; no aliases

## Focus areas

- 1. Script Safety
- 2. Cmdlets over Aliases, Verbs over Shortcuts
- 3. Quoting & Expansion
- 4. Functions & Advanced Functions
- 5. Error Handling
- 6. Pipeline & Input
- 7. Conventions & Style
- 8. Security
- 9. Tooling & CI

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
