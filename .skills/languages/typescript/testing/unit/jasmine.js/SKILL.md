---
name: jasmine-best-practices
description: Best practices for unit testing with Jasmine — the behavior-driven testing framework conventions for JavaScript. Use when writing, structuring, or reviewing Jasmine suites — covers specs, describe/it, matchers, spies, async, and setup.
---

# Jasmine Best Practices

Jasmine is a **behavior-driven testing framework for JavaScript** — `describe`/`it` blocks with rich matchers and `spyOn` for fakes, no extra dependencies. Practical Jasmine leans on **sub-`describe` blocks per behavior, readable `expect(...).toEqual(...)` (avoiding `toBe` for objects), `beforeEach` for shared setup, and spies for seams** — mirroring how the object behaves, not how it computes. Tests read as sentences.

---

## 1. Structure & Naming

- **`describe` per unit, nested for behaviors; `it` as one behavioral sentence:**

```js
describe("Cart", () => {
  describe("#total", () => {
    it("sums item amounts", () => {
      const cart = new Cart([{ amount: 2 }, { amount: 3 }]);
      expect(cart.total()).toEqual(5);
    });
  });
});
```

- **One assertion-path per `it`** — a failing step is named, not buried in a mega test.
- **Names read like specs** (`sums item amounts`, `rejects invalid email`) — the description is the documentation.

---

## 2. Matchers

- **`toEqual` for deep equality; `toBe` for identity; `toBeTruthy`/`toBeFalsy` for truthiness:**

```js
expect(cart.items).toEqual([{ amount: 2 }]);
expect(service.token).toBeInstanceOf(String);
expect(spy).toHaveBeenCalledWith(42);
```

- **`toThrow` with a specific error for error contracts:**

```js
expect(() => user.validate()).toThrowError("email required");
```

- **Compose matchers over manual asserts** — the failure messages are the point.

---

## 3. Spies & Fakes

- **`spyOn` for seam isolation — verify calls, stub returns, inject fakes:**

```js
const api = { fetchUser: () => ({ id: 1 }) };
spyOn(api, "fetchUser").and.returnValue({ id: 9 });
expect(api.fetchUser).toHaveBeenCalled();
```

- **Use `and.returnValue`, `and.throwError`, `and.callFake` for controlled dops.**
- **Spy on the object's own method** — spying on a helper without a seam couples the test to internals.

---

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

## 6. Running & CI

- **`jasmine` runner (`npx jasmine jasmine.json` / `karma-jasmine` in browsers) — spec patterns explicit.**
- **CI: headless + single run; coverage via `karma-coverage`/`nyc` when wired.**
- **`fit`/`fdescribe` are debug-only — remove focused specs before commit (CI catches them with a filter).**

---

## General Rules of Thumb

- **`describe`/`it` sentences; one assertion-path per `it`.**
- **`toEqual` deep, `toBe` identity; `toThrowError` documented contracts.**
- **`spyOn` at seams; `beforeEach` fresh state; `afterEach` restore.**
- **Async with async/await; `expectAsync`; explicit done for callbacks.**
- **Run headless in CI; no `fit`/`fdescribe` shipped.**

---

## Quick-Start Checklist

- [ ] Nested `describe` per behavior; one-path `it` names
- [ ] Correct matchers (`toEqual`/`toBe`/`toThrowError`)
- [ ] `spyOn` seams; controlled returns/errors
- [ ] Fresh state in `beforeEach`; restores in `afterEach`
- [ ] Async specs via async/await or explicit `done`
- [ ] CI headless + single run; focused specs removed