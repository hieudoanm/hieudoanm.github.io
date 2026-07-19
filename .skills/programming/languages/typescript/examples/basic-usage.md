# TypeScript Best Practices: Basic Usage

Idiomatic TypeScript best practices covering project structure and tooling, strict typing, interfaces vs types, immutability, branded types, discriminated unions, runtime validation, async patterns, and testing. Use when writing, structuring, or reviewing TypeScript code.

## Scenario

Use this example as a starting point when applying **typescript-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Compiler Strictness (Non-negotiable)** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```jsonc
{
  "compilerOptions": {
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noFallthroughCasesInSwitch": true,
  },
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
