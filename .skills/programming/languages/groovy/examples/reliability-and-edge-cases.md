# Groovy Best Practices: 5. Interop & Performance

## Source guidance

This example applies the **5. Interop & Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Direct Java interop is seamless — use typed collections where mixing:**
- **`@Canonical`/`@TupleConstructor`/`@Immutable` AST transforms over hand-built equals/toString.**
- **Late-bound method dispatch is dynamic — when perf matters, `@CompileStatic` the hot path.**
- **Threading: closures don't add thread-safety — synchronize/lock or use actors when shared state.**

## Example

A team applying **5. Interop & Performance** to a Groovy Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Direct Java interop is seamless — use typed collections where mixing:****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for groovy-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
