---
name: bash-best-practices
description: Best practices for writing Bash/Shell scripts — the conventions for shell automation, CI scripting, and CLI tooling on POSIX systems. Use when writing, structuring, or reviewing Bash — covers script safety, quoting, conditionals, functions, data handling, error cleanup, and linting.
---

# Bash Best Practices

Bash is the language of the dev script: small, powerful, and quiet until it bites. Practical Bash leans on **a strict error contract (`set -euo pipefail`), defensive quoting on every expansion, and cleanup guaranteed via `trap`**. The shell doesn't warn, so the discipline is written into the first three lines of the file and enforced with `shellcheck` in CI, not by memory.

---

## 1. Script Safety Contract

- **Start every script with `set -euo pipefail`** — exit on error, fail on undefined variables, propagate pipeline failures:

```bash
#!/usr/bin/env bash
set -euo pipefail
```

- **`set -e` + `pipefail` make the happy path explicit** — a script that must survive partial failures uses `|| true` or a scoped `set +e`, not silent default behavior.
- **`set -u` turns typos into errors** — misspelled variable names fail the script instead of expanding to empty.
- **Put the shebang first and lock the interpreter** (`#!/usr/bin/env bash`, never `/bin/sh` for scripts that use Bash-isms).
- **Commit the exit code contract** — the last executed command decides the status; end with an explicit `exit 0` where clarity matters.

---

## 2. Quoting & Expansion

- **Double-quote every expansion** — `"$var"` and `"${array[@]}"` prevent word splitting and globbing:

```bash
cp "$src" "$dst"
for f in "${files[@]}"; do :; done
```

- **`$@` is for positional parameters, `"$@"` preserves them** — unquoted `$@` is word-split into oblivion.
- **`${var:-default}` for unset-safe defaults**, `${var:=default}` (with side effect) or `${var:?required message}` to fail fast:

```bash
PORT="${PORT:-8080}"
: "${ENV:?ENV must be set (dev|prod)}"
```

- **Prefer `$(...)` over backticks** — nestable and visually unambiguous.
- **Single quotes for literals, double quotes for interpolation** — a password with `$` must be single-quoted; a path with spaces must be double-quoted.

---

## 3. Conditionals & Tests

- **Prefer `[[ ]]` over `[ ]`** — safer word handling, pattern matching, no word-splitting surprises:

```bash
if [[ -n "${var:-}" ]] && [[ "${mode}" == "fast" ]]; then
  : # ...
fi
```

- **Use file test operators for existence before operations** — `[[ -e ]]`, `[[ -f ]]`, `[[ -d ]]`, `[[ -x ]]`, `[[ -r ]]`.
- **`(( ))` for arithmetic comparisons**, not `-gt`/`-lt` litter; `if (( count > 0 ))`.
- **`case` over `elif` chains for dispatch on a closed set**:

```bash
case "$cmd" in
  build|test) run_ci ;;
  dev)        run_dev ;;
  *)          usage;;
esac
```

- **Test the exit status directly** — `if grep -q pattern file; then` not `if [ "$(grep ...)" = ... ]`.

---

## 4. Functions & Scope

- **Declare functions before use**, `local` every variable inside a function — leaked state is the classic multi-function bug:

```bash
log() { local level="$1"; printf '%s: %s\n' "$level" "$2"; }
```

- **Functions return via `echo` and signal failure via the exit code** — capture with `$(...)`, check with `||`.
- **Pass parameters explicitly** (`"$1" "${@:2}"`); avoid reading globals that a caller can't see in the call site.
- **Keep functions small and single-purpose** — a function over ~30 lines or with many responsibilities is a script in hiding.
- **Name functions as verbs** (`ensure_dir`, `require_cmd`, `cleanup`) — the call site reads as prose.

---

## 5. Files, Streams & Data

- **`mapfile`/`readarray` reads files into arrays without subshell pitfalls**:

```bash
mapfile -t lines < list.txt
```

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

- **`bash -n` for syntax checks** in the fast pre-commit path.
- **`shfmt` for consistent formatting** where the team agrees on style.
- **Keep scripts where the build can lint them** (`.scripts/`, `scripts/`) and referenced by convention, not scattered ad hoc.

---

## 9. Testing

- **Test scripted logic by function, not by running the whole file** — source the functions file in a test:

```bash
# test_lib.sh
source ./lib.sh
assert_eq "$(slugify "Hello World!")" "hello-world"
```

- **Table-driven cases**: input × expected rows iterated with `t.Run`-style naming and a failing row message.
- **Test failure paths** — missing input files, unset vars, non-zero exits, empty input.
- **Run the suite under `set -euo pipefail` + `shellcheck`** — a script that errors early in tests will error early in prod.

---

## General Rules of Thumb

- **The first three lines are the safety contract** — `set -euo pipefail` is non-negotiable.
- **Quote everything that expands** — unquoted expansions are the classic injection/typo bug.
- **Cleanup lives in `trap`** — one guaranteed exit path, never scattered returns.
- **Functions are the only scope boundary** — `local` everything, pass everything.
- **`printf` over `echo`, `mapfile`/`read -r` over `cat` loops, globs over `ls` parsing.**
- **`shellcheck` + `bash -n` are part of "done"** — the shell doesn't warn, the linter does.

---

## Quick-Start Checklist

- [ ] `set -euo pipefail` first; `#!/usr/bin/env bash` shebang
- [ ] All expansions double-quoted; `${var:-default}` and `${var:?}` used consciously
- [ ] `[[ ]]` conditionals; `case` for closed dispatch sets
- [ ] `local` in every function; deps (`require_cmd`) checked up front
- [ ] `mapfile`/`while IFS= read -r` for file/line data; `printf` over `echo`
- [ ] `trap cleanup EXIT ERR INT TERM` for teardown and failures
- [ ] `cd "$dir" || exit 1`; guarded `rm -rf --`; `mktemp` for tempfiles
- [ ] No `ls` parsing; no unquoted `$@`; correct `sh`-vs-bash dialect
- [ ] `shellcheck --severity=style` passing in CI; `bash -n` in pre-commit
- [ ] Table-driven function tests covering success and failure paths
