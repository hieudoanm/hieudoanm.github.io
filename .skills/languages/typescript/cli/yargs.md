---
name: yargs-cli-design
description: Best practices for building well-designed command-line tools with Yargs (Node.js). Use when creating, structuring, or reviewing a Yargs CLI app — covers command modules, strict parsing, options, validation, help, output, completion, and testing.
---

# Yargs CLI Design Best Practices

Yargs is the configuration-driven Node.js CLI framework: you declare commands, options, and validation rules as data, and it produces help, strict parsing, and completion from those declarations. Because Yargs is declarative, the main risks are letting its permissive defaults through — unflagged args, loose coercion, unvalidated input — so best practice starts with `.strict()` and the discipline of describing every option's shape up front.

---

## 1. Core Stack

- `yargs` — parser, command tree, help/usage, completion
- `chalk` / `picocolors` — colours with TTY auto-detection
- `ora` — spinners for >300ms operations
- `cli-table3` / `boxen` — table/box output layout

```bash
pnpm add yargs chalk ora
```

- **Use `hideBin(process.argv)`** — `yargs(hideBin(process.argv))` strips the `node` executable and script path like `argv.slice(2)` without whitespace mistakes.

---

## 2. Command Structure

- **Declare commands as modules** (`command`, `describe`, `builder`, `handler`) — self-contained, testable, and colocated with their options:

```ts
import type { ArgumentsCamelCase } from 'yargs';

export const command = 'get <key>';
export const describe = 'Get a configuration value';
export const builder = {
  output: {
    alias: 'o',
    type: 'string',
    choices: ['table', 'json'],
    default: 'table',
    describe: 'Output format',
  },
};
export async function handler(argv: ArgumentsCamelCase<typeof builder>) {
  const { key, output } = argv;
  // ...
}
export default { command, describe, builder, handler };
```

- **Noun-verb or verb-noun, consistent app-wide**; shallow trees (2 levels) with parent grouping (`app config get/set/list`).
- **`argv` is your typed result** — declare every positional and option in `builder` so `argv.key`/`argv.output` are known at compile time (derive types from the builder).
- One command module per file, named for the command (`commands/get.ts`).

---

## 3. Strict Parsing (Non-negotiable)

```ts
yargs(hideBin(process.argv))
  .command(commands)
  .demandCommand(1) // a subcommand is required
  .strict()
  .recommendCommands() // "Did you mean 'config get'?"
  .help()
  .alias('h', 'help')
  .version()
  .alias('v', 'version');
```

- **`.strict()` everywhere** — unknown options and stray positionals become errors instead of silently dripping into `argv` as stringly junk.
- **`.demandCommand()`** — an app with subcommands shouldn't be a silent no-op at the root.
- **`.recommendCommands()`** — the typo-hint (`Did you mean ...`) is cheap to enable and expensive to do by hand.
- **Type coercion from declarations, not casts** — `type: "number"`, `type: "boolean"`, `type: "count"` map CLI text to typed `argv` fields at parse time.

---

## 4. Options & Positionals

```ts
const options = {
  verbose: { type: 'boolean', alias: 'v', default: false },
  watch: { type: 'boolean', default: false },
  out: {
    alias: 'o',
    type: 'string',
    default: 'dist',
    coerce: (p: string) => resolve(p),
  },
  retries: { type: 'number', default: 3 },
};
```

| Convention     | Rule                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------- |
| Long form      | Always provide (`--output`); short (`-o`) only for genuinely frequent flags                 |
| Kebab-case     | `--output-format`, never `camelCase`/`snake_case`                                           |
| Arrays/objects | `type: "array"` splits on commas/spaces; `type: "object"` accepts JSON text                 |
| Negatable      | `.option("colour", { type: "boolean", default: true })` + `--no-colour` works automatically |
| `coerce`       | For transforms (path resolution, number parsing) implemented at parse, not in `handler`     |

- **`choices` for closed sets** (output formats) — validation belongs in the declaration, not a manual `if` in `handler`.
- **Positionals via `.positional("key", {...})`** in `builder` — declared, typed, and shown in usage/help.

