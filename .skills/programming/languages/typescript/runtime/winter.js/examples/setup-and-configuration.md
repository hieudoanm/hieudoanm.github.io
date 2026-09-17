# WinterJS Best Practices: 2. The Fetch-First Model

## Source guidance

This example applies the **2. The Fetch-First Model** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Handlers are `fetch(env, ctx)` — entries mirror Serverless/Workers:**
- **Stream responses via `ReadableStream`/`Response.body` — WinterCG streams interop broadly.**
- **Bindings/env (`env.DB`, secrets) are the injected contract — no ambient globals.**

## Example

```js
export default {
  async fetch(request, env, ctx) {
    const logs = await env.DB.prepare("SELECT 1").first();
    return Response.json(logs);
  },
};
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for winter.js-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
