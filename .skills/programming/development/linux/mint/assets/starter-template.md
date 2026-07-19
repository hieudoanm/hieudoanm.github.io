# Linux Mint Best Practices: Starter Template

A reusable starting point derived from the **2. Updates: Use the Update Manager** section of [Linux Mint Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```bash
# Safe, repeatable refresh outside the GUI
sudo apt update
apt list --upgradable        # read this before deciding
sudo mintupgrade check       # is a new release available? (does not upgrade)
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
