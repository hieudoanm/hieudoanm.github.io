# Cursor: Workflow Checklist

A practical run sheet for applying [Cursor](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Why a Fork Changes the Rules: **Most of the correctness work in an AI-first editor happens in review, not in the prompt.** The model produces plausible code; your job is deciding whether it is correct. Budget time for that rather than for typing
- [ ] 1. Why a Fork Changes the Rules: **Everything VS Code does, Cursor does,** so the project-level settings discipline from vscode.md applies unchanged — committed settings.json, pinned extensions, tsc --noEmit as the authority
- [ ] 2. Rules Files: **Put the project's conventions in a rules file, not in the prompt.** The rules file is committed, versioned, and applied to every agent invocation; a prompt is neither
- [ ] 2. Rules Files: **Be specific and prescriptive.** "Use existing patterns" produces invented patterns; "components live in src/components/atoms, organisms, templates; a new one goes in the layer it matches" produces a correct location
- [ ] 3. Agent Mode Boundaries: **Scope a task before you start it.** A precise, bounded request ("add a pure function and its tests to utils.ts, do not change the component") produces a reviewable diff; a broad one produces a rewrite
- [ ] 3. Agent Mode Boundaries: **Ask for a plan first on anything non-trivial,** and reject the plan before code is written if the approach is wrong. A wrong plan implemented competently is still wrong
- [ ] 4. Reviewing AI Diffs: **Read the diff as code review, not as a summary.** The question is never "does this look right" but "what did it miss" — the dropped error branch, the unhandled promise, the changed default
- [ ] 4. Reviewing AI Diffs: **Check what is *not* in the diff.** The most common defect is an omission, which a diff review is naturally bad at noticing. Ask: which test would fail if this were wrong, and does one exist?
- [ ] 5. Privacy & Indexing: **Decide what Cursor indexes and what it sends.** An editor that reads your repository and calls a hosted model is a data-flow decision, and for a proprietary codebase it is a governance decision, not a preference
- [ ] 5. Privacy & Indexing: **Do not paste secrets, keys, customer data, or private source into chat** — the prompt is not a trusted channel just because the model is good

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
