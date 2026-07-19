# Commander.js CLI Design Best Practices: 2. Command Structure

## Source guidance

This example applies the **2. Command Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Noun-verb or verb-noun, pick one and stay consistent** — `app config get` or `app get config`, never both in one tree.
- **Keep the tree shallow** — 2 levels of commands is usually enough; a 3rd only for a genuinely complex domain.
- **Root should do something useful** or print help — never a silent no-op.
- **Group related actions under a parent command** (`app config get/set/list`) even if the parent has no action itself.

## Example

This excerpt is from the cited **2. Command Structure** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for commander-cli-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
