# nvm: Basic Usage

Best practices for managing Node.js versions with nvm — .nvmrc pinning, LTS policy, global package isolation, CI setup, and the systemd/production caveat. Use when pinning Node versions or fixing "wrong version" failures.

## Scenario

Use this example as a starting point when applying **nvm-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Pinning Per Project** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```bash
echo "24" > .nvmrc
nvm install          # reads .nvmrc, installs if missing
nvm use              # switches the current shell to .nvmrc
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
