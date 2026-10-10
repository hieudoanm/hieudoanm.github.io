# Overview

Focused reference for **mocha-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
