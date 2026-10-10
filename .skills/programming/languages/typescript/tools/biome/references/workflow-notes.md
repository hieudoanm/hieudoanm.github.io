# Workflow notes

Focused reference for **biome-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 3. Formatting

- **Formatting is Prettier-compatible but not bit-identical.** Expect a small number of diffs on migration — ternaries are the most common, where Biome uses condition-first ordering. Review the formatting diff deliberately rather than assuming it is wrong.
- **Language-specific options override global ones** in the `javascript`, `json`, `css`, `html` blocks, each with its own `formatter` key.
- **`trailingNewline` defaults to `true`.** Do not disable it: many POSIX tools, shell scripts, and VCS setups expect a terminating newline, and removing it creates phantom diffs.
- **`biome format --write` formats only.** There is no reason to run `format` and `lint` separately when `check` does both — that parses every file twice.
- **There is no formatter plugin API.** If you need Tailwind class sorting, Biome is the wrong formatter for that file type.

---

## 4. Linting

- **`"recommended": true` is the baseline and is sensible.** Biome's defaults are conservative enough that turning everything on does not produce the false-positive storm ESLint's `all` preset does.
- **Rules live in groups** — `correctness`, `suspicious`, `style`, `complexity`, `a11y`, `security` — with per-rule severity. Turning a rule `off` is a decision worth a comment in review.
- **Avoid `nursery` rules in enforced CI.** They are experimental, can change behaviour between minors, and may be slow. Try them locally.
- **Domains add framework rules** — `react`, `next`, `test`, `solid`, `vue`, `svelte`, `tailwind`, `project`. Enable only the ones you use.
- **Type-aware linting is Biome 2's addition**, exposed through the `project`/`types` domains. It requires project scanning, so first runs are slower; and it does not replicate all of `typescript-eslint`'s typed rules. If `no-floating-promises` is your reason for using ESLint, verify Biome covers your cases before dropping ESLint.

---

## 5. Import Organization

- **Import sorting is part of `assist`, not `linter`.** Configure it under `assist.actions.source.organizeImports` — looking for it in the linter config is the most common mistake.
- **Set it to `"on"`** so `check --write` also fixes ordering, and the formatter and import order never disagree.
- **Custom group ordering** lets you express a convention (external, built-in, aliases, relative) and have Biome enforce it.
- **This replaces `eslint-plugin-import` / `import-x` for ordering**, which is a large part of why migrations are simpler than they look.

---
