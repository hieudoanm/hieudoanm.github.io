# Overview

Focused reference for **cursor-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Cursor

Cursor is a VS Code fork with AI integrated into the editor: inline completion, a chat that can read the project, and an agent mode that plans and applies multi-file changes. Its power is real; its failure mode is also real — **a plausible-looking diff that silently drops an edge case, and an editor whose default behaviour is to write code you did not ask it to write**. Practical Cursor work is about **encoding the project's conventions in a rules file, treating every AI change as unreviewed code, and deciding deliberately what leaves your machine**. Editor settings conventions are in vscode.md.

_Verified against Cursor 1.x (September 2026) on the VS Code 1.1xx base. Pricing and model access change frequently; the rules and review practices below do not._

---

## 1. Why a Fork Changes the Rules

- **Most of the correctness work in an AI-first editor happens in review, not in the prompt.** The model produces plausible code; your job is deciding whether it is correct. Budget time for that rather than for typing.
- **Everything VS Code does, Cursor does,** so the project-level settings discipline from vscode.md applies unchanged — committed `settings.json`, pinned extensions, `tsc --noEmit` as the authority.
- **The AI is good at boilerplate and refactors, and unreliable at invariants.** Trust it with a mechanical change across many files; do not trust it with a boundary condition, a lock/concurrency path, or anything security-relevant.
- **A rule the model does not know about is a rule it will violate.** Conventions that live only in a contributor's head are exactly the ones an AI edit will break.

---
