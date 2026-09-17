# Bun Runtime Best Practices: 5. Testing (bun:test)

## Source guidance

This example applies the **5. Testing (bun:test)** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`bun test` + `bun:test`** is a Jest-compatible runner with zero config — `describe`/`it`/`expect`, `beforeEach`/`afterEach`, mocks/spies, and TS native:
- **`bun test --coverage` for reports** (built-in coverage provider, no extra dependency); watch mode via `bun test --watch`.
- **Test the service boundary with real `Bun.serve` on a random port** (`Bun.serve({ port: 0 })` → `server.url`) for honest integration tests — spin-up is fast enough that dockerizing every test isn't needed for small services.

## Example

```ts
import { test, expect, mock } from "bun:test";

const read = mock(() => "v");
test("reads the value", () => {
    expect(read()).toBe("v");
    expect(read).toHaveBeenCalledTimes(1);
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for bun-runtime.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
