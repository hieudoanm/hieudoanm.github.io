# Workflow notes

Focused reference for **prettier-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **It does not sort imports, object keys, JSX props, or object properties.** That is a plugin's job, or Biome's, or a human's.
- **It does not lint.** There are no correctness rules in Prettier at all — anything "prettier" reports about your code style that is not a formatting question belongs in ESLint.
- **It does not understand your intent.** It cannot know that a long ternary deserves a comment, that a magic number needs a name, or that a dependency array is wrong.
- **It preserves comments but not always their placement.** Comment reflow around member chains and long expressions is the most common complaint; reach for `// prettier-ignore` there.
- **It does not format inside macros, decorators with unusual shapes, or some template-literal heavy DSLs.** These are the exceptions where `prettier-ignore` is legitimate.
- **It does not reformat code it cannot parse.** A syntax error is reported as a parse error, not silently skipped — do not ignore those.

---

## 3. Suppressing Formatting

- **`// prettier-ignore` disables formatting for the next node.** Use it for deliberate matrices, generated-like lookup tables, and alignment that carries meaning.
- **Never use it to dodge a diff you disagree with.** Reformat the code and argue about the config change instead — that is what the config is for.
- **HTML/Markdown/GraphQL use `<!-- prettier-ignore -->`**; YAML uses `# prettier-ignore`. Putting the wrong comment type in a block means it silently does nothing.
- **Blanket-ignoring a whole file** with `// prettier-ignore` at the top is a smell. Either the file is generated (and should be in `.prettierignore`) or the config is wrong for that file type.

---

## 4. Plugins

- **`prettier-plugin-tailwindcss`** is the highest-value plugin: it sorts Tailwind utility classes, which no human does consistently. Point it at your stylesheet with `tailwindStylesheet` so custom classes sort correctly.
- **Import sorting**: `prettier-plugin-organize-imports` (uses the TypeScript language service) or `@trivago/prettier-plugin-sort-imports` (regex-based, supports custom groups). Pick one, and expect to re-verify on every TypeScript upgrade since the organize-imports variant tracks the compiler.
- **`prettier-plugin-packagejson`** normalizes `package.json` key order — cheap consistency for a file that appears in every diff.
- **`prettier-plugin-jsdoc`** reformats JSDoc blocks, and is a genuine time-saver if you write doc comments.
- **Framework plugins** (`prettier-plugin-astro`, `prettier-plugin-svelte`, `@prettier/plugin-angular`... ) exist but each adds a dependency; only add one for a framework you actually use heavily.
- **Prefer fewer plugins.** Each is unmaintained the moment its framework changes course, and plugin output differences are a common source of "Prettier is not idempotent" bugs.

---

## 5. ESLint Integration

- **Install `eslint-config-prettier` and extend it LAST.** It switches off every stylistic ESLint rule that conflicts with Prettier, so the two stop fighting.
- **Delete `eslint-plugin-prettier` and the `prettier/prettier` rule.** Running the formatter through ESLint is slower, gives worse error messages, and duplicates `prettier --check`.
- **Import the flat entry** in ESLint 10 flat config:
