# JavaScriptCore Best Practices: Starter Template

A reusable starting point derived from the **6. Multi-Isolate & Workers** section of [JavaScriptCore Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```js
const sab = new SharedArrayBuffer(1024);
const a = new Int32Array(sab);
Atomics.add(a, 0, 1);
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
