# Renovate: Workflow Checklist

A practical run sheet for applying [Renovate](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. The Core Distinction: Update Types: **Renovate classifies every update, and the classification drives everything else** — grouping, schedule, automerge, and labels. Get it right and the rest is policy; get it wrong and a major merge becomes routine
- [ ] 1. The Core Distinction: Update Types: **The four levels, and what they mean in practice:**
- [ ] 2. Grouping: The Main Lever: **Grouping is what makes the bot usable.** Ungrouped, a popular monorepo generates hundreds of single-dependency PRs a week; nobody reviews them, so the automation is theatre
- [ ] 2. Grouping: The Main Lever: **Group by package, by ecosystem, or by dependency type** — but keep lockfile-only updates in their own group, because a lockfile bump has no changelog to read and a different risk profile
- [ ] 3. Automerge: The Dangerous Setting: **Automerge is only safe for patch/digest updates that pass required status checks.** Anything else automerges a change nobody read, which is worse than not updating at all
- [ ] 3. Automerge: The Dangerous Setting: **The non-interactive label is the practical mechanism:** a bot PR that needs a human gets the dependencies/needs-human label and stops there
- [ ] 4. Configuration Hygiene: **The config is a reviewable file, so put it in the repository** (renovate.json, .renovaterc.json, or renovate.json5) and let it change through a PR like anything else
- [ ] 4. Configuration Hygiene: **Start from config:recommended** and add rules; a hand-built config misses defaults that matter
- [ ] 5. Lockfiles & Range Strategy: **rangeStrategy decides whether to widen the declared range, and it is a real choice:**
- [ ] 5. Lockfiles & Range Strategy: pin — write the exact version into the manifest. Reproducible, but noisy diffs

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
