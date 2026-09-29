---
name: zed-best-practices
description: Best practices for the Zed editor — language servers and extensions, project settings in Zed, key bindings, collaboration, and formatting matching the repo. Use when configuring or working in Zed.
---

# Zed

Zed is a high-performance native code editor: GPU-rendered, fast on large files, and built around language servers with a small, curated default extension set. Its trade-off against VS Code is deliberate — **fewer extensions and a smaller surface, in exchange for speed and a settings model that is committed as a project file**. Practical Zed work is about **using Zed's own project settings rather than per-user config, keeping the language server as the source of truth for diagnostics, and not reaching for an extension where the CLI does the job**. VS Code conventions are in [vscode.md](./vscode.md); Neovim in [neovim.md](./neovim.md).

_Verified against Zed 1.x (September 2026) on macOS and Linux. Zed is macOS-only in early releases; Linux support has since shipped in stable — confirm the platform support for your build before planning around it._

---

## 1. Project Settings, Not User Settings

- **Zed's canonical project config is `.zed/settings.json`**, committed. It holds languages, linting, formatting, and file-specific rules in one reviewable file.
- **A shared project is opened as a project, not a folder** (File → Open Project), so the `.zed/` directory is picked up. Opening a raw folder leaves your team without the config you wrote.
- **User settings (`~/.config/zed/settings.json`) are your machine's opinion.** Anything the team should share belongs in `.zed/settings.json`; keeping the split clear is the main thing that separates a well-used Zed setup from an inconsistent one.
- **Format-on-save and the formatter come from the project config** and must name the same tool CI runs (Prettier, `gofmt`, `rustfmt`, `black`). Zed's built-in formatter is a fallback, not a replacement.
- **`language_servers` is where the diagnostics authority is chosen.** Disabling a language server to silence a noisy diagnostic hides a real problem; fix the underlying config instead.

```json
{
  "$schema": "https://zed.dev/schema/settings.json",
  "formatter": { "language_server": { "typescript": "prettier" } },
  "linter": { "format_on_save": true, "eslint": { "with_ignore_path": true } },
  "languages": {
    "TypeScript": {
      "tab_size": 2,
      "typescript": { "tsdk": "node_modules/typescript/lib" }
    }
  },
  "file_types": { "JSONC": "jsonc" }
}
```

---

## 2. Extensions & Language Servers

- **Prefer the language's own tool over an editor extension,** for the same reason as in VS Code: the CLI is what CI runs, so it is the authority.
- **Zed's extension set is intentionally small; resist adding several for one job.** Two formatters or two linters for the same language will fight, and the winner depends on load order.
- **For a polyglot repo, the right server per language is the project's own:** `typescript-language-server` from `node_modules`, `rust-analyzer` from the toolchain, `pyright` for Python. Zed's bundled servers are convenient and can lag the version the build uses.
- **Zed's extension API and available extensions change quickly**; check the current extension list rather than assuming a feature exists.
- **Settings for a specific language belong under `languages.<Language>`** in the project settings, not in a global formatter rule that then has to be excluded.

---

## 3. Key Bindings

- **Zed's defaults are opinionated and good; the mistake is remapping piecemeal** until nobody can predict a shortcut. Start from default, and change only what genuinely conflicts with your muscle memory.
- **Keep a `keymap.json` if you do customise,** and commit it, so the team is not debugging each other's shortcuts.
- **Learn the search-and-multiple-cursors model early** (`cmd-p` file search, `cmd-shift-p` command palette, `x`/`shift-x` on selection). It is the main reason Zed feels fast, and skipping it leaves a lot of speed unused.
- **A key binding that shadows a shell or terminal habit is a trap** — check the one you most expect before assuming Zed is broken.

---

## 4. Performance

- **Zed is fast on large files by design; the usual cause of a slowdown is an extension, not the editor.** Disable extensions one at a time to find it rather than assuming the project is too big.
- **Project-scoped syntax trees and language servers do real work on open**; a very large monorepo benefits from opening the root once rather than several nested projects.
- **Zed's `language_server` diagnostics for a file you are not editing can be deferred** by the server itself; a slow language server is a server problem, not a Zed one.

---

## 5. Collaboration & Git

- **Zed has a built-in collaborative editing mode** over its own transport — good for pairing on a file, not a substitute for reviewing a branch.
- **The Git integration is a convenience, not a replacement for the CLI.** For anything that will end up in history — rebases, history surgery, a bisect — use the terminal, where the operations are explicit and reviewable.
- **Branch and conflict state is shared with the CLI** (same repository), so nothing in Zed is exclusive; the only rule is that a destructive git operation should be typed deliberately, not clicked.

---

## 6. When Zed Is the Wrong Tool

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
