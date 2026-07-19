# Makefile Best Practices: Starter Template

A reusable starting point derived from the **5. Common Patterns** section of [Makefile Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```makefile
ifeq ($(OS),Windows_NT)
    SHELL := cmd.exe
    RM := del /f
else
    RM := rm -rf
endif
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
