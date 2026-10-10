# PowerShell Best Practices

PowerShell is an object-pipeline language — cmdlets emit objects, and | passes them without text-parsing liability. Practical PowerShell leans on **cmdlets and named parameters over aliases and positional magic, -ErrorAction/try-catch as the explicit error contract**, and **Set-StrictMode/PSScriptAnalyzer to rescue the interpreter's silence**. The pipeline is the product: filter left, format right, keep types flowing.

## When to use

Use when writing, structuring, or reviewing PowerShell.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [PowerShell Best Practices: Basic Usage](./examples/basic-usage.md)
- [PowerShell Best Practices: 5. Error Handling](./examples/reliability-and-edge-cases.md)
- [PowerShell Best Practices: 2. Cmdlets over Aliases, Verbs over Shortcuts](./examples/setup-and-configuration.md)
- [PowerShell Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [PowerShell Best Practices: Decision Record](./assets/decision-record.md)
- [PowerShell Best Practices: Starter Template](./assets/starter-template.md)
- [PowerShell Best Practices: Validation Plan](./assets/validation-plan.md)
- [PowerShell Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
