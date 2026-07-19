# XState Best Practices: 4. Actors & Orchestration

## Source guidance

This example applies the **4. Actors & Orchestration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Machines become actors; spawn `createActor(machine).start()`; subscribe to snapshots:**
- **`spawn`/`fromPromise` for children** — orchestration through the actor graph, not raw callbacks.
- **`MaterializeOne`/`ctx`-based `sendTo` for cross-actor routing for larger apps.**

## Example

```ts
const actor = createActor(fetchMachine).start();
actor.subscribe((snap) => console.log(snap.value, snap.context));
actor.send({ type: "FETCH" });
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for xstate-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
