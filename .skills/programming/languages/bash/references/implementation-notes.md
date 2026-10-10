# Implementation notes

Focused reference for **bash-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`while IFS= read -r line` for line parsing** — `-r` prevents backslash mangling; `IFS=` preserves leading/trailing whitespace.
- **Prefer `printf` over `echo`** — consistent across platforms and flags; `echo -e` is a portability trap.
- **`sed`/`awk` for text transforms, never loops over `cat`** — pipelines compose where loops obscure.
- **Named tempfiles with `mktemp`** and cleanup via `trap` — never guess a path in `/tmp`.

---

## 6. Error Handling & Cleanup

- **`trap` for guaranteed teardown** — the exit path is one place to look, not scattered at every return:

```bash
cleanup() { rm -rf "$TMPDIR"; }
trap cleanup EXIT
TMPDIR="$(mktemp -d)"
```

- **`trap ... ERR` and `trap ... INT TERM HUP`** for failure and signal handling; keep both wired when cleanup matters.
- **`set +e`/`set -e` scoping for acceptable failures** — contain the exception, don't disable the contract file-wide:

```bash
set +e
out=$(command_that_may_fail 2>&1); rc=$?
set -e
```

- **Check the tools you depend on exist up front** — `require_cmd git jq` fails fast with a clear message instead of mid-script.
- **Every `rm -rf`/`rm` is guarded** — `rm -rf -- "$dir"` (with `--` and initialized vars); never `rm -rf "$UNSET_VAR/"`.

---

## 7. Portability

- **Keep one Bash version in mind** — Bash 4+ (`[[ ]]`, `mapfile`, `{1..n}`); document it if you need `bash`-specific behavior.
- **POSIX `sh` scripts are a different dialect** — don't mix; if you target `/bin/sh`, skip `[[ ]]`/arrays/`mapfile`.
- **`cd` guards**: `cd "$dir" || exit 1` — an unguarded `cd` on a missing dir silently runs in the wrong place.
- **Never parse `ls` output** — globs and `mapfile` handle file names, including the hostile and the spaced.
- **Command paths**: rely on `PATH`; call `command -v`, never hardcode `/usr/bin/`-style prefixes.

---

## 8. Tooling & CI

- **`shellcheck` as a lint gate** — run in CI with `--severity=style` and treat warnings as review blockers:

```bash
shellcheck --severity=style scripts/*.sh
```
