# Overview

Focused reference for **bash-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
