# Axios Best Practices: Basic Usage

Best practices for HTTP requests with Axios — the promise-based HTTP client conventions for JS/TS apps. Use when writing, structuring, or reviewing Axios — covers instances, interceptors, error handling, typing, and testing.

## Scenario

Use this example as a starting point when applying **axios-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Instances** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
