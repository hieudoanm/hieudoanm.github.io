# C Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Test the contract at the API boundary**, not the internals: valid inputs, invalid inputs, empty inputs, error returns, boundary sizes (0, 1, max).
- **Property-style loop tests** over generated inputs (fuzz seeds) plus concrete corner cases.
- **Run the suite under ASan/UBSan** — a test that passes without sanitizers proves nothing about memory safety.
- **Keep tests deterministic** — no wall-clock sleeps, no ambient env dependence; seed everything.
- **Table-driven cases**: inputs × expected results in an array of structs, iterated, one failure names the row.

## Example

```c
TEST(user_new_rejects_null_name) {
    user_t *u = NULL;
    ASSERT_EQ(user_new(&u, NULL), USER_EINVAL);
    ASSERT_NULL(u);
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for c-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
