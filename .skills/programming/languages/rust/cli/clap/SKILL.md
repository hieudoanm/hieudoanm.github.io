---
name: "clap-cli-design"
description: "Best practices for building well-designed command-line tools with clap (Rust). Use when creating, structuring, or reviewing a clap-based CLI app — covers command structure, arguments, help text, output, and error conventions with suggested values."
tags:
  - "programming"
  - "language"
  - "rust"
  - "cli"
  - "clap"
  - "design"
when_to_use: "Use when creating, structuring, or reviewing a clap-based CLI app."
prerequisites:
  - "Basic familiarity with Rust and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../argh/SKILL.md"
  - "../ratatui/SKILL.md"
  - "../../SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# clap.rs CLI Design Best Practices

clap (Command Line Argument Parser) handles parsing, help generation, and validation. Most of it is declarative via the derive API — good CLI design here is mostly about which conventions you encode into that derive structure, not fighting clap's defaults.

## When to use

Use when creating, structuring, or reviewing a clap-based CLI app.

## Prerequisites

- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Consistency beats cleverness** — match conventions from cargo, git, kubectl where applicable; users transfer muscle memory
- **Prefer value_enum over free-string validation** wherever the set of valid values is known ahead of time — better help text and error messages for free
- **Version flag always present** — #[command(version)] on the derive struct pulls from Cargo.toml automatically, don't hardcode it separately
- **Idempotent by default** where possible — re-running shouldn't error just because desired state already exists
- [ ] Consistent noun-verb or verb-noun structure across the whole tree
- [ ] Doc comments on every command/subcommand (become help text)
- [ ] after_help examples added for non-trivial commands
- [ ] Constrained choices use value_enum, not free strings

## Focus areas

- 1. Core Crates
- 2. Command Structure
- 3. Arguments & Flags
- 4. Help Text
- 5. Output Conventions
- 6. Error Handling
- 7. Progress & Feedback
- 8. Shell Completion & Docs

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
