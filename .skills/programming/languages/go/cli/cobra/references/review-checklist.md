# Review checklist

Focused reference for **cobra-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 8. Shell Completion & Docs

- Cobra generates shell completion for free — wire up `app completion bash|zsh|fish|powershell` via `cobra.Command{}` completion generation; users expect this from mature CLIs.
- Generate man pages / markdown docs via `cobra/doc` package if distributing widely — keeps `--help` and external docs in sync.

---

## 9. General Rules of Thumb

- **Consistency beats cleverness** — match `git`/`kubectl`/`docker` conventions unless you have a strong reason not to; users transfer muscle memory across CLIs.
- **Never require a flag that could be a positional arg**, and vice versa — positional for the "main subject" (`app get <key>`), flags for options/modifiers.
- **Version flag always present** (`app --version` or `app version` subcommand).
- **Idempotent by default** where possible — re-running a command shouldn't error just because the desired state already exists.

---

## Quick-Start Checklist

- [ ] Consistent noun-verb or verb-noun structure across the whole tree
- [ ] Every command has `Short`, `Long`, and a filled-in `Example`
- [ ] Flags use `kebab-case`; shorthands reserved for genuinely frequent flags
- [ ] `--output`/`-o` supports at least `table` and `json`
- [ ] Errors go to stderr, human output to stdout
- [ ] Color respects TTY detection and `NO_COLOR`
- [ ] `RunE` used everywhere instead of manual `os.Exit`
- [ ] Destructive commands require confirmation or `--force`
- [ ] Shell completion wired up
- [ ] `--version` available
