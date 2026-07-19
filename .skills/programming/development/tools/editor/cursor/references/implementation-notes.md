# Implementation notes

Focused reference for **cursor-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Reviewing AI Diffs

- **Read the diff as code review, not as a summary.** The question is never "does this look right" but "what did it miss" — the dropped error branch, the unhandled promise, the changed default.
- **Check what is *not* in the diff.** The most common defect is an omission, which a diff review is naturally bad at noticing. Ask: which test would fail if this were wrong, and does one exist?
- **Run the checks, always.** `pnpm typecheck` and `pnpm test` catch more AI mistakes than reading does, and they are cheap relative to the cost of a subtle regression.
- **Verify the tests were not weakened to make the change pass.** A deleted assertion or a loosened matcher in an AI diff is a red flag worth stopping the review for.
- **Do not accept a large diff on a small task.** If a one-line change produced 400 lines, the agent misunderstood the scope; ask for it to be redone.

---

## 5. Privacy & Indexing

- **Decide what Cursor indexes and what it sends.** An editor that reads your repository and calls a hosted model is a data-flow decision, and for a proprietary codebase it is a governance decision, not a preference.
- **Do not paste secrets, keys, customer data, or private source into chat** — the prompt is not a trusted channel just because the model is good.
- **Understand what leaves the machine before enabling agent mode on a sensitive repository.** If the answer is unclear, do not enable it; the CLI-based tools in this repo's skills are auditable, an editor integration is not.
- **Check whether an AI extension or integration is already installed** before adding another one that reads source. This is a supply-chain question, not a preference question.

---

## 6. When Not to Use It
