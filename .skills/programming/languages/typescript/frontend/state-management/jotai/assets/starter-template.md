# Jotai Best Practices: Starter Template

A reusable starting point derived from the **1. Atoms & Basic Usage** section of [Jotai Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
export const countAtom = atom(0);

function Counter() {
  const count = useAtomValue(countAtom);
  const setCount = useSetAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
