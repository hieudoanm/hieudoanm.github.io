# Review checklist

Focused reference for **antigravity-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
