# Yargs CLI Design Best Practices: 2. Command Structure

## Source guidance

This example applies the **2. Command Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Declare commands as modules** (`command`, `describe`, `builder`, `handler`) — self-contained, testable, and colocated with their options:
- **Noun-verb or verb-noun, consistent app-wide**; shallow trees (2 levels) with parent grouping (`app config get/set/list`).
- **`argv` is your typed result** — declare every positional and option in `builder` so `argv.key`/`argv.output` are known at compile time (derive types from the builder).
- One command module per file, named for the command (`commands/get.ts`).

## Example

This excerpt is from the cited **2. Command Structure** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for yargs-cli-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
