# Mocha Best Practices: 1. Structure & Hooks

## Source guidance

This example applies the **1. Structure & Hooks** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`describe` per unit, nested per behavior; hooks for lifecycle:**
- **Hooks: `beforeEach` fresh state, `afterEach` cleanup, `beforeAll/afterAll` sparingly for shared heavy setup.**
- **One behavior per `it`; names are sentences.**

## Example

This excerpt is from the cited **1. Structure & Hooks** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for mocha-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
