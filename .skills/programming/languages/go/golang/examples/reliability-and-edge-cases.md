# Go Best Practices: 2. Error Handling

## Source guidance

This example applies the **2. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Errors are values, not exceptions.** Check them immediately after the call that can produce them — don't defer checking or collect several before handling.
- **Wrap with context using `fmt.Errorf("...: %w", err)`** — preserves the chain for `errors.Is`/`errors.As` while adding what the caller needs to know.
- **Don't wrap and log at every layer** — wrap once with context, log once at the top (usually in `main` or a request handler), not at every intermediate call site.

## Example

This excerpt is from the cited **2. Error Handling** section.

```go
data, err := os.ReadFile(path)
if err != nil {
    return fmt.Errorf("reading config at %s: %w", path, err)
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for go-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
