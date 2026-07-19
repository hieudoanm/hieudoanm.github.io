# VS Code: 4. Debugging

## Source guidance

This example applies the **4. Debugging** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`.vscode/launch.json` is worth committing** — it makes "how to run this" a reviewable file rather than tribal knowledge, and it works in every editor that implements the spec.
- **Launch configurations need the right `runtimeExecutable` and `env`.** A Node app launched without the project's `NODE_ENV` or `.env` loaded will fail in a way that looks like an application bug.
- **For the browser, Chrome DevTools remains more capable than the editor** for network and performance; use the editor's debugger for quick iteration and DevTools for anything you are actually investigating.

## Example

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "API (watch)",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "skipFiles": ["<node_internals>/**"],
      "console": "integratedTerminal"
    }
  ]
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for vscode-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
