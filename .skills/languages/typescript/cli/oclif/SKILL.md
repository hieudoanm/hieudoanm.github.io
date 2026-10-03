---
name: oclif-cli-design
description: Best practices for building well-designed command-line tools with oclif (Node.js plugin-based CLI framework). Use when creating, structuring, or reviewing an oclif CLI app — covers the Command class, args/flags, topics, help, plugins, output, errors, and testing.
---

# oclif CLI Design Best Practices

oclif (Salesforce's CLI framework) builds CLIs from **classes** with declarative args/flags, a plugin system, and framework-provided help and tab-completion. It shines for large, extensible CLIs where commands ship in plugins and every command is a `Command` subclass with typed `flags`/`args`. Best practice is about colocating those declarations, keeping `run()` thin, and following oclif's conventions for help, errors, and plugin boundaries.

---

## 1. Setup & Structure

```bash
pnpm create oclif app        # or: pnpm add @oclif/core
```

```txt
myapp/
├── bin/
│   └── run.js               # generated entry — stays thin
├── src/
│   ├── commands/
│   │   ├── config/
│   │   │   ├── get.ts
│   │   │   └── set.ts
│   │   └── hello.ts
│   ├── index.ts
│   └── hooks/
├── test/
│   ├── commands/
│   └── setup.ts
└── package.json
```

- **One command per file in `src/commands/`**; directory nesting becomes topics (`src/commands/config/get.ts` → `app config get`).
- **Keep `main`/`bin` thin** — oclif wires the runner; business logic lives in the `Command` and services it calls.
- **`pjson.oclif` config** in `package.json` defines entry, topics, and hooks — treat it as part of the declaration surface.
- Version/help come from oclif automatically (`--version`, `--help`, topic-based help pages).

---

## 2. The Command Class

```ts
import { Command, Flags, Args } from '@oclif/core';

export default class ConfigGet extends Command {
  static description = 'Get a configuration value';
  static summary = "Shown in the parent command's help";
  static examples = [
    '<%= config.bin %> config get api.endpoint',
    '<%= config.bin %> config get -o json api.endpoint',
  ];

  static args = {
    key: Args.string({ description: 'Configuration key', required: true }),
  };

  static flags = {
    output: Flags.string({
      char: 'o',
      description: 'Output format',
      options: ['table', 'json'],
      default: 'table',
    }),
    ...commonFlags.help,
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(ConfigGet);
    // thin body: validate, call the service, print the result
    this.log(await readKey(args.key));
  }
}
```

- **`description` = one imperative line; `summary` = short list-line; `examples` = real, runnable commands.** All three surface in help.
- **`run()` reads `args`/`flags`** from `this.parse(Command)` — typed, validated, and documented from the static declarations; keep it short (delegate to services).
- **`static hidden`** for internal commands you don't want in help/tab-completion.

---

## 3. Args & Flags

| Tool            | Do                                                                             | Don't                        |
| --------------- | ------------------------------------------------------------------------------ | ---------------------------- |
| `Args.string`   | Positionals as declarations (`{ key: Args.string({ required: true }) }`)       | Manually index `argv`        |
| `Flags.string`  | `options` for closed sets, `parse` for coercion, `default` for sane fallbacks  | Loose untyped strings        |
| `Flags.integer` | Numbers typed at parse; `*flags.relationship` chains for cross-flag invariants | Double validation in `run()` |
| `Flags.boolean` | `allowNo` for `--no-colour`; default `false`                                   | Ambiguous tri-state flags    |

```ts
static flags = {
    port: Flags.integer({ char: "p", default: 6379, summary: "Port to listen on" }),
    force: Flags.boolean({ default: false, allowNo: true }),
    json: Flags.boolean({ default: false, summary: "Output as JSON" }),
};
```

- **`kebab-case` long flags, shorthand only for frequent ones** — document the `-o`/`-p` shorthand mapping once so it reads the same across the whole CLI.
- **Relationship flags** (`Flags.relationship`) declare `mutually exclusive of`/`exactly one of` constraints declaratively instead of a wall of runtime checks.
- **Build shared flag sets** (colour, output-format, verbose) as exported flag groupings every command composes.

---

## 4. Topics & Help

- **Nesting topics via directory layout** (`src/commands/config/*.ts`) — oclif derives `app config`, `app config get`, etc. and generates topic help automatically.
- **`static topic`/`summary` on grouping commands** so `app config --help` lists its children meaningfully.
- **`static aliases`** for legacy/`long` variants (`["cfg get"]`) — keep an alias map documented, not ad-hoc.
- **Hook-based help augmentation** (`hooks`) stays rare — prefer `examples` + topic summaries for 99% of discoverability.

---

## 5. Output & Feedback

| Rule                     | Detail                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------ |
| Human output → stdout    | `this.log(...)`                                                                      |
| Errors/warnings → stderr | `this.error(...)` (see §6), never `console.error` in commands                        |
| Machine output           | Support a consistent `--json` flag emitting `JSON.stringify`-worthy data             |
| Progress                 | `ux.action.start("...")` spinner for operations >300ms; `ux.action.stop()` when done |
| Colour                   | Respect `NO_COLOR` and `--no-colour`; `this.config.theme` styling hooks              |

```ts
import { ux } from '@oclif/core';

ux.action.start('Fetching');
await load(); // >300ms op
ux.action.stop('done');
```

---

## 6. Errors & Exit Codes

- **`this.error(msg, { exit: 2 })` / `this.warn`** are the _only_ ways to signal failures in a command — they print to stderr, set the exit code, and flush properly:

```ts
if (!(await exists(key))) {
  this.error(
    `key "${key}" not found — run 'app config list' to see available keys`,
    { exit: 2 }
  );
}
```

- **`this.catch(err)`** overrides the default error path for translating exceptions into actionable messages (never rethrow a raw `TypeError` as a command failure if you can explain it).
- **Use `exit: 2` for usage-type errors (wrong flags/args) and `exit: 1` for runtime failures**; distinguish only where callers need to branch.
- **`simple: { shift: 1 }`-style pretty printing for unexpected errors enabled globally** — unexpected failures should read as a bug report, not a stack dump mid-table.

---

## 7. Plugins & Team Boundaries

- **Ship capability groups as oclif plugins** (`@oclif/plugin-help`, `plugin-plugins`, `plugin-version` are the framework's own) — a team owns the code and the commands it exposes; the app composes plugins.
- **Write commands as `export default class`** so plugin packaging (`@oclif/test` harness + `eslint-config-oclif`) works across projects.
- **`topics` in plugin config** describe the domain surface; command discovery happens at runtime, so new plugin commands show up in help/completion automatically.
- **Keep plugins focused** — a plugin is a release and a help surface; one idea per plugin, shared services via the plugin's public API.

---

## 8. Testing

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
