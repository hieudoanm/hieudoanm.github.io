# JavaScriptCore Best Practices: Basic Usage

Best practices for running JavaScript on JavaScriptCore — the WebKit/Apple JS engine conventions. Use when writing, structuring, or reviewing code that targets JSC — covers compiler tiers, FTL/baseline, JIT behavior, memory, and diagnosis.

## Scenario

Use this example as a starting point when applying **javascript-core-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **6. Multi-Isolate & Workers** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
const sab = new SharedArrayBuffer(1024);
const a = new Int32Array(sab);
Atomics.add(a, 0, 1);
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
