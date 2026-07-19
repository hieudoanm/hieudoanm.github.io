# Renovate: Starter Template

A reusable starting point derived from the **2. Grouping: The Main Lever** section of [Renovate](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
