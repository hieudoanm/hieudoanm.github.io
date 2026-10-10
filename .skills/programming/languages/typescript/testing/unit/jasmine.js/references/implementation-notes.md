# Implementation notes

Focused reference for **jasmine-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Setup & Teardown

- **`beforeEach` builds fresh state per `it`; `afterEach` resets/restores:**

```js
beforeEach(() => { subject = new Cart(seedItems()); });
afterEach(() => { jasmine.clock().uninstall(); });
```

- **`beforeAll` only for truly shared heavy setup** — shared mutable state causes test orderings.
- **`jasmine.clock()` for time-based logic (`install`, `tick`, `uninstall`).**

---

## 5. Async Specs

- **Async via `done` or returning a promise/done-return — prefer async/await:**

```js
it("loads items", async () => {
  const items = await loader.load();
  expect(items.length).toBe(3);
});
```

- **Explicit `done()` for callback-style code; `jasmine.DEFAULT_TIMEOUT_INTERVAL` set realistically.**
- **Rejected promises fail the spec — `expectAsync` for awaited async expectations.**

---
