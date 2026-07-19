# Review checklist

Focused reference for **zustand-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Testing

- **Store tests run without React — plain model tests:**

```ts
it("login sets the user", () => {
  const store = useSession.getState();
  store.login({ id: "1" });
  expect(useSession.getState().user?.id).toBe("1");
});
```

- **Reset per test** (`useX.setState(initial)`); async actions tested with fetch mocked.
- **Selector stability tested** (`useShallow` snapshots equivalent data → no re-render) where perf matters.

---

## General Rules of Thumb

- **Store per domain; functions + data, no reducers needed.**
- **Selectors control re-renders — granular reads, `useShallow` for objects.**
- **Async inside actions (`set` transitions documented).**
- **Middleware only when the feature is used; persist validated.**
- **Plain-store model tests; per-test resets.**

---

## Quick-Start Checklist

- [ ] `create<T>` stores per domain; actions defined with state
- [ ] Selector-based reads (`(s) => s.field`); `useShallow` for object snapshots
- [ ] Async actions with state transitions; `get` used sparingly
- [ ] `persist`/`devtools`/`immer` middleware intentional; storage validated
- [ ] No mega-store; composition at the UI boundary
- [ ] Model tests for actions; per-test resets; mocked async
