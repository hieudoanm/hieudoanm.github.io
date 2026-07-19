# Review checklist

Focused reference for **oclif-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`@oclif/test`** provides `cmd.run(["config", "get", "x"])` + stdout/stderr capture assertions:

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

- **Assert exit codes** (`.exit(2)`), stderr content, and `--json` output shape — the machine contract is the CLI's real API.
- **Mock services at the seam** (`sinon`/`vi.fn` on the `readKey`-style collaborators), never oclif internals — commands stay thin and fast.

---

## 9. General Rules of Thumb

- **Declare loudly, run thin** — the class's `description`/`args`/`flags` are the docs, help, validation, and completion; `run()` just orchestrates.
- **Consistency beats cleverness** — match the conventions users already know from `git`/`docker`/Heroku CLIs.
- **No raw `console.*` in commands; no manual `process.exit`** — oclif paths own both, and tests assert on them.
- **Idempotent where possible**; confirm destructive actions via interactive prompts or `--force`.
- **Plugin boundaries are team boundaries** — what ships together helps together.

---

## Quick-Start Checklist

- [ ] Commands as `Command` subclasses, one per file, nested → topics
- [ ] `description`, `summary`, `examples` on every command
- [ ] Args/flags declared as `Args.*`/`Flags.*` with `options`/`default`/`type`
- [ ] Shared flag sets (colour, format, verbose) composed, not repeated
- [ ] `kebab-case` long flags; shorthands only for frequent ones
- [ ] `this.log`/`this.error`/`ux.action` discipline; no `console.*` ad-hoc
- [ ] `--json` support with a stable machine schema
- [ ] `this.error(msg, { exit })` for failures; usage errors exit `2`
- [ ] `@oclif/test` tests asserting stdout/stderr/exit codes
- [ ] Destructive actions confirm or require `--force`
- [ ] Colour + spinner respect TTY/`NO_COLOR`/`--quiet`
