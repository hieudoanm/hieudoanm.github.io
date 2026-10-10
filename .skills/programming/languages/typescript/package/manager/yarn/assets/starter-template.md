# Yarn Best Practices: Starter Template

A reusable starting point derived from the **2. Lockfiles & Install** section of [Yarn Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```bash
yarn install --immutable    # fail on drift (like frozen)
yarn install --check-cache  # verify integrity in CI
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
