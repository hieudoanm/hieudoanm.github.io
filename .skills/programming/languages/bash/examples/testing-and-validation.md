# Bash Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Test scripted logic by function, not by running the whole file** — source the functions file in a test:
- **Table-driven cases**: input × expected rows iterated with `t.Run`-style naming and a failing row message.
- **Test failure paths** — missing input files, unset vars, non-zero exits, empty input.
- **Run the suite under `set -euo pipefail` + `shellcheck`** — a script that errors early in tests will error early in prod.

## Example

```bash
# test_lib.sh
source ./lib.sh
assert_eq "$(slugify "Hello World!")" "hello-world"
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for bash-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
