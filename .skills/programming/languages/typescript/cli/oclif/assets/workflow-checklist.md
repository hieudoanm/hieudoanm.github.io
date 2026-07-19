# oclif CLI Design Best Practices: Workflow Checklist

A practical run sheet for applying [oclif CLI Design Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Setup & Structure: **One command per file in src/commands/**; directory nesting becomes topics (src/commands/config/get.ts → app config get)
- [ ] 1. Setup & Structure: **Keep main/bin thin** — oclif wires the runner; business logic lives in the Command and services it calls
- [ ] 2. The Command Class: **description = one imperative line; summary = short list-line; examples = real, runnable commands.** All three surface in help
- [ ] 2. The Command Class: **run() reads args/flags** from this.parse(Command) — typed, validated, and documented from the static declarations; keep it short (delegate to services)
- [ ] 3. Args & Flags: **kebab-case long flags, shorthand only for frequent ones** — document the -o/-p shorthand mapping once so it reads the same across the whole CLI
- [ ] 3. Args & Flags: **Relationship flags** (Flags.relationship) declare mutually exclusive of/exactly one of constraints declaratively instead of a wall of runtime checks
- [ ] 4. Topics & Help: **Nesting topics via directory layout** (src/commands/config/*.ts) — oclif derives app config, app config get, etc. and generates topic help automatically
- [ ] 4. Topics & Help: **static topic/summary on grouping commands** so app config --help lists its children meaningfully
- [ ] 6. Errors & Exit Codes: **this.error(msg, { exit: 2 }) / this.warn** are the _only_ ways to signal failures in a command — they print to stderr, set the exit code, and flush properly:
- [ ] 6. Errors & Exit Codes: **this.catch(err)** overrides the default error path for translating exceptions into actionable messages (never rethrow a raw TypeError as a command failure if you can explain it)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
