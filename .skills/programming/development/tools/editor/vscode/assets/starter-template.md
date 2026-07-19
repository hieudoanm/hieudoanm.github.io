# VS Code: Starter Template

A reusable starting point derived from the **1. Settings: Three Scopes** section of [VS Code](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
