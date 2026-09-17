# WinterJS Best Practices: 6. Testing & Ops

## Source guidance

This example applies the **6. Testing & Ops** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Tests: local run + `fetch`-level integration; parity suite across runtimes:**
- **Observability: structured logs (`console.log(JSON.stringify(...))`), OpenTelemetry-adjacent when supported.**
- **Latency/startup measured under the deploy target; version runtime + adapter pinned.**

## Example

```js
const res = await app.fetch(new Request("https://example/"));
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for winter.js-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
