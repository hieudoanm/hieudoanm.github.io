# Volta Best Practices: Starter Template

A reusable starting point derived from the **4. CI Integration** section of [Volta Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```bash
curl https://get.volta.sh | bash      # then PATH
volta install node@20
volta run --node=20 yarn ci
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
