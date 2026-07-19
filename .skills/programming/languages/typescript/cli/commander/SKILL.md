---
name: "commander-cli-design"
description: "Best practices for building well-designed command-line tools with Commander.js (Node/Auth). Use when creating, structuring, or reviewing a Commander CLI app — covers command structure, arguments, options, help, output, errors, and testing with suggested values."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "cli"
  - "commander"
  - "design"
when_to_use: "Use when creating, structuring, or reviewing a Commander CLI app."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../oclif/SKILL.md"
  - "../yargs/SKILL.md"
  - "../../SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Commander.js CLI Design Best Practices

Commander.js is the classic imperative Node.js CLI framework: you describe commands, options, and action handlers programmatically, and it produces consistent help/usage and exit behaviour for free. Good CLI design with Commander is mostly _conventions_ — command trees, stdout/stderr discipline, exit codes, and actionable errors — plus fitting your workflow into program.command(...)/.option(...)/.action(...) instead of fighting the framework.

## When to use

Use when creating, structuring, or reviewing a Commander CLI app.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Consistency beats cleverness** — match git/kubectl/docker conventions; users transfer muscle memory across CLIs
- **Positional for the subject, flags for options** — never require a flag where a positional is natural, and vice versa
- **Idempotent by default where possible** — re-running a command shouldn't error just because the desired state already exists
- **Structured --output json everywhere** — the fastest way to make a CLI scriptable is deterministic machine-readable output
- [ ] Consistent noun-verb/verb-noun tree; shallow nesting
- [ ] Every command has a one-line .description() and help example text
- [ ] kebab-case long options; shorthands reserved for frequent flags
- [ ] --output/-o supporting at least table and json

## Focus areas

- 1. Core Stack
- 2. Command Structure
- 3. Arguments
- 4. Options (Flags)
- 5. Help Text
- 6. Output Conventions
- 7. Errors & Exit Codes
- 8. Progress & Feedback
- 9. Shell Completion & Docs
- 10. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
