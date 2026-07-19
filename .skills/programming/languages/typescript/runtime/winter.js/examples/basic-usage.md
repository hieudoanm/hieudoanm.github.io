# WinterJS Best Practices: Basic Usage

Best practices for building with WinterJS — the WinterCG-compliant JavaScript runtime conventions. Use when writing, structuring, or reviewing WinterJS deployments — covers the runtime, WinterCG APIs, deployment (Cloudflare-style), and compatibility.

## Scenario

Use this example as a starting point when applying **winter.js-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Runtime & Compatibility** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
export default {
  async fetch(request) {
    return new Response("pong", { status: 200 });
  },
};
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
