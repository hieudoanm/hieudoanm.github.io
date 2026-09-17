# Commander.js CLI Design Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Test the `run(argv)` entrypoint, not the internals** — spawn via `execFile`/`execa` _or_ call the parsed action in-process with `.exitOverride()`; assert on exit code, `stdout`, and `stderr`:
- **Test error paths** — assert actionable message on `stderr` and the correct nonzero exit code for known failures.
- **Parameterize the case table** for output formats and flag combinations (`@parametrize`/a `forEach` of cases).

## Example

```ts
const { stdout, stderr, exitCode } = await run(['get', 'api.endpoint']);
expect(stdout).toContain('value');
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for commander-cli-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
