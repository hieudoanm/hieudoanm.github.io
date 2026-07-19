# QuickJS Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `JS_NewRuntime`/`JS_NewContext` per isolate; freed on exit
- [ ] `JS_SetMemoryLimit`/`JS_SetMaxStackSize`/interrupt-set for untrusted
- [ ] Value ownership tagged; every alloc has a pair (`Free`/`Dup`)
- [ ] C functions narrow + arg-validated; `JS_EXCEPTION` on error
- [ ] Async/workers modeled; `rquickjs`/safe bindings in Rust
- [ ] Versions pinned; compatibility documented

## Example

A team applying **Quick-Start Checklist** to a QuickJS Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `JS_NewRuntime`/`JS_NewContext` per isolate; freed on exit**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for quickjs-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
