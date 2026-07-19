# Click Best Practices

Click builds CLIs from **decorators** (@click.group, @click.command, @click.option) that wrap functions — the function signature becomes the CLI contract. Practical Click leans on **small command functions with typed options/arguments, @click.group command clusters, @click.option with type= and required/multiple**, and **ctx (context) only for shared/stateful wiring**. Click's grouping and ClickException flow keep the...

## When to use

Use when writing, structuring, or reviewing Click tools.

## Core topics

- 1. Commands & Groups
- 2. Options & Arguments
- 3. Types & Conversion
- 4. Context & Shared State
- 5. Output & UX
- 6. Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Click Best Practices: Basic Usage](./examples/basic-usage.md)
- [Click Best Practices: 2. Options & Arguments](./examples/reliability-and-edge-cases.md)
- [Click Best Practices: 5. Output & UX](./examples/setup-and-configuration.md)
- [Click Best Practices: 6. Testing](./examples/testing-and-validation.md)

## Assets

- [Click Best Practices: Decision Record](./assets/decision-record.md)
- [Click Best Practices: Starter Template](./assets/starter-template.md)
- [Click Best Practices: Validation Plan](./assets/validation-plan.md)
- [Click Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
