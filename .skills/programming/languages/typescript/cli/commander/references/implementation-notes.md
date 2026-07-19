# Implementation notes

Focused reference for **commander-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
