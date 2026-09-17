# Deno Runtime Best Practices: Basic Usage

Best practices for building applications that run on the Deno runtime (TypeScript). Use when structuring or reviewing Deno scripts, servers, or tools — covers permissions, module URLs and JSR, the standard library, Web APIs, testing, and tooling.

## Scenario

Use this example as a starting point when applying **deno-runtime** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Code Organization** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```json
{
  "tasks": { "dev": "deno run --watch src/main.ts", "test": "deno test" },
  "imports": { "@std/path": "jsr:@std/path@1" },
  "compilerOptions": { "strict": true }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
