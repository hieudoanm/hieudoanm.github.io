# oclif CLI Design Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`@oclif/test`** provides `cmd.run(["config", "get", "x"])` + stdout/stderr capture assertions:
- **Assert exit codes** (`.exit(2)`), stderr content, and `--json` output shape — the machine contract is the CLI's real API.
- **Mock services at the seam** (`sinon`/`vi.fn` on the `readKey`-style collaborators), never oclif internals — commands stay thin and fast.

## Example

```ts
import { expect } from '@oclif/test';
import { test } from '@oclif/test';

test
  .stdout()
  .command(['config', 'get', 'api.endpoint'])
  .it('prints the stored value', (ctx) => {
    expect(ctx.stdout).to.contain('some-value');
  });

test
  .command(['config', 'get']) // missing required arg
  .exit(2)
  .it('exits 2 when the key is missing');
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for oclif-cli-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
