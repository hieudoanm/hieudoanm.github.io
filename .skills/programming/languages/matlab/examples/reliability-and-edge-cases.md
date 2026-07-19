# MATLAB Best Practices: 6. Error Handling

## Source guidance

This example applies the **6. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Fail fast, fail early** — `error('id:reason', 'message %s', arg)` with identifier + message:
- **`assert` for invariants you know are true** in developer flows; `validateattributes` for user input.
- **`try/catch` only around the block that can fail** — narrow catches, and `rethrow(err)` keeps the stack:
- **Prefer returning safe defaults + a status** over burying errors where a caller can't see them.
- **No silent `disp`-only error paths** — a failed transform should be visible in output or an explicit error.

## Example

```matlab
if ~isreal(x) || any(isnan(x(:)))
    error('summarize:invalidInput', 'x must be real and finite.');
end
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for matlab-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
