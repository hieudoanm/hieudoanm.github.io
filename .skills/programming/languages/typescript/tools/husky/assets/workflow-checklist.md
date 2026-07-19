# Husky: Workflow Checklist

A practical run sheet for applying [Husky](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. What Husky Actually Does: **It only sets core.hooksPath to .husky and runs it.** Every bit of logic lives in your scripts. Husky is a loader, not a framework — do not build behaviour into it that belongs in lint-staged or a script
- [ ] 1. What Husky Actually Does: **Hooks are per-clone Git configuration, not committed files.** The .husky/ directory is committed; the fact that Git is pointed at it is not. That is why the prepare script below is load-bearing
- [ ] 2. Setup: **Husky 9 removed husky install and the husky init boilerplate.** If you find . "$(dirname -- "$0")/_/husky.sh" in a hook, that file is pre-v9. The _ directory was removed because it was the source of most Husky setup bugs
- [ ] 2. Setup: **husky init is optional — hand-creating the directory works.** Husky 9 needs only the folder and the prepare script
- [ ] 3. Hook Scripts: **A v9 hook is a plain shell script with no preamble.** No shebang boilerplate, no sourcing Husky internals
- [ ] 3. Hook Scripts: **Make hooks executable** (chmod +x .husky/pre-commit). Husky will not do it for you in every clone path, and a non-executable hook fails opaquely
- [ ] 4. lint-staged: **Never lint the whole repo in pre-commit.** It is quadratic in practice — a large repo makes committing genuinely painful and people reach for --no-verify. Staged-only is the design, not an optimisation
- [ ] 4. lint-staged: **lint-staged 17 backs staged files and shares one config.** Keep the list of tools in one place so every hook invocation is identical
- [ ] 5. Commit Messages: **commitlint and Husky are independent** — Husky only calls the command. Wire them yourself so you can drop one without touching the other
- [ ] 5. Commit Messages: **Configure it in .commitlintrc.json, not CLI flags**, so local and CI agree

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
