# Review checklist

Focused reference for **xstate-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
