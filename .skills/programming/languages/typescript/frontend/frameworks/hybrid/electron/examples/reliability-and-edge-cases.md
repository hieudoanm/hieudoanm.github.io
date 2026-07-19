# Electron Best Practices: 5. Security

## Source guidance

This example applies the **5. Security** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Context isolation** — always enable context isolation:
- **Disable node integration** — never enable node integration in renderer
- **Content security policy** — implement CSP:
- **Validate input** — validate all input from renderer process
- **Disable dangerous features** — disable remote module, webSecurity false

## Example

```typescript
webPreferences: {
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: true
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for electron-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
