# Workflow notes

Focused reference for **deno-runtime**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **URL and `jsr:` imports — no `node_modules`**:

```ts
import { join } from "jsr:@std/path@1";
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
```

- **`jsr:@std/*` is the current home for `deno_std`** — `@std/path`, `@std/assert`, `@std/testing`, `@std/datetime`, `@std/http`; pin versions (`jsr:@std/path@1`) not float `latest`.
- **Pin your dependency graph with `deno.lock`** (auto-generated, committed) for reproducible builds; `deno task`/`deno run` resolve from it.
- **`deno add jsr:@std/collections`** manages the import map / `deno.json` "imports" so you import `@std/collections` without writing URLs everywhere.
- **Node/npm compat** exists (`npm:` specifiers, `node:` built-ins, `node_modules` optional mode) — use it *at the boundary* for legacy packages, but prefer `jsr:`/Web APIs whenever a substitute exists. Language-aware tooling (`deno.json` "imports" + `nodeModulesDir`) is disabled by default — that's a feature.

---

## 3. Code Organization

- **`deno.json`** is the config hub: `tasks`, `imports`, `compilerOptions`, `unstable`, `fmt`/`lint` config, `lock`, `nodeModulesDir`:

```json
{
  "tasks": { "dev": "deno run --watch src/main.ts", "test": "deno test" },
  "imports": { "@std/path": "jsr:@std/path@1" },
  "compilerOptions": { "strict": true }
}
```

- **`deno task <name>` as the entry surface** — one discoverable place for dev/build/test/start regardless of platform.
- Keep entrypoints (`src/main.ts`) thin; business logic in imported modules; `mod.ts` files re-export a module's public API (the Deno convention).

---

## 4. Web APIs & I/O
