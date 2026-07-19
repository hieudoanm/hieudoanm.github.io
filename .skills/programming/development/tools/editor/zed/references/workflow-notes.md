# Workflow notes

Focused reference for **zed-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
