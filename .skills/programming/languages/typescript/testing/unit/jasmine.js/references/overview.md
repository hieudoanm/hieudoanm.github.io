# Overview

Focused reference for **jasmine-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
