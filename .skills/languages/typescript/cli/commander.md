---
name: commander-cli-design
description: Best practices for building well-designed command-line tools with Commander.js (Node/Auth). Use when creating, structuring, or reviewing a Commander CLI app — covers command structure, arguments, options, help, output, errors, and testing with suggested values.
---

# Commander.js CLI Design Best Practices

Commander.js is the classic imperative Node.js CLI framework: you describe commands, options, and action handlers programmatically, and it produces consistent help/usage and exit behaviour for free. Good CLI design with Commander is mostly _conventions_ — command trees, `stdout`/`stderr` discipline, exit codes, and actionable errors — plus fitting your workflow into `program.command(...)`/`.option(...)`/`.action(...)` instead of fighting the framework.

---

## 1. Core Stack

- `commander` — command tree, options, help/usage generation
- `chalk` or `picocolors` — colored terminal output (auto-detect TTY)
- `ora` (or `cli-spinners`) — spinners for operations >300ms
- `boxen` / `cli-table3` — output layout (tables, boxes)
- `conf` / `env-paths` — persisted config where needed

```bash
pnpm add commander chalk ora
```

---

## 2. Command Structure

- **Noun-verb or verb-noun, pick one and stay consistent** — `app config get` or `app get config`, never both in one tree.
- **Keep the tree shallow** — 2 levels of commands is usually enough; a 3rd only for a genuinely complex domain.
- **Root should do something useful** or print help — never a silent no-op.
- **Group related actions under a parent command** (`app config get/set/list`) even if the parent has no action itself.

```ts
#!/usr/bin/env node
import { program } from 'commander';

program
  .name('app')
  .description('CLI for managing configuration')
  .version('1.0.0');

program
  .command('config get <key>')
  .description('Get a configuration value')
  .option('-o, --output <format>', 'Output format: table, json, yaml', 'table')
  .action(async (key, opts) => {
    /* ... */
  });

program.parse();
```

---

## 3. Arguments

| Rule                              | Detail                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------- |
| Positional for the "main subject" | `app get <key>` — flags for modifiers/options, not the subject                  |
| Required vs optional              | `<required>` angle brackets, `[optional]` square brackets                       |
| Variadic                          | `<file...>` collects the rest into an array — use sparingly, last position only |
| Validate with a function          | `.argument("<port>", "Server port", parseInt, 3000)` — throws on bad input      |

```ts
program
  .command('set <key> <value>')
  .argument('[ttl]', 'Expiry in seconds', parseInt)
  .action((key, value, ttl) => {
    /* ... */
  });
```

- **Do validation in the argument validator or the action handler**, not by mutating globals — a parse-time failure gives a clean usage error instead of an opaque crash.
- **Prefer `.option()` with `requiredOption` for flags that must be present** over manually checking `undefined`.

---

## 4. Options (Flags)

| Convention    | Rule                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------ |
| Long form     | Always provide (`--output`); short only for genuinely frequent flags (`-o`, `-v`, `-f`)          |
| Kebab-case    | Long options are `kebab-case`, never `camelCase`/`snake_case`                                    |
| Boolean flags | Default `false`; make them affirmative (`--force`, not `--no-safe`); negatable via `--no-<name>` |
| Typed options | Give a type hint: `.option("-p, --port <number>", "...", parseInt)` so coercion happens at parse |
| Defaults      | Provide a default in the option declaration, not `??` later in the handler                       |

```ts
program.option('--no-colour', 'Disable coloured output');
program.requiredOption('-p, --port <number>', 'Port to listen on', parseInt);
```

- **Don't reuse a shorthand letter with different meanings across sibling commands** — `-o` should mean "output" everywhere.

---

## 5. Help Text

- `.description()` — one imperative line, no trailing period (`"Get a configuration value"`, not `"This command gets..."`).
- `.usage("<cmd> [options]")` for the synopsis; `.helpOption()` keeps the default `--help`.
- **`.addHelpText()`** for a custom `Examples:`/footer block — the single most useful part of `--help` for new users.

```ts
program
  .command('get <key>')
  .description('Get a configuration value')
  .addHelpText(
    'after',
    '\nExamples:\n  app get api.endpoint\n  app get --output json api.endpoint'
  );
```

