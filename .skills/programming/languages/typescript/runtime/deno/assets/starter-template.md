# Deno Runtime Best Practices: Starter Template

A reusable starting point derived from the **6. Testing** section of [Deno Runtime Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";

describe("getUser", () => {
    it("returns the user when found", async () => {
        assertEquals((await getUser("1")).id, 1);
    });
});
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
