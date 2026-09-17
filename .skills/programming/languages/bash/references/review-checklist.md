# Review checklist

Focused reference for **bash-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
