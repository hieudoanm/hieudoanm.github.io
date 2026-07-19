# Astro Best Practices: Basic Usage

Best practices for building content-driven websites with Astro. Use when creating, structuring, or reviewing Astro applications — covers components, routing, data fetching, optimization, and performance.

## Scenario

Use this example as a starting point when applying **astro-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Astro Components** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```astro
---
const { title } = Astro.props
---
<div class="card">
  <h2>{title}</h2>
  <slot />
</div>

<style>
  .card {
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
</style>
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
