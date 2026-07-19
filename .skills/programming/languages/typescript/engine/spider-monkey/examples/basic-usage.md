# SpiderMonkey Best Practices: Basic Usage

Best practices for running JavaScript on SpiderMonkey — the Firefox/Mozilla JavaScript engine conventions. Use when writing, structuring, or reviewing code that targets SM — covers JIT tiers, Ion/optimizations, stability, memory, and diagnostics.

## Scenario

Use this example as a starting point when applying **spider-monkey-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Hidden Classes & Shapes** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
function Point(x, y) { this.x = x; this.y = y; }
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
