# Commander.js CLI Design Best Practices: 7. Errors & Exit Codes

## Source guidance

This example applies the **7. Errors & Exit Codes** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Throw/`program.error()` from the action** and let Commander set the exit code — **`use `process.exitCode = N` at the top level for flush before exit**:
- **Make errors actionable**: state what went wrong and how to fix it (`"config file not found at ~/.app/config.yaml — run 'app init' first"`), not just `"error: not found"`.
- **`.exitOverride()` + a testable `run(argv)`** — keep the process-switching parts (`program.parse()`) out of the business logic so tests can call `run([...])` in-process.
- **Never swallow errors in `catch {}`** — log with the cause; let unexpected failures fail loudly with a meaningful stack.

## Example

```ts
program.exitOverride(); // for tests: throws instead of exiting
try {
  await program.parseAsync();
} catch (err) {
  if (err instanceof commander.CommanderError) throw err; // argparse handled by framework
  console.error(formatError(err)); // runtime failure → stderr + exit 1
  process.exitCode = 1;
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for commander-cli-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
