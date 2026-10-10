# Implementation notes

Focused reference for **antigravity-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Encode the project's conventions where the agent will read them** — a committed rules or instructions file, the same discipline as in cursor.md. Include the build, test, typecheck, and format commands; an agent guessing a test command produces a false green.
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
