# Implementation notes

Focused reference for **xstate-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
