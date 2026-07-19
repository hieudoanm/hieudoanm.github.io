# WinterJS Best Practices: Workflow Checklist

A practical run sheet for applying [WinterJS Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Runtime & Compatibility: **WinterCG-compliant code first: fetch/Request/Response/TextEncoder/crypto.crypto.subtle:**
- [ ] 1. Runtime & Compatibility: **Policy: if it needs process./fs, it's Node-specific — guard it or refactor to WinterCG.**
- [ ] 2. The Fetch-First Model: **Handlers are fetch(env, ctx) — entries mirror Serverless/Workers:**
- [ ] 2. The Fetch-First Model: **Stream responses via ReadableStream/Response.body — WinterCG streams interop broadly.**
- [ ] 3. Deployment & Config: **Deploy via wasmer (Sparkle/wasmer deploy) with a wasmer.toml describing routes/env:**
- [ ] 3. Deployment & Config: **Env variables via the deploy platform; secrets through platform stores — never inline.**
- [ ] 4. State & Storage: **Stateless handlers: no in-memory state across invocations (short-lived instances):**
- [ ] 4. State & Storage: **Persist via bindings (env.DB (sqlite), KV, postgres adapters) — not process memory.**
- [ ] 5. Ecosystem & Adapters: **Adapters for mainstream frameworks (Hono, etc.) selective — WinterCG-compatible pieces only:**
- [ ] 5. Ecosystem & Adapters: **Respect the "one runtime" rule: code that runs on Workerd-LLRT-WinterJS is your unlock — test each.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
