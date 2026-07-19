# Node.js Runtime Best Practices: Basic Usage

Best practices for building applications that run on the Node.js runtime (TypeScript/JavaScript). Use when structuring or reviewing Node.js server, CLI, or library code — covers ESM, the event loop, streams, processes and signals, fs, testing, and tooling.

## Scenario

Use this example as a starting point when applying **nodejs-runtime** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Streams & Large Data** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';

await pipeline(createReadStream(src), makeTransform(), createWriteStream(dest));
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
