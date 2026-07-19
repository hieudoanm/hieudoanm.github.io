# Argparse Best Practices: Workflow Checklist

A practical run sheet for applying [Argparse Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Parser Layout: **One ArgumentParser per CLI; named constants over magic strings; prog set explicitly:**
- [ ] 1. Parser Layout: **Parse in main and hand the Namespace to typed functions** — never spread args. lookups through deep code:
- [ ] 2. Arguments & Types: **type= callable handles the conversion** (int, float, a function) — parse/validate at the boundary:
- [ ] 2. Arguments & Types: **nargs deliberate**: REMAINDER for pass-through args, * for positionals, count for -v -v
- [ ] 3. Subcommands: **add_subparsers(dest="command", required=True) for command trees** — each sub add_parser(name, help=...) owns its args:
- [ ] 3. Subcommands: **Dispatch via a dict/match in main**, never buried if ladders:
- [ ] 4. Help & UX: **Every argument carries a help= string** — the user-facing help IS the spec:
- [ ] 4. Help & UX: **argparse auto-generates usage**; you only add epilog for examples:
- [ ] 5. Testing: **main(argv=[...]) is testable without subprocess — pass args directly:**
- [ ] 5. Testing: **Parsing table-tests**: input args × expected args namespace / exit code

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
