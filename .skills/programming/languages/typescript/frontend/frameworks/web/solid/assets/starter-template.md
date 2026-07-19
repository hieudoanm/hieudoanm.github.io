# SolidJS Best Practices: Starter Template

A reusable starting point derived from the **2. Component Structure** section of [SolidJS Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```typescript
interface ButtonProps {
  onClick: () => void
  children: JSX.Element
}

function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.children}</button>
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
