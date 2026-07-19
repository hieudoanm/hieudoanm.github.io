---
name: "yargs-cli-design"
description: "Best practices for building well-designed command-line tools with Yargs (Node.js). Use when creating, structuring, or reviewing a Yargs CLI app — covers command modules, strict parsing, options, validation, help, output, completion, and testing."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "cli"
  - "yargs"
  - "design"
when_to_use: "Use when creating, structuring, or reviewing a Yargs CLI app."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../commander/SKILL.md"
  - "../oclif/SKILL.md"
  - "../../SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Yargs CLI Design Best Practices

Yargs is the configuration-driven Node.js CLI framework: you declare commands, options, and validation rules as data, and it produces help, strict parsing, and completion from those declarations. Because Yargs is declarative, the main risks are letting its permissive defaults through — unflagged args, loose coercion, unvalidated input — so best practice starts with .strict() and the discipline of describing every option's shape up front.

## When to use

Use when creating, structuring, or reviewing a Yargs CLI app.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Declare it, don't check it** — every option, choice, positional, and default lives in the declaration so help and validation agree
- **Strict by default, deny by default** — unknown flags fail loudly; add affordances explicitly, not by accident
- **Idempotent commands where possible** — re-running shouldn't fail because the goal state already exists
- **argv types are the contract** — keep command signatures derived from builders and stable across versions
- [ ] .strict(), .demandCommand(1), .recommendCommands() in place
- [ ] Commands as modules (command/describe/builder/handler) colocated with options
- [ ] Every option type/choices/default/alias declared; kebab-case longs
- [ ] Positionals typed via .positional()

## Focus areas

- 1. Core Stack
- 2. Command Structure
- 3. Strict Parsing (Non-negotiable)
- 4. Options & Positionals
- 5. Validation
- 6. Help & Usage
- 7. Output Conventions
- 8. Shell Completion
- 9. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
