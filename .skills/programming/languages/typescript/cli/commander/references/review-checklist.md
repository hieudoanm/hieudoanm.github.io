# Review checklist

Focused reference for **commander-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
