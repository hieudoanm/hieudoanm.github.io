---
name: "renovate-best-practices"
description: "Best practices for Renovate — configuration, grouping, lockfile maintenance, automerge policy, and the separation between update cadence and release risk. Use when setting up, or reviewing, dependency update automation."
tags:
  - "programming"
  - "development"
  - "developer-tools"
  - "renovate"
when_to_use: "Use when setting up, or reviewing, dependency update automation."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../snyk/SKILL.md"
  - "../editor/antigravity/SKILL.md"
  - "../editor/cursor/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
# Renovate

Renovate is a dependency-update bot that opens pull requests across every ecosystem, and its real value is not the updates themselves — plenty of bots do that — but **the policy you encode about which updates group together, which merge automatically, and when a major is acceptable**. A Renovate config is a statement of your team's risk posture. Practical Renovate work is about **separating low-risk from high-risk updates so the safe ones stop costing attention, keeping the bot's own config reviewable, and never letting an automerge hide a breaking change**. Security scanning is complementary; see [snyk.md](../snyk/SKILL.md).

_Verified against Renovate's 2026 releases. The configuration schema evolves; validate against the current JSON schema after editing._

---

## 1. The Core Distinction: Update Types

- **Renovate classifies every update, and the classification drives everything else** — grouping, schedule, automerge, and labels. Get it right and the rest is policy; get it wrong and a major merge becomes routine.
- **The four levels, and what they mean in practice:**
  - `digest` — a rebuilt image or pinned commit moved. Usually behaviour-identical; the safest class.
  - `patch` — bug fixes, no API change. Usually safe to merge unattended, once tests pass.
  - `minor` — additive changes, new features. Usually safe, but watch for a tool that changes defaults in a minor.
  - `major` — breaking changes. Never automerge; this is a human reading a changelog.
- **Severity is a security attribute, not a change-size attribute.** Renovate's vulnerability alerts carry a severity from the advisory, and they are handled separately from routine updates.
- **A tool that changes a default in a minor is a real category failure** — the only defence is requiring tests to actually cover the behaviour that changed.

---

## 2. Grouping: The Main Lever

- **Grouping is what makes the bot usable.** Ungrouped, a popular monorepo generates hundreds of single-dependency PRs a week; nobody reviews them, so the automation is theatre.
- **Group by package, by ecosystem, or by dependency type** — but keep lockfile-only updates in their own group, because a lockfile bump has no changelog to read and a different risk profile.
- **`groupName` and `branchName` control both the PR title and the branch,** and a consistent, sortable branch prefix (`renovate/`) makes the history readable and the branch easy to delete.
- **Do not over-group.** A group of 30 packages is unreviewable even at the patch level; aim for groups a reviewer can scan in a minute.
- **Separate "everything for this major" from "patch updates"** — a major group should contain only what is required to reach that major, not everything that happened to move in the same window.

```json5
{
  $schema: 'https://docs.renovatebot.com/renovate-schema.json',
  extends: ['config:recommended', ':dependencyDashboard', ':semanticCommits'],
  rangeStrategy: 'bump',
  separateMajorMinor: true,
  separateMinorPatch: true,
  packageRules: [
    {
      description: 'Group all patch updates for npm packages',
      matchManagers: ['npm'],
      matchUpdateTypes: ['patch'],
      groupName: 'npm patches',
    },
    {
      description: 'Monorepo libraries move together',
      matchPackageNames: ['@scope/*'],
      groupName: 'scope libraries',
    },
    {
      description: 'Hold back majors for the app, not the tooling',
      matchPackageNames: ['react', 'next', 'typescript'],
      matchUpdateTypes: ['major'],
      automerge: false,
      labels: ['major/app'],
    }
  ]
}
```

---

## 3. Automerge: The Dangerous Setting

