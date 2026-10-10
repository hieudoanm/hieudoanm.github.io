# Overview

Focused reference for **vscode-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# VS Code

VS Code is the most widely used editor and the weakest default configuration in most repositories. Out of the box it is fast, extensible, and quietly opinion-free: **nothing about the project is enforced, and every developer's setup differs**. Practical VS Code work is about **committing the settings that define the project, keeping the extension set small, and making the editor's diagnostics the same checks CI runs**. Runtime and build conventions still live in the language skills; this file is about the editor.

_Verified against VS Code 1.10x (September 2026) with the built-in TypeScript server, ESLint 9 flat config, and Prettier 3. Neovim and Zed are covered in neovim.md and zed.md; AI-first forks in cursor.md and antigravity.md._

---

## 1. Settings: Three Scopes

- **Three scopes, and the difference matters.** User settings live in your profile; workspace settings in `.vscode/settings.json` (committed); folder settings per folder. A setting that belongs to the project belongs in workspace settings.
- **`settings.json` supports language-scoped overrides** (`"[typescript]": { "editor.defaultFormatter": ... }`) — prefer these over one global formatter, which then has to be excluded for every other language.
- **Never rely on a user setting for anything a teammate needs.** "I have Prettier on save" is not a project convention; a committed `editor.formatOnSave` scoped to the right language is.
- **`editor.formatOnSave` with `editor.defaultFormatter` must name the same formatter CI uses** (Prettier, not the built-in TS formatter), or every save produces a diff CI then reverts.
- **`files.trimTrailingWhitespace`, `files.insertFinalNewline`, and `files.eol` are cheap to commit** and eliminate a whole class of whitespace-only review noise.

```jsonc
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "[python]": { "editor.defaultFormatter": "ms-python.black-formatter" },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```
