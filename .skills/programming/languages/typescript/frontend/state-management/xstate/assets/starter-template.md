# XState Best Practices: Starter Template

A reusable starting point derived from the **3. Actions & Effects** section of [XState Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
actions: {
  assignData: assign({ data: (_, e) => e.data }),
  logError:  () => console.error("fail"),   // external side effect: keep it small
},
loading: { invoke: { src: "fetchItems", onDone: { target: "ready", actions: "assignData" }, onError: { target: "error", actions: "assignError" } } },
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
