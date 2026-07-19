# Jest Best Practices: Basic Usage

Best practices for unit testing with Jest — the JavaScript testing framework conventions for the modern JS/TS ecosystem (including vitest-alike DX). Use when writing, structuring, or reviewing Jest suites — covers describe/it, matchers, mocking, fakes, coverage, and CI.

## Scenario

Use this example as a starting point when applying **jest-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Structure & Naming** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
describe("Cart", () => {
  it("sums item amounts", () => {
    const cart = new Cart([{ amount: 2 }, { amount: 3 }]);
    expect(cart.total()).toEqual(5);
  });
});
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
