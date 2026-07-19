# Implementation notes

Focused reference for **vscode-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Debugging

- **`.vscode/launch.json` is worth committing** — it makes "how to run this" a reviewable file rather than tribal knowledge, and it works in every editor that implements the spec.
- **Launch configurations need the right `runtimeExecutable` and `env`.** A Node app launched without the project's `NODE_ENV` or `.env` loaded will fail in a way that looks like an application bug.
- **For the browser, Chrome DevTools remains more capable than the editor** for network and performance; use the editor's debugger for quick iteration and DevTools for anything you are actually investigating.
- **Attach to a running process rather than relaunching** when the thing you are debugging is a server that has state or a scheduler; relaunching changes the timing you are trying to observe.

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

---

## 5. Remote & Containers

- **The dev container is the strongest way to make a setup uniform,** because it pins the OS, toolchain, and extensions together. Prefer it over a long "install these 12 things" README.
- **Remote-SSH and Dev Containers both need the extensions installed on the remote side,** not locally; an extension that only exists locally does not apply to a remote file.
- **Keep the container definition minimal and committed,** and avoid baking anything secret into it — use a documented env file or the host's environment.
