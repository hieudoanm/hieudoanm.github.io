# Commander.js CLI Design Best Practices: Workflow Checklist

A practical run sheet for applying [Commander.js CLI Design Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: commander — command tree, options, help/usage generation
- [ ] 1. Core Stack: chalk or picocolors — colored terminal output (auto-detect TTY)
- [ ] 2. Command Structure: **Noun-verb or verb-noun, pick one and stay consistent** — app config get or app get config, never both in one tree
- [ ] 2. Command Structure: **Keep the tree shallow** — 2 levels of commands is usually enough; a 3rd only for a genuinely complex domain
- [ ] 3. Arguments: **Do validation in the argument validator or the action handler**, not by mutating globals — a parse-time failure gives a clean usage error instead of an opaque crash
- [ ] 3. Arguments: **Prefer .option() with requiredOption for flags that must be present** over manually checking undefined
- [ ] 4. Options (Flags): **Don't reuse a shorthand letter with different meanings across sibling commands** — -o should mean "output" everywhere
- [ ] 5. Help Text: .description() — one imperative line, no trailing period ("Get a configuration value", not "This command gets...")
- [ ] 5. Help Text: .usage("<cmd> [options]") for the synopsis; .helpOption() keeps the default --help
- [ ] 7. Errors & Exit Codes: **Throw/program.error() from the action** and let Commander set the exit code — **use process.exitCode = N` at the top level for flush before exit**:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
