# Yargs CLI Design Best Practices: Basic Usage

Best practices for building well-designed command-line tools with Yargs (Node.js). Use when creating, structuring, or reviewing a Yargs CLI app — covers command modules, strict parsing, options, validation, help, output, completion, and testing.

## Scenario

Use this example as a starting point when applying **yargs-cli-design** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Command Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
