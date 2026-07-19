# Deno Runtime Best Practices: 6. Testing

## Source guidance

This example applies the **6. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`deno test`** — the built-in runner; `@std/assert` for assertions, `describe`/`it` from `@std/testing/bdd`, plus built-in coverage:
- **Mock HTTP/fetch with `@std/http/mock` or `undici`'s `MockAgent`** — test the service contract, not implementation.
- **`deno test --coverage` + `deno coverage`** for reports; name tests as specifications; run per-module `mod_test.ts` files next to sources.

## Example

```ts
import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";

describe("getUser", () => {
    it("returns the user when found", async () => {
        assertEquals((await getUser("1")).id, 1);
    });
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for deno-runtime.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
