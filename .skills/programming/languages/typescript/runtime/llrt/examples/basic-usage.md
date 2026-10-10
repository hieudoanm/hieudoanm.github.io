# LLRT Best Practices: Basic Usage

Best practices for building with LLRT (Low Latency Runtime) — the fast AWS Lambda JavaScript runtime conventions. Use when writing, structuring, or reviewing LLRT-based serverless — covers runtime install/pinning, compat surface, Cold starts, and AWS integration.

## Scenario

Use this example as a starting point when applying **llrt-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Cold Start & Bundle** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
// minimal handler, imports flattened
export async function handler(event) {
  return { statusCode: 200, body: "pong" };
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
