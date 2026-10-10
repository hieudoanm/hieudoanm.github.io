# Overview

Focused reference for **commander-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Commander.js CLI Design Best Practices

Commander.js is the classic imperative Node.js CLI framework: you describe commands, options, and action handlers programmatically, and it produces consistent help/usage and exit behaviour for free. Good CLI design with Commander is mostly _conventions_ — command trees, `stdout`/`stderr` discipline, exit codes, and actionable errors — plus fitting your workflow into `program.command(...)`/`.option(...)`/`.action(...)` instead of fighting the framework.

---

## 1. Core Stack

- `commander` — command tree, options, help/usage generation
- `chalk` or `picocolors` — colored terminal output (auto-detect TTY)
- `ora` (or `cli-spinners`) — spinners for operations >300ms
- `boxen` / `cli-table3` — output layout (tables, boxes)
- `conf` / `env-paths` — persisted config where needed

```bash
pnpm add commander chalk ora
```

---

## 2. Command Structure

- **Noun-verb or verb-noun, pick one and stay consistent** — `app config get` or `app get config`, never both in one tree.
- **Keep the tree shallow** — 2 levels of commands is usually enough; a 3rd only for a genuinely complex domain.
- **Root should do something useful** or print help — never a silent no-op.
- **Group related actions under a parent command** (`app config get/set/list`) even if the parent has no action itself.

```ts
#!/usr/bin/env node
import { program } from 'commander';

program
  .name('app')
  .description('CLI for managing configuration')
  .version('1.0.0');

program
  .command('config get <key>')
  .description('Get a configuration value')
  .option('-o, --output <format>', 'Output format: table, json, yaml', 'table')
  .action(async (key, opts) => {
    /* ... */
  });

program.parse();
```

---

## 3. Arguments

| Rule                              | Detail                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------- |
| Positional for the "main subject" | `app get <key>` — flags for modifiers/options, not the subject                  |
| Required vs optional              | `<required>` angle brackets, `[optional]` square brackets                       |
| Variadic                          | `<file...>` collects the rest into an array — use sparingly, last position only |
| Validate with a function          | `.argument("<port>", "Server port", parseInt, 3000)` — throws on bad input      |
