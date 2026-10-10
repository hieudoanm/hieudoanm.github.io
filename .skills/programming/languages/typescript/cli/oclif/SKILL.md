---
name: "oclif-cli-design"
description: "Best practices for building well-designed command-line tools with oclif (Node.js plugin-based CLI framework). Use when creating, structuring, or reviewing an oclif CLI app — covers the Command class, args/flags, topics, help, plugins, output, errors, and testing."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "cli"
  - "oclif"
  - "design"
when_to_use: "Use when creating, structuring, or reviewing an oclif CLI app."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../commander/SKILL.md"
  - "../yargs/SKILL.md"
  - "../../SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# oclif CLI Design Best Practices

oclif (Salesforce's CLI framework) builds CLIs from **classes** with declarative args/flags, a plugin system, and framework-provided help and tab-completion. It shines for large, extensible CLIs where commands ship in plugins and every command is a Command subclass with typed flags/args. Best practice is about colocating those declarations, keeping run() thin, and following oclif's conventions for help, errors, and plugin boundaries.

## When to use

Use when creating, structuring, or reviewing an oclif CLI app.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Declare loudly, run thin** — the class's description/args/flags are the docs, help, validation, and completion; run() just orchestrates
- **Consistency beats cleverness** — match the conventions users already know from git/docker/Heroku CLIs
- **No raw console.* in commands; no manual process.exit** — oclif paths own both, and tests assert on them
- **Idempotent where possible**; confirm destructive actions via interactive prompts or --force
- **Plugin boundaries are team boundaries** — what ships together helps together
- [ ] Commands as Command subclasses, one per file, nested → topics
- [ ] description, summary, examples on every command
- [ ] Args/flags declared as Args.*/Flags.* with options/default/type

## Focus areas

- 1. Setup & Structure
- 2. The Command Class
- 3. Args & Flags
- 4. Topics & Help
- 5. Output & Feedback
- 6. Errors & Exit Codes
- 7. Plugins & Team Boundaries
- 8. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