- **Automerge is only safe for `patch`/`digest` updates that pass required status checks.** Anything else automerges a change nobody read, which is worse than not updating at all.
- **The non-interactive label is the practical mechanism:** a bot PR that needs a human gets the `dependencies/needs-human` label and stops there.
- **Require status checks to pass, always.** An automerge that can fire on a red build is a broken policy, not a fast one.
- **Set `minimumReleaseAge` to hold a newly published version for a few days.** This single setting removes most of the supply-chain risk: a malicious version published on Friday does not reach your main on Friday.
- **Disable automerge for a package that has surprised you before.** A `packageRules` entry pinning one dependency to manual is cheap and permanent.
- **Automerge a `minor` for a tool you depend on heavily, and you will learn why not to** — the safe class is `patch` and `digest` only.

---

## 4. Configuration Hygiene

- **The config is a reviewable file, so put it in the repository** (`renovate.json`, `.renovaterc.json`, or `renovate.json5`) and let it change through a PR like anything else.
- **Start from `config:recommended`** and add rules; a hand-built config misses defaults that matter.
- **Use the Dependency Dashboard** (`:dependencyDashboard`) so pending updates are visible instead of silently queued.
- **Pin the bot's own version** if the platform allows it, so a bot change does not alter the policy without review.
- **Validate the schema after every edit** — Renovate ignores unknown keys silently, and a typo means a rule that does not run.
- **Set `prHourlyLimit` / `prConcurrentLimit`** so a day with many updates does not bury the PR list.

---

## 5. Lockfiles & Range Strategy

- **`rangeStrategy` decides whether to widen the declared range, and it is a real choice:**
  - `pin` — write the exact version into the manifest. Reproducible, but noisy diffs.
  - `bump` — widen the range to the new version. Fewer merge conflicts, the common default.
  - `replace` — leave the range alone, change the lockfile only. Least visible, most confusing in review.
  - `widen` — widen only if needed.
- **Commit lockfiles for applications; be deliberate for libraries.** A library that commits its lockfile pins its consumers to your resolution.
- **A lockfile-only update is not a code change** — group it separately and do not expect a reviewer to read a 2000-line lockfile diff.
- **Digest updates for pinned images are the highest-value, lowest-risk automerge** in most repos, and the first thing to turn on if you start with none.

---

## 6. Operating the Bot

- **Review the diff for a major like any other change** — it is a dependency upgrade, which is a real code change, and the changelog is the spec.
- **When a merge breaks the build, fix the config, not the PR.** A pattern of "revert and Renovate reopens" means the automerge policy is too aggressive for that package.
- **Watch the `major/minor/patch` split in the dashboard** — a sudden flood of majors usually means a new major landed and you should plan it, not absorb 30 PRs.
- **Set the schedule so updates arrive when people are looking** (weekday mornings) rather than at 3 a.m. on a Saturday.
- **Pin versions of the tools Renovate itself depends on** (if self-hosted) with the same rigour as anything else.

---

## General Rules of Thumb

- Update classification drives everything; automerge only `patch`/`digest`.
- Group by package or ecosystem; keep lockfile-only updates in their own group; never over-group.
- `minimumReleaseAge` set — the cheapest supply-chain defence available.
- Required status checks must pass before any automerge; the needs-human label for the rest.
- Config in the repository, starting from `config:recommended`, schema-validated.
- `rangeStrategy: bump` for apps; commit lockfiles for apps, deliberate for libraries.
- Review a major's diff like code; fix the policy when a merge breaks, not the PR.

---

## Quick-Start Checklist

- [ ] Config in the repo (`renovate.json5`), extending `config:recommended`
- [ ] Schema validated after every edit
- [ ] Dependency Dashboard enabled
- [ ] `patch`/`digest` grouped and automerged on green status checks
- [ ] `major` never automerged, grouped only when required for that major
- [ ] `minimumReleaseAge` set (a few days)
- [ ] `prHourlyLimit` / `prConcurrentLimit` set
- [ ] Digest updates for pinned images automerged
- [ ] `rangeStrategy` chosen deliberately; lockfile policy documented
- [ ] Lockfile-only updates grouped separately
- [ ] Packages that have surprised you pinned to manual
- [ ] `semanticCommits` enabled for readable history
- [ ] Bot version pinned where the platform allows
