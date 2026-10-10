# Bun Runtime Best Practices: Workflow Checklist

A practical run sheet for applying [Bun Runtime Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Runtime Foundations: **One binary, zero setup**: bun run, bun test, bun install, bunx, and bundling are all the same tool — no separate transpiler/runner/installer to wire
- [ ] 1. Runtime Foundations: **TypeScript is first-class** — no compile step for execution (bun run src/server.ts); keep .ts/.tsx as the source of truth, use bun build only for distribution
- [ ] 2. Serving HTTP (Bun.serve): **Bun.serve is the server layer** — typed routes, fetch-style handler, native TLS/SNI and WebSocket upgrade support:
- [ ] 2. Serving HTTP (Bun.serve): **Native ServeStatic (Bun.serve({ static }))** for static files, or a tiny stream of Bun.file(path) for JSON/file responses — streaming + range requests handled for you
- [ ] 3. File I/O & Blobs: **Bun.file(path)** gives a lazy file handle that streams and ranges and is a first-class Response body:
- [ ] 3. File I/O & Blobs: **Bun.write(path, data)** for a one-shot write (string/Uint8Array/Blob/Response-ish); **Bun.stdin/Bun.stdout** for terminal I/O
- [ ] 4. Shell & Scripting (Bun.$, bunx): **Bun.$ is a tagged shell** — run commands safely with interpolation, captured stdout, and piping without child_process string-squashing:
- [ ] 4. Shell & Scripting (Bun.$, bunx): **bunx <pkg> runs npm-published tools without installing to the project** (bunx prettier --write .), and **bun run <script>** executes package.json scripts (bare bun <script> works for bun-aware targets)
- [ ] 5. Testing (bun:test): **bun test + bun:test** is a Jest-compatible runner with zero config — describe/it/expect, beforeEach/afterEach, mocks/spies, and TS native:
- [ ] 5. Testing (bun:test): **bun test --coverage for reports** (built-in coverage provider, no extra dependency); watch mode via bun test --watch

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
