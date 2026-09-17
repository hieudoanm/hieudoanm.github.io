# Overview

Focused reference for **xstate-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# XState Best Practices

XState models **state machines & statecharts** — a machine is a graph of `states` with `on` transitions triggered by `events`, guarded by `guards` and executed by `actions`. Practical XState leans on **machines that mirror the domain's real state space (idle/loading/ready/error), events as the only input, guards for decision boundaries, actions for pure (or `invoke`-mediated) effects**, and **actors for living instances**. A machine is executable documentation — the states are the spec.

---

## 1. Defining a Machine

- **`createMachine` with typed context + events; states + transitions:**

```ts
import { createMachine } from "xstate";

export const fetchMachine = createMachine({
  id: "fetch",
  initial: "idle",
  context: { data: null as Item[] | null, error: null as string | null },
  states: {
    idle: { on: { FETCH: "loading" } },
    loading: {
      on: {
        SUCCESS: { target: "ready", actions: "assignData" },
        FAILURE: { target: "error", actions: "assignError" },
      },
    },
    ready: { on: { FETCH: "loading" } },
    error: { on: { RETRY: "loading", FETCH: "loading" } },
  },
});
```

- **State names are the domain vocabulary** (`idle`, `loading`, `ready`, `error`) — not `step1`/`step2`.
- **Events are closed, typed nouns** — the event set is the API surface.
- **Context holds data; states hold configuration.**

---

## 2. Guards
