# Workflow notes

Focused reference for **yargs-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
