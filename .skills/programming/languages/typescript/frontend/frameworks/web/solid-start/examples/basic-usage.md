# SolidStart Best Practices: Basic Usage

Best practices for building full-stack applications with SolidStart (Solid.js meta-framework). Use when creating, structuring, or reviewing SolidStart applications — covers routing, data fetching, server-side rendering, and performance.

## Scenario

Use this example as a starting point when applying **solid-start-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Components** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```typescript
import { createSignal } from 'solid-js'

function Counter() {
  const [count, setCount] = createSignal(0)

  return (
    <button onClick={() => setCount(count() + 1)}>
      Count: {count()}
    </button>
  )
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
