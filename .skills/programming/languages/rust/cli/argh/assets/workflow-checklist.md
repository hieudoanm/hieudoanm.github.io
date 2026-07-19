# argh Best Practices: Workflow Checklist

A practical run sheet for applying [argh Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Basic Derive: **FromArgs on a top-level struct then parse:**
- [ ] 1. Basic Derive: **Every field needs either option, switch, positional, or subcommand; default for optional.**
- [ ] 2. Positionals & Switches: **Positionals mapped by order; switches for flags:**
- [ ] 2. Positionals & Switches: **switch only for booleans; use option + default for value-togglable.**
- [ ] 3. Subcommands: **A generated enum through #[argh(subcommand)]:**
- [ ] 3. Subcommands: **Subcommand variant structs carry their own FromArgs-derived fields + docs.**
- [ ] 4. Errors & Exit Codes: **argh::from_env() panics on parse failure with argh's exit — acceptable for lean CLIs:**
- [ ] 4. Errors & Exit Codes: **Graceful exits: map parse errors to stderr + status; keep program errors separate.**
- [ ] 5. Testing & Docs: **Unit-test the parse layer — fixed arg vectors:**
- [ ] 5. Testing & Docs: **Doc comments are the help — review --help output as a contract.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
