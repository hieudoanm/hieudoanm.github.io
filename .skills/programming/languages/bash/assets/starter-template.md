# Bash Best Practices: Starter Template

A reusable starting point derived from the **3. Conditionals & Tests** section of [Bash Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```bash
case "$cmd" in
  build|test) run_ci ;;
  dev)        run_dev ;;
  *)          usage;;
esac
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
