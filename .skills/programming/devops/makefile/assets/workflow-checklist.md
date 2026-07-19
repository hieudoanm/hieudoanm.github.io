# Makefile Best Practices: Workflow Checklist

A practical run sheet for applying [Makefile Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Structure & Conventions: **.PHONY for non-file targets** — mark targets that don't produce files (e.g., clean, test, install) as .PHONY so Make doesn't skip them if a file with that name exists
- [ ] 1. Structure & Conventions: **Default target first** — the first target in the file is the default when running make bare; document it with a help target
- [ ] 2. Target Naming: **Verbs for actions, nouns for assets** — make build, make test, make clean
- [ ] 2. Target Naming: **Generic target names** — all, clean, test, install, uninstall are idiomatic and expected
- [ ] 3. Variables & Reusability: **Define variables at the top** — CC := gcc, CFLAGS := -Wall -Wextra, BUILD_DIR := build
- [ ] 3. Variables & Reusability: **Use := for simple expansion** — evaluates once at parse time; = is recursive expansion
- [ ] 4. Phony & Helper Targets: **help target** — list all targets with ## comments for documentation:
- [ ] 4. Phony & Helper Targets: **.DELETE_ON_ERROR** — automatically remove partially-built targets on error
- [ ] 5. Common Patterns: **Conditional logic** — use ifeq/ifneq/else/endif for platform- or config-specific behavior
- [ ] 5. Common Patterns: **Recursive make** — use $(MAKE) rather than bare make to propagate flags and variables

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