---

## 5. Validation

- **`.check((argv) => ...)`** for cross-field invariants that declarations can't express (`--format json` requires `--output file`); throw from inside to produce a usage error.
- **`.demandOption()`** in builder declarations (`{ demandOption: true }`) vs. manually checking `!argv.key`.
- Failure messages should be **actionable** — what went wrong _and_ how to fix it. Combine with `.fail()` to format:

```ts
.fail((msg, err, yargs) => {
    if (msg) { console.error(chalk.bold.red(msg)); }
    else if (err) { console.error(String(err?.stack ?? err)); return; }
    console.error(yargs.help());   // usage hint on parse failures only
    process.exitCode = 1;
});
```

- **`.exitProcess(false)` in tests** — let parsing errors surface as thrown/returned objects instead of killing the process, and assert on them.

---

## 6. Help & Usage

- `.usage("$0 <cmd> [options]")` shapes the synopsis; `.epilog("Run 'app help <command>' for details")` adds a footer.
- **Per-command `describe`** (one imperative line) + `.examples([...])` — the examples block is the most useful part of `--help` for newcomers:

```ts
.usage("$0 get <key> [options]")
.examples(["$0 get api.endpoint", "$0 get -o json api.endpoint"])
```

- `.help().alias("h", "help")` and `.version()` as subcommands/flags are free and expected.

---

## 7. Output Conventions

| Rule                                   | Detail                                                                     |
| -------------------------------------- | -------------------------------------------------------------------------- |
| Human output → stdout, errors → stderr | Always; breaks piping otherwise                                            |
| `--output`/`-o` structured formats     | `table` (default), `json`, `yaml` — machine-readable default for scripting |
| Colour                                 | TTY-detect + `NO_COLOR`; keep `chalk.level = 0` fallback                   |
| Exit codes                             | `0` success, `1` generic; distinct only when callers must distinguish      |

```ts
process.env.NO_COLOR ?? (!process.stdout.isTTY && (chalk.level = 0));
```

---

## 8. Shell Completion

- **`.completion()`** ships a `completion` subcommand that generates shell scripts for **bash/zsh/fish** — wire it into the CLI so `app completion bash` emits directly usable output:

```ts
yargs(hideBin(process.argv)).command(commands).completion();
```

- Enable `defaultCommand`-style positional completion lazily on platforms/users that run it; document it in `--help`.

---

## 9. Testing

- **Test the `handler` directly** with a built `argv` object (`{ key: "x", output: "json" }`), or invoke the full `.parseAsync()` against a fixture argv array with `.exitProcess(false)` and assert on output/`process.exitCode`.
- **Parametrize cases** for format combos and bad input (unknown flag, missing positional, `choices` violation) — each asserts a stable `stderr`/exit code.
- **Assert machine output** — `--output json` must parse with `JSON.parse` and match the documented shape; this is the scripting contract.

---

## 10. General Rules of Thumb

- **Declare it, don't check it** — every option, choice, positional, and default lives in the declaration so help and validation agree.
- **Strict by default, deny by default** — unknown flags fail loudly; add affordances explicitly, not by accident.
- **Idempotent commands where possible** — re-running shouldn't fail because the goal state already exists.
- **`argv` types are the contract** — keep command signatures derived from builders and stable across versions.

---

## Quick-Start Checklist

- [ ] `.strict()`, `.demandCommand(1)`, `.recommendCommands()` in place
- [ ] Commands as modules (`command`/`describe`/`builder`/`handler`) colocated with options
- [ ] Every option `type`/`choices`/`default`/`alias` declared; kebab-case longs
- [ ] Positionals typed via `.positional()`
- [ ] Cross-field invariants in `.check()`; failures actionable
- [ ] `--help`/`--version` present; usage + examples per command
- [ ] Errors to stderr; `--output json` machine-parseable
- [ ] `.completion()` command wired for bash/zsh/fish
- [ ] Handler tests with `.exitProcess(false)`; parametrized bad-input cases
- [ ] Colour respects TTY/`NO_COLOR`
