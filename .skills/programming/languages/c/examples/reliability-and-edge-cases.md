# C Best Practices: 4. Error Handling

## Source guidance

This example applies the **4. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Pick one error contract and apply it everywhere** — resulting `0 == success`, pointer-with-`NULL`-on-error, or `errno`-style codes. Don't mix three styles in one file:
- **Errors flow up, never down** — a function that can't succeed must not return a partially valid result; return the error.
- **Fail fast** — validate parameters and invariants at the top of the function before touching any state:
- **Cleanup on error with a single exit** — `goto` cleanup labels (or early returns + RAII-less manual unwind); never leak on an early-failure branch.

## Example

```c
int set_rate(rate_t *r, double v) {
    if (!r) return USER_EINVAL;
    if (!(v > 0.0)) return USER_EINVAL;
    r->value = v;
    return USER_OK;
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for c-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
