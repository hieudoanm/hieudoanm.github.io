# Overview

Focused reference for **zed-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Zed

Zed is a high-performance native code editor: GPU-rendered, fast on large files, and built around language servers with a small, curated default extension set. Its trade-off against VS Code is deliberate — **fewer extensions and a smaller surface, in exchange for speed and a settings model that is committed as a project file**. Practical Zed work is about **using Zed's own project settings rather than per-user config, keeping the language server as the source of truth for diagnostics, and not reaching for an extension where the CLI does the job**. VS Code conventions are in vscode.md; Neovim in neovim.md.

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
