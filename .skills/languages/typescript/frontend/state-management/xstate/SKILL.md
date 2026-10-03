---
name: xstate-best-practices
description: Best practices for modeling state machines with XState — the statechart conventions for events/actions/guards. Use when writing, structuring, or reviewing XState (v5) — covers machines, states/transitions, actions, guards, actors, and testing.
---

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

## 4. Actors & Orchestration

- **Machines become actors; spawn `createActor(machine).start()`; subscribe to snapshots:**

```ts
const actor = createActor(fetchMachine).start();
actor.subscribe((snap) => console.log(snap.value, snap.context));
actor.send({ type: "FETCH" });
```

- **`spawn`/`fromPromise` for children** — orchestration through the actor graph, not raw callbacks.
- **`MaterializeOne`/`ctx`-based `sendTo` for cross-actor routing for larger apps.**

---

## 5. Persistence & Interop

- **State persistence** — serialize machine value + context (restore via `createMachine` snapshot; `inspect()`/restore hooks). Schema it; storage is untrusted.
- **UI binding** — `@xstate/react` `useMachine`/`useActor`; actions side effects via `assign` guards, and the view renders `snap.value` state-conditioned.

---

## 6. Testing

- **Machine tests = transition tables — each (state,event,guard) → (target, actions):**

```ts
it("transitions idle → loading on FETCH", () => {
  const actor = createActor(fetchMachine);
  actor.send({ type: "FETCH" });
  expect(actor.getSnapshot().value).toBe("loading");
});
```

- **Guards and actions unit-tested in isolation (pure).**
- **`createActor` test harness covers full state space — including every `error`/`RETRY` path.**

---

## General Rules of Thumb

- **States = domain vocabulary; events = closed typed inputs; context = data.**
- **Guards pure, actions small, I/O via `invoke`.**
- **Transitions table-tested; every state/guard/action path asserted.**
- **Machines are the spec — readable, executable, statelessly documentable.**

---

## Quick-Start Checklist

- [ ] `createMachine` with named states, typed events, typed context
- [ ] Guards as named pure predicates at decision boundaries
- [ ] Actions small/pure; async via `invoke` (onDone/onError)
- [ ] Exposed as actors (`createActor`); snapshots consumed by UI
- [ ] Persistence versioned + validated; restored snapshots checked
- [ ] Transition-table tests covering idle/loading/ready/error + RETRY paths