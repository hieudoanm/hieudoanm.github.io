# Review checklist

Focused reference for **yargs-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
