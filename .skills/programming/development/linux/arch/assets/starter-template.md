# Arch Linux Best Practices: Starter Template

A reusable starting point derived from the **6. Config Files & Drift** section of [Arch Linux Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```bash
sudo pacman -Syu pacman-contrib
find /etc -name '*.pacnew' -o -name '*.pacsave' | sort
sudo pacdiff                       # merge each one deliberately
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
