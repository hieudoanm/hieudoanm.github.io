# Yargs CLI Design Best Practices: Workflow Checklist

A practical run sheet for applying [Yargs CLI Design Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: yargs — parser, command tree, help/usage, completion
- [ ] 1. Core Stack: chalk / picocolors — colours with TTY auto-detection
- [ ] 2. Command Structure: **Declare commands as modules** (command, describe, builder, handler) — self-contained, testable, and colocated with their options:
- [ ] 2. Command Structure: **Noun-verb or verb-noun, consistent app-wide**; shallow trees (2 levels) with parent grouping (app config get/set/list)
- [ ] 3. Strict Parsing (Non-negotiable): **.strict() everywhere** — unknown options and stray positionals become errors instead of silently dripping into argv as stringly junk
- [ ] 3. Strict Parsing (Non-negotiable): **.demandCommand()** — an app with subcommands shouldn't be a silent no-op at the root
- [ ] 4. Options & Positionals: **choices for closed sets** (output formats) — validation belongs in the declaration, not a manual if in handler
- [ ] 4. Options & Positionals: **Positionals via .positional("key", {...})** in builder — declared, typed, and shown in usage/help
- [ ] 5. Validation: **.check((argv) => ...)** for cross-field invariants that declarations can't express (--format json requires --output file); throw from inside to produce a usage error
- [ ] 5. Validation: **.demandOption()** in builder declarations ({ demandOption: true }) vs. manually checking !argv.key

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
