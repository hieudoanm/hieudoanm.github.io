# Review checklist

Focused reference for **clap-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

- Any operation >300ms: use `indicatif::ProgressBar` (determinate) or a spinner (indeterminate) — silent hangs read as broken.
- Respect `--quiet` to suppress progress bars in scripted/CI contexts (check `!std::io::stdout().is_terminal()` too).
- Confirm destructive actions interactively (e.g. via `dialoguer::Confirm`) unless `--force`/`--yes` is passed.

---

## 8. Shell Completion & Docs

- Generate completions via `clap_complete::generate()` for bash/zsh/fish/powershell — wire this up as a hidden `app completion <shell>` subcommand; expected from any modern Rust CLI.
- Consider `clap_mangen` to generate man pages from the same `Command` definition, keeping `--help` and man pages in sync automatically.

---

## 9. General Rules of Thumb

- **Consistency beats cleverness** — match conventions from `cargo`, `git`, `kubectl` where applicable; users transfer muscle memory.
- **Prefer `value_enum` over free-string validation** wherever the set of valid values is known ahead of time — better help text and error messages for free.
- **Version flag always present** — `#[command(version)]` on the derive struct pulls from `Cargo.toml` automatically, don't hardcode it separately.
- **Idempotent by default** where possible — re-running shouldn't error just because desired state already exists.

---

## Quick-Start Checklist

- [ ] Consistent noun-verb or verb-noun structure across the whole tree
- [ ] Doc comments on every command/subcommand (become help text)
- [ ] `after_help` examples added for non-trivial commands
- [ ] Constrained choices use `value_enum`, not free strings
- [ ] `--output`/`-o` supports at least `table` and `json`
- [ ] Errors go to stderr via `eprintln!`, human output to stdout
- [ ] Color via `anstream`/`anstyle`, respecting `NO_COLOR` and TTY detection
- [ ] `anyhow::Result` + `.context()` used for error propagation
- [ ] Destructive commands require confirmation or `--force`
- [ ] Shell completion wired up via `clap_complete`
- [ ] `#[command(version)]` present
