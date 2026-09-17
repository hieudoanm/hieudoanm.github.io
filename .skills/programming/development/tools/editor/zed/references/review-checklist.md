# Review checklist

Focused reference for **zed-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Not if you need a large VS Code extension that has no Zed equivalent** — the extension ecosystem is genuinely smaller, and a missing debugger or framework integration is not a workaround.
- **Not for a team standardised on VS Code or JetBrains,** unless the team agrees to commit the settings. A split toolchain is a support cost.
- **Not on Windows** if the build is not available there; confirm platform support before standardising.

---

## General Rules of Thumb

- Open the repository as a Zed project so `.zed/settings.json` applies; commit that file.
- Formatter and linter named in the project config, matching CI; no second formatter.
- Language servers chosen from the project's own toolchain, not Zed's bundled defaults.
- Start from default key bindings; commit `keymap.json` if you change them.
- Performance problems are usually an extension — bisect before blaming the editor.
- Destructive git operations belong in the terminal, typed deliberately.

---

## Quick-Start Checklist

- [ ] Repository opened as a Zed project, not a raw folder
- [ ] `.zed/settings.json` committed with formatter, linter, and per-language rules
- [ ] `format_on_save` enabled and naming the repo's formatter
- [ ] Exactly one formatter and one linter active per language
- [ ] `typescript.tsdk` / `rust-analyzer` / `pyright` pointed at the project's toolchain
- [ ] `tsc --noEmit` (or the language equivalent) run in CI as the authority
- [ ] `keymap.json` committed if key bindings are customised
- [ ] Extensions audited for duplicate formatter/linter roles
- [ ] `file_types` configured for JSONC and other variants the repo uses
- [ ] Destructive git operations done in the terminal, not via the GUI
