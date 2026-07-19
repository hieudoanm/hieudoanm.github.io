# Node.js Runtime Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`node:test` + `node --test`** — zero-dependency runner, structured `describe`/`it`/`t`, test files auto-discovered under `test/`:
- **`mock` (`t.mock`) for function/API stubbing**; `node:assert/strict` over `assert` — `deepEqual` strictness is where the truth is.
- **Coverage via `--experimental-test-coverage`** for meaningful coverage gates on domain logic; `node --test --test-reporter=spec` for CI-readable output.
- **Name tests as specifications**; use subtests (`t.test`) for parameterized tables.

## Example

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';

test('loads the value when present', () => {
  assert.equal(load('k'), 'v');
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for nodejs-runtime.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
