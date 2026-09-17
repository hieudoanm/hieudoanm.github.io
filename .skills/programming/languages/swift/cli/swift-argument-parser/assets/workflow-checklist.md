# Swift Argument Parser Best Practices: Workflow Checklist

A practical run sheet for applying [Swift Argument Parser Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Entry Point & Command Structure: **@main struct with ParsableCommand** — declare the root entry point without boilerplate main.swift
- [ ] 1. Entry Point & Command Structure: **Keep command structs focused on parsing** — delegate business logic to separate functions or services
- [ ] 2. Arguments & Options: **@Argument for positional parameters** — declares expected input order declaratively
- [ ] 2. Arguments & Options: **@Option for named flags** — @Option(name: .shortAndLong, help: "Output path") var output: String generates -o/--output
- [ ] 3. Validation & Error Handling: **ValidationError for argument validation** — throw ValidationError("ID must be positive") produces user-friendly errors
- [ ] 3. Validation & Error Handling: **requires and conflicts_with** — encode mutual exclusivity and requirements declaratively
- [ ] 4. Shell Completion: **.custom { } for completions** — .custom { ["user1", "user2"] } or .list() generates completions from code
- [ ] 4. Shell Completion: **Generate completions for bash, zsh, fish** — users expect this from mature CLIs

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
