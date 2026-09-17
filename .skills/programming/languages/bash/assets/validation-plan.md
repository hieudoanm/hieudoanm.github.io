# Bash Best Practices: Validation Plan

Use this plan to verify work guided by [Bash Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Bash and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Prefer [[ ]] over [ ]** — safer word handling, pattern matching, no word-splitting surprises:
- [ ] **Use file test operators for existence before operations** — [[ -e ]], [[ -f ]], [[ -d ]], [[ -x ]], [[ -r ]]
- [ ] **(( )) for arithmetic comparisons**, not -gt/-lt litter; if (( count > 0 ))
- [ ] **case over elif chains for dispatch on a closed set**:
- [ ] **Test the exit status directly** — if grep -q pattern file; then not if [ "$(grep ...)" = ... ]
- [ ] **Test scripted logic by function, not by running the whole file** — source the functions file in a test:
- [ ] **Table-driven cases**: input × expected rows iterated with t.Run-style naming and a failing row message
- [ ] **Test failure paths** — missing input files, unset vars, non-zero exits, empty input
- [ ] **Run the suite under set -euo pipefail + shellcheck** — a script that errors early in tests will error early in prod

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
