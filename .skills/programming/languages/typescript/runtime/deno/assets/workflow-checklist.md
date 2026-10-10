# Deno Runtime Best Practices: Workflow Checklist

A practical run sheet for applying [Deno Runtime Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Secure by Default (Permissions): **No implicit network, filesystem, or environment access** — the runtime starts sandboxed; grant only what the program needs:
- [ ] 1. Secure by Default (Permissions): **deno run --check/deno check** type-checks as it runs — the compiler is part of execution, not a separate step
- [ ] 2. Modules & Dependencies: **URL and jsr: imports — no node_modules**:
- [ ] 2. Modules & Dependencies: **jsr:@std/* is the current home for deno_std** — @std/path, @std/assert, @std/testing, @std/datetime, @std/http; pin versions (jsr:@std/path@1) not float latest
- [ ] 3. Code Organization: **deno.json** is the config hub: tasks, imports, compilerOptions, unstable, fmt/lint config, lock, nodeModulesDir:
- [ ] 3. Code Organization: **deno task <name> as the entry surface** — one discoverable place for dev/build/test/start regardless of platform
- [ ] 4. Web APIs & I/O: **Web standards are the native API** — fetch, Response/Request, WebSocket, ReadableStream, Headers, URL, FormData, File, crypto all work without imports
- [ ] 4. Web APIs & I/O: **Deno.serve for HTTP servers** — the modern, fast server built on Web APIs:
- [ ] 5. TypeScript & Strict Mode: **TS is the runtime language** — .ts files run directly; deno run --check / deno check gates types before/at execution, so *every* run is a type-check when you want it to be
- [ ] 5. TypeScript & Strict Mode: **strict: true in deno.json compilerOptions** aligns with the single-config style; JSR/jsr: packages are type-checked on publish, which is upstream quality leverage

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
