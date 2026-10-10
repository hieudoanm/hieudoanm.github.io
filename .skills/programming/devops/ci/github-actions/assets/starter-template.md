# GitHub Actions Best Practices: Starter Template

A reusable starting point derived from the **3. Workflow Triggers** section of [GitHub Actions Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```yaml
on:
  push:
    branches: [main, develop]
    tags:
      - 'v*'
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]
  schedule:
    - cron: '0 0 * * 0'
    - workflow_dispatch:
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
