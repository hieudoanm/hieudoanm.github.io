# Implementation notes

Focused reference for **yargs-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
