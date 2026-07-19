# Debian Best Practices: Starter Template

A reusable starting point derived from the **2. Packages: apt vs dpkg** section of [Debian Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```bash
# Minimal, reproducible install
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y --no-install-recommends ca-certificates curl git
apt-get clean && rm -rf /var/lib/apt/lists/*
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
