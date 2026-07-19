# Nano Stores Best Practices: Basic Usage

Best practices for state management with Nano Stores — the tiny atomic-store conventions for JavaScript frameworks. Use when writing, structuring, or reviewing Nano Stores — covers atoms/maps/stores, reactivity, derived values, framework bindings, and testing.

## Scenario

Use this example as a starting point when applying **nano-stores-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Stores: atom, map, and signals** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import { atom, map } from "nanostores";

export const count = atom(0);
export const user = map<User>({ name: "", roles: [] });
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
