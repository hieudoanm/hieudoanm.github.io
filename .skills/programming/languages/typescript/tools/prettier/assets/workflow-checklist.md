# Prettier: Workflow Checklist

A practical run sheet for applying [Prettier](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Configuration: **Use prettier.config.mjs** (or .prettierrc.json) at the repo root, committed. The "prettier" key in package.json works but hides the config in a busy file
- [ ] 1. Configuration: **ESM config needs .mjs** unless your package.json has "type": "module" — a bare prettier.config.js with CommonJS .js will throw
- [ ] 2. What Prettier Does Not Do: **It does not sort imports, object keys, JSX props, or object properties.** That is a plugin's job, or Biome's, or a human's
- [ ] 2. What Prettier Does Not Do: **It does not lint.** There are no correctness rules in Prettier at all — anything "prettier" reports about your code style that is not a formatting question belongs in ESLint
- [ ] 3. Suppressing Formatting: **// prettier-ignore disables formatting for the next node.** Use it for deliberate matrices, generated-like lookup tables, and alignment that carries meaning
- [ ] 3. Suppressing Formatting: **Never use it to dodge a diff you disagree with.** Reformat the code and argue about the config change instead — that is what the config is for
- [ ] 4. Plugins: **prettier-plugin-tailwindcss** is the highest-value plugin: it sorts Tailwind utility classes, which no human does consistently. Point it at your stylesheet with tailwindStylesheet so custom classes sort correctly
- [ ] 4. Plugins: **Import sorting**: prettier-plugin-organize-imports (uses the TypeScript language service) or @trivago/prettier-plugin-sort-imports (regex-based, supports custom groups). Pick one, and expect to re-verify on every TypeScript upgrade since the organize-imports variant tracks the compiler
- [ ] 5. ESLint Integration: **Install eslint-config-prettier and extend it LAST.** It switches off every stylistic ESLint rule that conflicts with Prettier, so the two stop fighting
- [ ] 5. ESLint Integration: **Delete eslint-plugin-prettier and the prettier/prettier rule.** Running the formatter through ESLint is slower, gives worse error messages, and duplicates prettier --check

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
