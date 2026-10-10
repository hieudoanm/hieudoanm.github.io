# Workflow notes

Focused reference for **bash-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
