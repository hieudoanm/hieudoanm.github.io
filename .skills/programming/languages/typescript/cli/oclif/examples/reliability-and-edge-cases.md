# oclif CLI Design Best Practices: 6. Errors & Exit Codes

## Source guidance

This example applies the **6. Errors & Exit Codes** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`this.error(msg, { exit: 2 })` / `this.warn`** are the _only_ ways to signal failures in a command — they print to stderr, set the exit code, and flush properly:
- **`this.catch(err)`** overrides the default error path for translating exceptions into actionable messages (never rethrow a raw `TypeError` as a command failure if you can explain it).
- **Use `exit: 2` for usage-type errors (wrong flags/args) and `exit: 1` for runtime failures**; distinguish only where callers need to branch.

## Example

```ts
if (!(await exists(key))) {
  this.error(
    `key "${key}" not found — run 'app config list' to see available keys`,
    { exit: 2 }
  );
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for oclif-cli-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
