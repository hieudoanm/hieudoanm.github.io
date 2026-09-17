# oclif CLI Design Best Practices: Basic Usage

Best practices for building well-designed command-line tools with oclif (Node.js plugin-based CLI framework). Use when creating, structuring, or reviewing an oclif CLI app — covers the Command class, args/flags, topics, help, plugins, output, errors, and testing.

## Scenario

Use this example as a starting point when applying **oclif-cli-design** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. The Command Class** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import { Command, Flags, Args } from '@oclif/core';

export default class ConfigGet extends Command {
  static description = 'Get a configuration value';
  static summary = "Shown in the parent command's help";
  static examples = [
    '<%= config.bin %> config get api.endpoint',
    '<%= config.bin %> config get -o json api.endpoint',
  ];

  static args = {
    key: Args.string({ description: 'Configuration key', required: true }),
  };

  static flags = {
    output: Flags.string({
      char: 'o',
      description: 'Output format',
      options: ['table', 'json'],
      default: 'table',
    }),
    ...commonFlags.help,
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(ConfigGet);
    // thin body: validate, call the service, print the result
    this.log(await readKey(args.key));
  }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
