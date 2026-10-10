# Workflow notes

Focused reference for **oclif-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 3. Args & Flags

| Tool            | Do                                                                             | Don't                        |
| --------------- | ------------------------------------------------------------------------------ | ---------------------------- |
| `Args.string`   | Positionals as declarations (`{ key: Args.string({ required: true }) }`)       | Manually index `argv`        |
| `Flags.string`  | `options` for closed sets, `parse` for coercion, `default` for sane fallbacks  | Loose untyped strings        |
| `Flags.integer` | Numbers typed at parse; `*flags.relationship` chains for cross-flag invariants | Double validation in `run()` |
| `Flags.boolean` | `allowNo` for `--no-colour`; default `false`                                   | Ambiguous tri-state flags    |

```ts
static flags = {
    port: Flags.integer({ char: "p", default: 6379, summary: "Port to listen on" }),
    force: Flags.boolean({ default: false, allowNo: true }),
    json: Flags.boolean({ default: false, summary: "Output as JSON" }),
};
```

- **`kebab-case` long flags, shorthand only for frequent ones** — document the `-o`/`-p` shorthand mapping once so it reads the same across the whole CLI.
- **Relationship flags** (`Flags.relationship`) declare `mutually exclusive of`/`exactly one of` constraints declaratively instead of a wall of runtime checks.
- **Build shared flag sets** (colour, output-format, verbose) as exported flag groupings every command composes.

---

## 4. Topics & Help

- **Nesting topics via directory layout** (`src/commands/config/*.ts`) — oclif derives `app config`, `app config get`, etc. and generates topic help automatically.
- **`static topic`/`summary` on grouping commands** so `app config --help` lists its children meaningfully.
- **`static aliases`** for legacy/`long` variants (`["cfg get"]`) — keep an alias map documented, not ad-hoc.
- **Hook-based help augmentation** (`hooks`) stays rare — prefer `examples` + topic summaries for 99% of discoverability.

---

## 5. Output & Feedback

| Rule                     | Detail                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------ |
| Human output → stdout    | `this.log(...)`                                                                      |
| Errors/warnings → stderr | `this.error(...)` (see §6), never `console.error` in commands                        |
| Machine output           | Support a consistent `--json` flag emitting `JSON.stringify`-worthy data             |
| Progress                 | `ux.action.start("...")` spinner for operations >300ms; `ux.action.stop()` when done |
| Colour                   | Respect `NO_COLOR` and `--no-colour`; `this.config.theme` styling hooks              |
