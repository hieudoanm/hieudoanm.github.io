# Argparse Best Practices

argparse is Python's standard-library CLI parser — **ArgumentParser, add_argument declarations, and a Namespace of parsed values**. Practical argparse leans on **prog-and-description self-documenting help, dest-aware names, type-callables for parsing, and add_subparsers for command trees**. Parse once at the main boundary; keep the parsing layer thin and the domain logic parseable by tests.

## When to use

Use when writing, structuring, or reviewing argparse-based tools.

## Core topics

- 1. Parser Layout
- 2. Arguments & Types
- 3. Subcommands
- 4. Help & UX
- 5. Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Argparse Best Practices: Basic Usage](./examples/basic-usage.md)
- [Argparse Best Practices: 1. Parser Layout](./examples/reliability-and-edge-cases.md)
- [Argparse Best Practices: 2. Arguments & Types](./examples/setup-and-configuration.md)
- [Argparse Best Practices: 5. Testing](./examples/testing-and-validation.md)

## Assets

- [Argparse Best Practices: Decision Record](./assets/decision-record.md)
- [Argparse Best Practices: Starter Template](./assets/starter-template.md)
- [Argparse Best Practices: Validation Plan](./assets/validation-plan.md)
- [Argparse Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
