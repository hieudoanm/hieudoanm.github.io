# Jasmine Best Practices: Basic Usage

Best practices for unit testing with Jasmine — the behavior-driven testing framework conventions for JavaScript. Use when writing, structuring, or reviewing Jasmine suites — covers specs, describe/it, matchers, spies, async, and setup.

## Scenario

Use this example as a starting point when applying **jasmine-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Structure & Naming** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
