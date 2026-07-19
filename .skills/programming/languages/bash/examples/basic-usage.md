# Bash Best Practices: Basic Usage

Best practices for writing Bash/Shell scripts — the conventions for shell automation, CI scripting, and CLI tooling on POSIX systems. Use when writing, structuring, or reviewing Bash — covers script safety, quoting, conditionals, functions, data handling, error cleanup, and linting.

## Scenario

Use this example as a starting point when applying **bash-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Conditionals & Tests** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```bash
if [[ -n "${var:-}" ]] && [[ "${mode}" == "fast" ]]; then
  : # ...
fi
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