- **`showHelpAfterError()` (v8+) and `showSuggestionAfterError()`** — show a short help/typo hint after a failed parse instead of a wall of usage text. Reserve full usage dumps for actual parse mistakes, not runtime failures.

---

## 6. Output Conventions

| Rule                                       | Detail                                                                                    |
| ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Human output → stdout                      | Always                                                                                    |
| Errors/warnings → stderr                   | Never mix into stdout — breaks piped output                                               |
| Support `--output`/`-o` structured formats | `table` (default), `json`, `yaml` — critical for scripting/CI                             |
| Exit codes                                 | `0` success, `1` generic failure; distinct codes only when callers must distinguish types |
| Colour                                     | Auto-detect TTY + respect `NO_COLOR`; `chalk.level` for downgrade                         |

```ts
if (process.env.NO_COLOR || !process.stdout.isTTY) chalk.level = 0;
```

---

## 7. Errors & Exit Codes

- **Throw/`program.error()` from the action** and let Commander set the exit code — **`use `process.exitCode = N` at the top level for flush before exit**:

```ts
program.exitOverride(); // for tests: throws instead of exiting
try {
  await program.parseAsync();
} catch (err) {
  if (err instanceof commander.CommanderError) throw err; // argparse handled by framework
  console.error(formatError(err)); // runtime failure → stderr + exit 1
  process.exitCode = 1;
}
```

- **Make errors actionable**: state what went wrong and how to fix it (`"config file not found at ~/.app/config.yaml — run 'app init' first"`), not just `"error: not found"`.
- **`.exitOverride()` + a testable `run(argv)`** — keep the process-switching parts (`program.parse()`) out of the business logic so tests can call `run([...])` in-process.
- **Never swallow errors in `catch {}`** — log with the cause; let unexpected failures fail loudly with a meaningful stack.

---

## 8. Progress & Feedback

- Any operation >300ms: show a spinner (`ora`) — a silently hanging CLI reads as broken.
- Long-running commands should support `--quiet` to suppress progress output when scripted.
- Confirm destructive actions interactively unless `--force`/`--yes` is passed — anything that deletes or overwrites deserves it.
- Bail gracefully on `SIGINT` (cleaning the spinner) rather than letting Ctrl-C leave a mangled terminal.

---

## 9. Shell Completion & Docs

- Commander itself doesn't generate completions; wire a completion command that emits for your shell (e.g. via a library or a generated script) so `app completion zsh` works like users expect from mature CLIs.
- Ship `--version` and keep docs in sync with help output (generate a `docs/cli.md` from the command tree in CI if distributing widely).

---

## 10. Testing

- **Test the `run(argv)` entrypoint, not the internals** — spawn via `execFile`/`execa` _or_ call the parsed action in-process with `.exitOverride()`; assert on exit code, `stdout`, and `stderr`:

```ts
const { stdout, stderr, exitCode } = await run(['get', 'api.endpoint']);
expect(stdout).toContain('value');
```

- **Test error paths** — assert actionable message on `stderr` and the correct nonzero exit code for known failures.
- **Parameterize the case table** for output formats and flag combinations (`@parametrize`/a `forEach` of cases).

---

## 11. General Rules of Thumb

- **Consistency beats cleverness** — match `git`/`kubectl`/`docker` conventions; users transfer muscle memory across CLIs.
- **Positional for the subject, flags for options** — never require a flag where a positional is natural, and vice versa.
- **Idempotent by default where possible** — re-running a command shouldn't error just because the desired state already exists.
- **Structured `--output json` everywhere** — the fastest way to make a CLI scriptable is deterministic machine-readable output.

---

## Quick-Start Checklist

- [ ] Consistent noun-verb/verb-noun tree; shallow nesting
- [ ] Every command has a one-line `.description()` and help example text
- [ ] `kebab-case` long options; shorthands reserved for frequent flags
- [ ] `--output`/`-o` supporting at least `table` and `json`
- [ ] Errors to stderr, human output to stdout
- [ ] Colour respects TTY detection and `NO_COLOR`
- [ ] `run(argv)` testable entrypoint alongside a thin `program.parse()` main
- [ ] Runtime errors actionable; expected error handling via explicit catch
- [ ] Spinner/progress for >300ms operations; `--quiet` support
- [ ] Destructive commands require confirmation or `--force`
- [ ] `--version` present; shell-completion command wired
