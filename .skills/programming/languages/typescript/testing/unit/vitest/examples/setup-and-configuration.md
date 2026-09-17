# Vitest Best Practices: 2. Structure & Matchers

## Source guidance

This example applies the **2. Structure & Matchers** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Jest-compatible `describe`/`it`/`expect` — same sentences, same optics:**
- **Matchers mirror Jest** — `toEqual`/`toMatchObject` deep, `toThrow`, `toHaveBeenCalledWith`, `toContainEqual`.
- **`expect.any`, `expect.objectContaining` for partial/typed assertions.**

## Example

```ts
import { describe, it, expect } from "vitest";

describe("Cart", () => {
  it("sums item amounts", () => {
    expect(new Cart([{ amount: 2 }, { amount: 3 }]).total()).toEqual(5);
  });
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for vitest-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
