# Overview

Focused reference for **yargs-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Yargs CLI Design Best Practices

Yargs is the configuration-driven Node.js CLI framework: you declare commands, options, and validation rules as data, and it produces help, strict parsing, and completion from those declarations. Because Yargs is declarative, the main risks are letting its permissive defaults through — unflagged args, loose coercion, unvalidated input — so best practice starts with `.strict()` and the discipline of describing every option's shape up front.

---

## 1. Core Stack

- `yargs` — parser, command tree, help/usage, completion
- `chalk` / `picocolors` — colours with TTY auto-detection
- `ora` — spinners for >300ms operations
- `cli-table3` / `boxen` — table/box output layout

```bash
pnpm add yargs chalk ora
```

- **Use `hideBin(process.argv)`** — `yargs(hideBin(process.argv))` strips the `node` executable and script path like `argv.slice(2)` without whitespace mistakes.

---

## 2. Command Structure

- **Declare commands as modules** (`command`, `describe`, `builder`, `handler`) — self-contained, testable, and colocated with their options:

```ts
import type { ArgumentsCamelCase } from 'yargs';

export const command = 'get <key>';
export const describe = 'Get a configuration value';
export const builder = {
  output: {
    alias: 'o',
    type: 'string',
    choices: ['table', 'json'],
    default: 'table',
    describe: 'Output format',
  },
};
export async function handler(argv: ArgumentsCamelCase<typeof builder>) {
  const { key, output } = argv;
  // ...
}
export default { command, describe, builder, handler };
```

- **Noun-verb or verb-noun, consistent app-wide**; shallow trees (2 levels) with parent grouping (`app config get/set/list`).
- **`argv` is your typed result** — declare every positional and option in `builder` so `argv.key`/`argv.output` are known at compile time (derive types from the builder).
- One command module per file, named for the command (`commands/get.ts`).

---
