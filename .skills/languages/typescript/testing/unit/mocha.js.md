---
name: mocha-best-practices
description: Best practices for unit testing with Mocha — the flexible JavaScript test framework conventions. Use when writing, structuring, or reviewing Mocha suites — covers describe/it, hooks, async, assertions (chai), electron/browser runs, and CI.
---

# Mocha Best Practices

Mocha is a **flexible test framework** — `describe`/`it` structure plus hooks, with assertions delegated to Chai/Assert (`expect`/`should`/`assert`). Practical Mocha leans on **a chosen assertion library up front (Chai's `expect` is idiomatic), hooks for shared setup, async tested explicitly (async/await or `done`), and explicit reporter/CI wiring** — the runner stays out of the way. Because Mocha has no built-in matchers, the assertion style is YOUR contract — pick it once.

---

## 1. Structure & Hooks

- **`describe` per unit, nested per behavior; hooks for lifecycle:**

```js
describe("Cart", () => {
  let cart;
  beforeEach(() => { cart = new Cart([]); });

  it("sums item amounts", () => {
    cart.add({ amount: 2 }); cart.add({ amount: 3 });
    expect(cart.total()).to.equal(5);
  });
});
```

- **Hooks: `beforeEach` fresh state, `afterEach` cleanup, `beforeAll/afterAll` sparingly for shared heavy setup.**
- **One behavior per `it`; names are sentences.**

---

## 2. Assertions

- **Chai `expect` style — compose readable contracts:**

```js
expect(cart.total()).to.equal(5);
expect(spy).to.have.been.calledWith(42);          // with sinon-chai
expect(fn).to.throw(/required/);
expect(result).to.have.property("id", 1);
```

- **Pick one style (expect/should/assert) and standardize — mixing styles is its own bug.**
- **Deep equality: `eql` (not strict `.equal`) for objects:**

```js
expect(args).to.eql({ email: "ada@example.com" });
```

---

## 3. Async Tests

- **Async via async/await or explicit `done` — never silently ignore:**

```js
it("loads items", async () => {
  const items = await loader.load();
  expect(items.length).to.equal(3);
});

it("falls back on error", (done) => {
  loader.load().catch((err) => { expect(err.message).to.contain("x"); done(); });
});
```

- **A `done` that's never called = timeout — set `this.timeout(...)` realistically; always call `done` on every path.**
- **Rejected promises fail the spec — `await expect(p).to.be.rejected` (chai-as-promised).**

---

## 4. Spies & Stubs

- **Sinon for spies/stubs/fakes (the defacto companion):**

```js
const stub = sinon.stub(api, "fetchUser").resolves(fixture);
expect(stub).to.have.been.calledOnce;
stub.restore();
```

- **`sinon.restore()` in `afterEach`** — spies left installed leak across tests.
- **Stub the boundary (client/fetch), not the unit's internals.**

---

## 5. Running & CI

- **`mocha` with a config (`spec`, `reporter`, `timeout`):**

```json
{ "spec": ["test/**/*.spec.js"], "reporter": "spec", "timeout": 10000 }
```

- **CI single-run + `--reporter mocha-junit-reporter` (or `@cypress/xvfb` contexts); coverage via `c8`/`nyc` at the runner level.**
- **Parallelize with `mocha --parallel` when suites are isolated (shared DBs/ports are anti-patterns).**
- **`--grep` for debug filtering; `.only` is debug-only — never committed.**

---

## General Rules of Thumb

- **`describe`/`it` structure + hooks; one behavior per `it`.**
- **One assertion style (Chai `expect`), `eql` for deep equality.**
- **Async explicit (async/await or `done` on every path); realistic `timeout`.**
- **Sinon stubs at boundaries; `sinon.restore()` per test.**
- **Runner config minimal; CI single-run + coverage gate; no `.only` shipped.**

---

## Quick-Start Checklist

- [ ] Nested `describe`; `beforeEach` fresh state; `afterEach` cleanup
- [ ] Standardized assertion style (Chai `expect`); `eql` for objects
- [ ] Async tested explicitly with timeouts; `done` on all paths
- [ ] Sinon stubs/spies at seams; restore in teardown
- [ ] Runner config (spec/reporter/timeout); CI single-run + coverage
- [ ] No focused `.only` committed; parallel only for isolated suites