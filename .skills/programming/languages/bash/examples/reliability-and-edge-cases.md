# Bash Best Practices: 6. Error Handling & Cleanup

## Source guidance

This example applies the **6. Error Handling & Cleanup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`trap` for guaranteed teardown** — the exit path is one place to look, not scattered at every return:
- **`trap ... ERR` and `trap ... INT TERM HUP`** for failure and signal handling; keep both wired when cleanup matters.
- **`set +e`/`set -e` scoping for acceptable failures** — contain the exception, don't disable the contract file-wide:
- **Check the tools you depend on exist up front** — `require_cmd git jq` fails fast with a clear message instead of mid-script.
- **Every `rm -rf`/`rm` is guarded** — `rm -rf -- "$dir"` (with `--` and initialized vars); never `rm -rf "$UNSET_VAR/"`.

## Example

```bash
cleanup() { rm -rf "$TMPDIR"; }
trap cleanup EXIT
TMPDIR="$(mktemp -d)"
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for bash-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
