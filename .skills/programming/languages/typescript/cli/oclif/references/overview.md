# Overview

Focused reference for **oclif-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

# oclif CLI Design Best Practices

oclif (Salesforce's CLI framework) builds CLIs from **classes** with declarative args/flags, a plugin system, and framework-provided help and tab-completion. It shines for large, extensible CLIs where commands ship in plugins and every command is a `Command` subclass with typed `flags`/`args`. Best practice is about colocating those declarations, keeping `run()` thin, and following oclif's conventions for help, errors, and plugin boundaries.

---

## 1. Setup & Structure

```bash
pnpm create oclif app        # or: pnpm add @oclif/core
```

```txt
myapp/
├── bin/
│   └── run.js               # generated entry — stays thin
├── src/
│   ├── commands/
│   │   ├── config/
│   │   │   ├── get.ts
│   │   │   └── set.ts
│   │   └── hello.ts
│   ├── index.ts
│   └── hooks/
├── test/
│   ├── commands/
│   └── setup.ts
└── package.json
```

- **One command per file in `src/commands/`**; directory nesting becomes topics (`src/commands/config/get.ts` → `app config get`).
- **Keep `main`/`bin` thin** — oclif wires the runner; business logic lives in the `Command` and services it calls.
- **`pjson.oclif` config** in `package.json` defines entry, topics, and hooks — treat it as part of the declaration surface.
- Version/help come from oclif automatically (`--version`, `--help`, topic-based help pages).

---

## 2. The Command Class

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

- **`description` = one imperative line; `summary` = short list-line; `examples` = real, runnable commands.** All three surface in help.
- **`run()` reads `args`/`flags`** from `this.parse(Command)` — typed, validated, and documented from the static declarations; keep it short (delegate to services).
- **`static hidden`** for internal commands you don't want in help/tab-completion.
