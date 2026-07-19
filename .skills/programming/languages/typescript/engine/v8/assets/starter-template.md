# V8 Best Practices: Starter Template

A reusable starting point derived from the **1. Object Shape & Monomorphism** section of [V8 Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```js
function render(item) {
  return { id: item.id, value: item.value };   // same 2-key shape every call
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
