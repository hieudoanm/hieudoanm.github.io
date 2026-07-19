# JavaScript Best Practices: Basic Usage

Best practices for writing JavaScript (as distinct from TypeScript) — the plain-JS conventions for scripts, tooling, and running code. Use when writing, structuring, or reviewing JavaScript — covers types, modules, async, errors, DOM, and project conventions.

## Scenario

Use this example as a starting point when applying **javascript-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Modules & Strictness** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
// logger.js
export function log(msg) { console.log(new Date().toISOString(), msg); }

// main.js
import { log } from "./logger.js";
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
