# Workflow notes

Focused reference for **renovate-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
