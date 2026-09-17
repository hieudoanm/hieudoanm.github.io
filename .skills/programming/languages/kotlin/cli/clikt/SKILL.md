---
name: "clikt-best-practices"
description: "Best practices for building command-line interfaces in Kotlin with Clikt. Use when writing, structuring, validating, or testing a Clikt CLI — covers Gradle setup, command hierarchies, options/flags/arguments, typed conversion, validation and exit codes, mutually exclusive and grouped options, prompting, testable command construction, help output, and testing, with suggested values."
tags:
  - "programming"
  - "language"
  - "kotlin"
  - "cli"
  - "clikt"
when_to_use: "Use when writing, structuring, validating, or testing a Clikt CLI."
prerequisites:
  - "Basic familiarity with Kotlin and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../mordant/SKILL.md"
  - "../../SKILL.md"
  - "../../ui/compose/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Clikt Best Practices

Clikt turns a command-line interface into a tree of Kotlin classes: each command is a CliktCommand subclass that declares its own parameters and does its work in run(). Best practice here is **one class per command, parameters as delegated properties, parsing separated from side effects, and errors as typed values** — so the same command object can be constructed in a test with a fake side-effect sink and asserted without touching the filesystem or the network.

This document is written against **Kotlin 2.4+ / Clikt 5.1+** and includes concrete values you can drop straight into code.

## When to use

Use when writing, structuring, validating, or testing a Clikt CLI.

## Prerequisites

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- One CliktCommand subclass per command; name the class after the command
- NoOpCliktCommand for anything that only groups subcommands
- Every parameter gets help =; every option gets a long name, and a short one when unambiguous
- Convert with parameters.types, default last, validate with validate { }
- UsageError for anything the user can fix; ProgramResult(n) for a meaningful exit code
- Model option conflicts in the parse mutuallyExclusiveOptions (same-typed options) or a UsageError rather than in run()
- Inject side effects as constructor parameters with real defaults; that is what makes commands testable
- echo for output, never println

## Focus areas

- 1. Core Stack & Gradle Setup
- 2. Command Hierarchies
- 3. Options, Flags & Arguments
- 4. Validation & Error Handling
- 5. Mutually Exclusive & Grouped Options
- 6. Prompting
- 7. Testable Command Construction
- 8. Help Formatting
- 9. Testing
- 10. Common Pitfalls

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
