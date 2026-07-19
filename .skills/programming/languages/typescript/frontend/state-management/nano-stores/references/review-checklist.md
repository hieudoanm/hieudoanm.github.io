# Review checklist

Focused reference for **nano-stores-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```ts
it("total derives from count × price", () => {
  count.set(3); price.set(2);
  expect(total.get()).toBe(6);
});
```

- **`action` behavior tested — invariant updates, validation paths, garbage inputs.**
- **Reset stores per test** (`store.set(initial)`) — no cross-test leakage; deterministic.

---

## General Rules of Thumb

- **Atom for scalar, map for structure, computed for derived — no manual sync.**
- **Mutations via `action`, not raw `store.set` scattered.**
- **Component bindings (`useStore`) handle subscribe/unsubscribe.**
- **`persist` with namespaced, validated storage.**
- **Granular stores; per-test resets; model-layer tests.**

---

## Quick-Start Checklist

- [ ] `atom`/`map` per domain; `computed` derived values
- [ ] `action` wrappers for mutations + validation
- [ ] `useStore` bindings in components; manual `subscribe` unsubscribed
- [ ] `persist` with namespaced keys + shape validation
- [ ] Granular stores; no mega-store ripples
- [ ] Model tests with per-test resets; deterministic
