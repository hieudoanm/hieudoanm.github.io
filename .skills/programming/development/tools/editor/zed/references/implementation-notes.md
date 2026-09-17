# Implementation notes

Focused reference for **zed-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
