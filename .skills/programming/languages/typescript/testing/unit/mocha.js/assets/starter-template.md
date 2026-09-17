# Mocha Best Practices: Starter Template

A reusable starting point derived from the **1. Structure & Hooks** section of [Mocha Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
