# WebStorm: Basic Usage

Best practices for working in WebStorm — TypeScript project config as the source of truth, the Node interpreter and package manager, React/Vue/Angular framework support, the JavaScript debugger and CPU profiler, and TypeScript 7. Use when setting up, debugging, or refactoring a TypeScript or JavaScript web project in WebStorm.

## Scenario

Use this example as a starting point when applying **webstorm-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. TypeScript Project Config** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
