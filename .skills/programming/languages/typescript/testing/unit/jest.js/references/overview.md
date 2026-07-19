# Overview

Focused reference for **jest-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Jest Best Practices

Jest is the **default test framework in the JS/TS ecosystem** — everything in one runner (runner, matchers, mocking, coverage, watch). Practical Jest leans on **behavioral suites (`describe`/`it` sentences), `toEqual`/`toMatchObject` deep matchers, and `jest.mock`/`jest.spyOn` for seam isolation** — with the config minimal (one `jest.config.js`/pkg `"jest"` block). Tests document and verify the contract.

---

## 1. Structure & Naming

- **`describe` per unit, nested `describe` per behavior, `it` one sentence:**

```ts
describe("Cart", () => {
  it("sums item amounts", () => {
    const cart = new Cart([{ amount: 2 }, { amount: 3 }]);
    expect(cart.total()).toEqual(5);
  });
});
```

- **One assertion-path per `it`; names read as mini-specs.**
- **Colocate `x.test.ts` beside `x.ts`** — discovery is convention-driven.

---

## 2. Matchers
