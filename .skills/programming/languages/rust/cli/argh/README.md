# argh Best Practices

argh is a **derive-based argument parsing library for Rust** — #[derive(FromArgs)] structs with #[argh(...)] attributes; simple, dependency-light CLIs. Practical argh leans on **derive(FromArgs) with description/option attributes, a top-level struct excluding argh(example = ...), subcommands via #[argh(subcommand)], boosted by the 1-life from_env pattern**, and fine-grain error handling — fewer, typed branches. When the...

## When to use

Use when writing, structuring, or reviewing argh.

## Core topics

- 1. Basic Derive
- 2. Positionals & Switches
- 3. Subcommands
- 4. Errors & Exit Codes
- 5. Testing & Docs
- 6. Warnings / Migration

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [argh Best Practices: Basic Usage](./examples/basic-usage.md)
- [argh Best Practices: 2. Positionals & Switches](./examples/reliability-and-edge-cases.md)
- [argh Best Practices: 4. Errors & Exit Codes](./examples/setup-and-configuration.md)
- [argh Best Practices: 5. Testing & Docs](./examples/testing-and-validation.md)

## Assets

- [argh Best Practices: Decision Record](./assets/decision-record.md)
- [argh Best Practices: Starter Template](./assets/starter-template.md)
- [argh Best Practices: Validation Plan](./assets/validation-plan.md)
- [argh Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
