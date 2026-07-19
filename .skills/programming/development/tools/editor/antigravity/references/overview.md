# Overview

Focused reference for **antigravity-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Antigravity

Antigravity is a Google-built, agent-first editor: rather than autocomplete that suggests the next token, it is built around an agent that plans and executes multi-file work inside the editor, with a conventional editor underneath. Its premise is that **the agent is the primary author and you are the reviewer**, which inverts the usual arrangement. Practical Antigravity work is about **bounding what the agent is allowed to do, reviewing its output as code, and keeping the conventional editor and CLI checks as the authority**. VS Code conventions are in vscode.md; the closest other agent-first editor is cursor.md.

_Verified against Antigravity's 2026 releases. The product changes quickly — features, model access, and the exact surface move between releases; the review and boundary practices below are the stable part._

---

## 1. The Agent-First Inversion

- **The default relationship is: the agent writes, you review.** That is the opposite of an autocomplete editor, and the discipline has to be different too — the review is the work, not a final step.
- **Because the agent writes more code per task, the review must be more thorough, not less.** A 300-line change generated in ten seconds is not ten seconds of work; it is a careful read.
- **Keep the conventional editor and the CLI in the loop.** The editor you already know is still there for the precise edit, and the compiler, linter, and tests are unchanged and still authoritative.
- **An agent-first editor is a tool choice, not a repository standard,** unless the team agrees to it deliberately. A mixed toolchain is a support cost; decide once.

---
