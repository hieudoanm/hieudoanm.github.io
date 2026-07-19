# Workflow notes

Focused reference for **antigravity-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
