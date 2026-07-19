# Jotai Best Practices: Basic Usage

Best practices for state management with Jotai — the primitive-atomic conventions for React state. Use when writing, structuring, or reviewing Jotai — covers atoms, derived atoms, async atoms, persistence, selectors, and testing.

## Scenario

Use this example as a starting point when applying **jotai-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Atoms & Basic Usage** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
export const countAtom = atom(0);

function Counter() {
  const count = useAtomValue(countAtom);
  const setCount = useSetAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
