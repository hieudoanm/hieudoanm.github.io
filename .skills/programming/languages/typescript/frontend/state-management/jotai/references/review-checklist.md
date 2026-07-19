# Review checklist

Focused reference for **jotai-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`<Provider>` scopes atoms; per-test stores isolate state:**

```tsx
function TestHarness({ children }) {
  return <Provider>{children}</Provider>;
}
```

- **Default global store for real pages; providers for multi-store/segmented pages or tests.**
- **Testing derived/async atoms** — read getters with a mocked store; assert derived outputs.

---

## General Rules of Thumb

- **Atom = smallest useful unit of truth; one concept per atom.**
- **Derived atoms, not manual sync; async atoms for external data.**
- **Read with `useAtomValue`, write with `useSetAtom`, both with `useAtom`.**
- **Persisted atoms are a versioned schema; storage validated on read.**
- **`Provider` for test isolation; fine-grained subscriber re-renders.**

---

## Quick-Start Checklist

- [ ] Colocated `atom(...)` exports; `useAtomValue`/`useSetAtom` discipline
- [ ] Derived atoms for computed state; no `useEffect` sync mirrors
- [ ] Async atoms for API data; loading/error via React boundaries
- [ ] `atomWithStorage` with namespaced keys; storage-validated reads
- [ ] `Provider` scoping for tests/multi-store; small granular atoms
- [ ] Derived-selector correctness tested; no per-render fetches
