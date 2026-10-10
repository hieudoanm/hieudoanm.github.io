# Mocha Best Practices: Basic Usage

Best practices for unit testing with Mocha — the flexible JavaScript test framework conventions. Use when writing, structuring, or reviewing Mocha suites — covers describe/it, hooks, async, assertions (chai), electron/browser runs, and CI.

## Scenario

Use this example as a starting point when applying **mocha-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Structure & Hooks** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
