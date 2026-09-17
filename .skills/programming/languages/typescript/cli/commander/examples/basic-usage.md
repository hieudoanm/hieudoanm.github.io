# Commander.js CLI Design Best Practices: Basic Usage

Best practices for building well-designed command-line tools with Commander.js (Node/Auth). Use when creating, structuring, or reviewing a Commander CLI app — covers command structure, arguments, options, help, output, errors, and testing with suggested values.

## Scenario

Use this example as a starting point when applying **commander-cli-design** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Command Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
