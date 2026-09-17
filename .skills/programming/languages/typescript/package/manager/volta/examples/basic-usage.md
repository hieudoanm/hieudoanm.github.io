# Volta Best Practices: Basic Usage

Best practices for managing Node toolchains with Volta — the per-project Node/yarn/pnpm launcher conventions. Use when writing, structuring, or reviewing Volta setups — covers hooks, tool pinning, environments, and CI.

## Scenario

Use this example as a starting point when applying **volta-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **4. CI Integration** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```bash
curl https://get.volta.sh | bash      # then PATH
volta install node@20
volta run --node=20 yarn ci
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
