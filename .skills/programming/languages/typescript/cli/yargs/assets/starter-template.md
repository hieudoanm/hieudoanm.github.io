# Yargs CLI Design Best Practices: Starter Template

A reusable starting point derived from the **2. Command Structure** section of [Yargs CLI Design Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
