# Workflow notes

Focused reference for **commander-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

```ts
program
  .command('set <key> <value>')
  .argument('[ttl]', 'Expiry in seconds', parseInt)
  .action((key, value, ttl) => {
    /* ... */
  });
```

- **Do validation in the argument validator or the action handler**, not by mutating globals — a parse-time failure gives a clean usage error instead of an opaque crash.
- **Prefer `.option()` with `requiredOption` for flags that must be present** over manually checking `undefined`.

---

## 4. Options (Flags)

| Convention    | Rule                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------ |
| Long form     | Always provide (`--output`); short only for genuinely frequent flags (`-o`, `-v`, `-f`)          |
| Kebab-case    | Long options are `kebab-case`, never `camelCase`/`snake_case`                                    |
| Boolean flags | Default `false`; make them affirmative (`--force`, not `--no-safe`); negatable via `--no-<name>` |
| Typed options | Give a type hint: `.option("-p, --port <number>", "...", parseInt)` so coercion happens at parse |
| Defaults      | Provide a default in the option declaration, not `??` later in the handler                       |

```ts
program.option('--no-colour', 'Disable coloured output');
program.requiredOption('-p, --port <number>', 'Port to listen on', parseInt);
```

- **Don't reuse a shorthand letter with different meanings across sibling commands** — `-o` should mean "output" everywhere.

---

## 5. Help Text

- `.description()` — one imperative line, no trailing period (`"Get a configuration value"`, not `"This command gets..."`).
- `.usage("<cmd> [options]")` for the synopsis; `.helpOption()` keeps the default `--help`.
- **`.addHelpText()`** for a custom `Examples:`/footer block — the single most useful part of `--help` for new users.

```ts
program
  .command('get <key>')
  .description('Get a configuration value')
  .addHelpText(
    'after',
    '\nExamples:\n  app get api.endpoint\n  app get --output json api.endpoint'
  );
```

- **`showHelpAfterError()` (v8+) and `showSuggestionAfterError()`** — show a short help/typo hint after a failed parse instead of a wall of usage text. Reserve full usage dumps for actual parse mistakes, not runtime failures.

---
