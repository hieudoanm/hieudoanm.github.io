# V8 Best Practices: Basic Usage

Best practices for running JavaScript on the V8 engine — the Chrome/Node/Bun/V8-based JS engine conventions. Use when writing, structuring, or reviewing code that targets V8 — covers optimization tiers, hidden classes, typed-arrays, memory, and profiler-guided tuning.

## Scenario

Use this example as a starting point when applying **v8-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Object Shape & Monomorphism** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
function render(item) {
  return { id: item.id, value: item.value };   // same 2-key shape every call
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
