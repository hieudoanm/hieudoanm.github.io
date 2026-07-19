---
name: "antigravity-best-practices"
description: "Best practices for the Antigravity editor — agent-first workflow boundaries, reviewing generated diffs, project rules, and when to fall back to a conventional editor. Use when configuring or working with agent-driven editing in Antigravity."
tags:
  - "programming"
  - "development"
  - "developer-tools"
  - "editor"
  - "antigravity"
when_to_use: "Use when configuring or working with agent-driven editing in Antigravity."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../cursor/SKILL.md"
  - "../neovim/SKILL.md"
  - "../vscode/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
# Antigravity

Antigravity is a Google-built, agent-first editor: rather than autocomplete that suggests the next token, it is built around an agent that plans and executes multi-file work inside the editor, with a conventional editor underneath. Its premise is that **the agent is the primary author and you are the reviewer**, which inverts the usual arrangement. Practical Antigravity work is about **bounding what the agent is allowed to do, reviewing its output as code, and keeping the conventional editor and CLI checks as the authority**. VS Code conventions are in [vscode.md](../vscode/SKILL.md); the closest other agent-first editor is [cursor.md](../cursor/SKILL.md).

_Verified against Antigravity's 2026 releases. The product changes quickly — features, model access, and the exact surface move between releases; the review and boundary practices below are the stable part._

---

## 1. The Agent-First Inversion

- **The default relationship is: the agent writes, you review.** That is the opposite of an autocomplete editor, and the discipline has to be different too — the review is the work, not a final step.
- **Because the agent writes more code per task, the review must be more thorough, not less.** A 300-line change generated in ten seconds is not ten seconds of work; it is a careful read.
- **Keep the conventional editor and the CLI in the loop.** The editor you already know is still there for the precise edit, and the compiler, linter, and tests are unchanged and still authoritative.
- **An agent-first editor is a tool choice, not a repository standard,** unless the team agrees to it deliberately. A mixed toolchain is a support cost; decide once.

---

## 2. Bounding the Agent

- **Give the agent a bounded task with a named outcome and a file scope.** "Add error handling to the fetch layer and test it" produces a reviewable diff; "improve error handling" produces a rewrite.
- **Let it plan before it writes on anything non-trivial,** and reject a wrong plan before code exists. A competently implemented bad plan is still a bad plan.
- **Keep configuration, CI, and dependency manifests manual.** A silently modified lockfile or a loosened lint rule is a supply-chain event, not a convenience.
- **Do not let it run migrations, deploys, or side-effecting commands** without reading the command first.
- **The agent's context is the repository, not your intent.** Anything it needs to know that is not in the repository — a design decision, a constraint, a deadline — has to be said or written down.

---

## 3. Reviewing the Result

- **Read the actual diff in your VCS,** not the agent's summary of what it did. The summary is produced by the same system that made the change and inherits its blind spots.
- **Look for omissions, not errors.** Errors are visible in the diff; the dangerous defect is the dropped branch, the unhandled rejection, the changed default. Ask which test would catch it.
- **Verify the tests still assert something.** A deleted or weakened assertion in a generated diff is a reason to stop and ask why.
- **Run the full check suite — typecheck, lint, tests — every time.** It is cheaper than any review, and it catches what reading does not.
- **Reject a large diff on a small task** as a scope failure, not a stylistic preference.
- **Treat the generated code as a first draft you own.** It becomes your code the moment it is committed, and the next reader has no way to tell it was generated.

---

## 4. Conventions & Rules

- **Encode the project's conventions where the agent will read them** — a committed rules or instructions file, the same discipline as in [cursor.md](../cursor/SKILL.md). Include the build, test, typecheck, and format commands; an agent guessing a test command produces a false green.
- **Be specific.** "Follow existing patterns" is not a rule; "components live in `src/components/atoms`, `organisms`, `templates`; a new one goes in the layer it matches" is.
- **Version the rules like code.** A rule change is a reviewable diff, so a disagreement about an agent rule is settled the way a lint rule is.
- **The project still owns the conventions** — file layout, size limits, dependency policy. The agent is a fast author, not the owner of the architecture.

---

## 5. Privacy & Data

- **Know what the agent reads and what leaves the machine.** An editor that indexes the repository and calls a hosted model is a data-flow decision, and for proprietary code a governance decision.
- **Do not put secrets, keys, customer data, or private source into a prompt.** A good model is not a trusted channel.
- **If the boundary is unclear, do not enable the agent** on a sensitive repository. The CLI tools in this repo's skills are auditable; an editor integration is not.
- **Check what is already installed** before adding another integration that can read source — that is a supply-chain question.

---

## 6. When Not to Use It

- **Not for auth, concurrency, security-critical code, or migrations.** These deserve a human who can explain every line, and these are exactly where a plausible-looking generated diff is most dangerous.
- **Not when nobody will review the diff.** An unreviewed agent change in an unreviewed codebase is a liability.
- **Not in a codebase the team has not yet understood.** The agent will write fluent code that fits no architecture.
- **Prefer the CLI** — `rg`, the test runner, the compiler — for anything they can do. Faster, reproducible, and with an audit trail.

---

## General Rules of Thumb

- The agent writes; you review. Budget the review time, not the typing time.
- Bound every task to a named outcome and a file scope; plan first on anything non-trivial.
- Config, CI, and dependency manifests stay manual.
- Read the real diff in your VCS, never the agent's summary; hunt for omissions.
- Run typecheck, lint, and tests on every generated change; confirm tests were not weakened.
- Conventions live in a committed, versioned rules file that names the commands.
- Know what the agent indexes and sends; keep secrets out of prompts.
- Skip the agent for auth, concurrency, security, and migrations.

---

## Quick-Start Checklist

- [ ] Rules/instructions file committed with build, test, typecheck, and format commands
- [ ] Rules include this repo's structure, size limits, and dependency policy
- [ ] Tasks bounded to a file scope and a named outcome
- [ ] Plan requested and approved before writing on non-trivial work
- [ ] Config, CI, and dependency manifests excluded from agent write access
- [ ] Side-effecting commands (migrate, deploy) reviewed before running
- [ ] Every generated diff reviewed in the VCS
- [ ] Full check suite (typecheck, lint, tests) run on every agent change
- [ ] Tests verified not weakened or deleted
- [ ] Large diff on a small task treated as a scope failure
- [ ] Data boundary understood; no secrets or private source in prompts
- [ ] Team agreement recorded if this becomes the standard editor
