# Bash Best Practices: 1. Script Safety Contract

## Source guidance

This example applies the **1. Script Safety Contract** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Start every script with `set -euo pipefail`** — exit on error, fail on undefined variables, propagate pipeline failures:
- **`set -e` + `pipefail` make the happy path explicit** — a script that must survive partial failures uses `|| true` or a scoped `set +e`, not silent default behavior.
- **`set -u` turns typos into errors** — misspelled variable names fail the script instead of expanding to empty.
- **Put the shebang first and lock the interpreter** (`#!/usr/bin/env bash`, never `/bin/sh` for scripts that use Bash-isms).

## Example

```bash
#!/usr/bin/env bash
set -euo pipefail
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for bash-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
