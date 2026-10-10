# Commander.js CLI Design Best Practices: Starter Template

A reusable starting point derived from the **2. Command Structure** section of [Commander.js CLI Design Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
