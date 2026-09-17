# Renovate: Basic Usage

Best practices for Renovate — configuration, grouping, lockfile maintenance, automerge policy, and the separation between update cadence and release risk. Use when setting up, or reviewing, dependency update automation.

## Scenario

Use this example as a starting point when applying **renovate-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Grouping: The Main Lever** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
