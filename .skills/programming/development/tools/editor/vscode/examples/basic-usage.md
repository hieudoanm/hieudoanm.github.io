# VS Code: Basic Usage

Best practices for Visual Studio Code — settings committed not personal, workspace vs user settings, the extension set kept minimal, ESLint/Prettier/TS Server matching CI, launch configurations, and remote development. Use when configuring, debugging, or reviewing a project in VS Code.

## Scenario

Use this example as a starting point when applying **vscode-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Settings: Three Scopes** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```jsonc
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "[python]": { "editor.defaultFormatter": "ms-python.black-formatter" },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
