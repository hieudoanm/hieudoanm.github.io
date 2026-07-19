# Bash Best Practices: Workflow Checklist

A practical run sheet for applying [Bash Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Script Safety Contract: **Start every script with set -euo pipefail** — exit on error, fail on undefined variables, propagate pipeline failures:
- [ ] 1. Script Safety Contract: **set -e + pipefail make the happy path explicit** — a script that must survive partial failures uses || true or a scoped set +e, not silent default behavior
- [ ] 2. Quoting & Expansion: **Double-quote every expansion** — "$var" and "${array[@]}" prevent word splitting and globbing:
- [ ] 2. Quoting & Expansion: **$@ is for positional parameters, "$@" preserves them** — unquoted $@ is word-split into oblivion
- [ ] 3. Conditionals & Tests: **Prefer [[]] over [ ]** — safer word handling, pattern matching, no word-splitting surprises:
- [ ] 3. Conditionals & Tests: **Use file test operators for existence before operations** — [[-e]], [[-f]], [[-d]], [[-x]], [[-r]]
- [ ] 4. Functions & Scope: **Declare functions before use**, local every variable inside a function — leaked state is the classic multi-function bug:
- [ ] 4. Functions & Scope: **Functions return via echo and signal failure via the exit code** — capture with $(...), check with ||
- [ ] 5. Files, Streams & Data: **mapfile/readarray reads files into arrays without subshell pitfalls**:
- [ ] 5. Files, Streams & Data: **while IFS= read -r line for line parsing** — -r prevents backslash mangling; IFS= preserves leading/trailing whitespace

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
