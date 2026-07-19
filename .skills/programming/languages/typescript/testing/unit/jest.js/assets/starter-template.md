# Jest Best Practices: Starter Template

A reusable starting point derived from the **1. Structure & Naming** section of [Jest Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
describe("Cart", () => {
  it("sums item amounts", () => {
    const cart = new Cart([{ amount: 2 }, { amount: 3 }]);
    expect(cart.total()).toEqual(5);
  });
});
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
