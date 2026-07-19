# Yargs CLI Design Best Practices: 4. Options & Positionals

## Source guidance

This example applies the **4. Options & Positionals** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`choices` for closed sets** (output formats) — validation belongs in the declaration, not a manual `if` in `handler`.
- **Positionals via `.positional("key", {...})`** in `builder` — declared, typed, and shown in usage/help.

## Example

```ts
const options = {
  verbose: { type: 'boolean', alias: 'v', default: false },
  watch: { type: 'boolean', default: false },
  out: {
    alias: 'o',
    type: 'string',
    default: 'dist',
    coerce: (p: string) => resolve(p),
  },
  retries: { type: 'number', default: 3 },
};
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for yargs-cli-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
