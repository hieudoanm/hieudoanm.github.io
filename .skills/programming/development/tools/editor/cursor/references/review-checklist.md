# Review checklist

Focused reference for **cursor-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Not for the security-critical path**, the concurrency primitive, the auth check, or the migration. Those deserve a human who can explain every line.
- **Not when you cannot review the diff.** An unreviewed AI change in a codebase nobody is checking is worse than a slightly slower hand-written one.
- **Not for a codebase the team does not yet understand.** An AI will happily write plausible code in an unfamiliar architecture and produce something that fits nothing.
- **Prefer the existing CLI tools** — `rg`, the test runner, the compiler — for anything they can do. They are faster, reproducible, and leave an audit trail.

---

## General Rules of Thumb

- Conventions live in a committed rules file; the prompt is not a durable place for them.
- Bound every agent task to a set of files and an outcome before starting.
- Plan first on non-trivial work; reject a wrong plan before code exists.
- Read the actual diff in your VCS, never the editor's summary of it.
- Run typecheck and tests on every AI change; verify tests were not weakened.
- Treat config, CI, and dependency files as manual-only for the agent.
- Do not send secrets or private source to a hosted model; know what is indexed.
- Skip the agent for auth, concurrency, security, and migrations.

---

## Quick-Start Checklist

- [ ] `.cursor/rules/*.mdc` committed with build/test/typecheck/format commands
- [ ] Rules include this repo's structure, limits, and known AI failure modes
- [ ] Rules scoped by globs rather than applied globally
- [ ] Rule changes go through review like any other convention
- [ ] Non-trivial tasks planned and the plan approved before implementation
- [ ] Agent scope limited to named files per task
- [ ] Auto-apply disabled for config, CI, and dependency manifests
- [ ] Every AI diff reviewed in the VCS, not from the editor summary
- [ ] `pnpm typecheck` and `pnpm test` run on every AI change
- [ ] Tests confirmed not weakened or deleted in the diff
- [ ] No secrets or private source sent to the model; indexing scope understood
- [ ] Project settings still committed per vscode.md
