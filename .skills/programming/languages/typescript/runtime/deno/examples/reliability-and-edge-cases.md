# Deno Runtime Best Practices: 2. Modules & Dependencies

## Source guidance

This example applies the **2. Modules & Dependencies** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **URL and `jsr:` imports — no `node_modules`**:
- **`jsr:@std/*` is the current home for `deno_std`** — `@std/path`, `@std/assert`, `@std/testing`, `@std/datetime`, `@std/http`; pin versions (`jsr:@std/path@1`) not float `latest`.
- **Pin your dependency graph with `deno.lock`** (auto-generated, committed) for reproducible builds; `deno task`/`deno run` resolve from it.
- **`deno add jsr:@std/collections`** manages the import map / `deno.json` "imports" so you import `@std/collections` without writing URLs everywhere.

## Example

```ts
import { join } from "jsr:@std/path@1";
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for deno-runtime.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
