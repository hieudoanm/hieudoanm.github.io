# Workflow notes

Focused reference for **xstate-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Guards are named decision boundaries — pure predicates over (context, event, params):**

```ts
loading: { on: { RETRY: { target: "loading", guard: "hasRetries" } } },
...
guards: { hasRetries: ({ context }) => context.retries < 3 },
```

- **No side effects in guards** — they must be deterministic; decision vs action separation is the whole point.

---

## 3. Actions & Effects

- **Actions are pure or `actor`-mediated side effects — named, testable:**

```ts
actions: {
  assignData: assign({ data: (_, e) => e.data }),
  logError:  () => console.error("fail"),   // external side effect: keep it small
},
loading: { invoke: { src: "fetchItems", onDone: { target: "ready", actions: "assignData" }, onError: { target: "error", actions: "assignError" } } },
```

- **`invoke` for async workers** — `actor` spawns; `onDone`/`onError` transitions (no raw promise handling in transitions).
- **Actions that perform I/O belong in invoked actors, not the transitions themselves.**

---
