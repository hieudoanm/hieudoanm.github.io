# Review checklist

Focused reference for **c-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Modern standard**: compile `-std=c11` (or `c17`) with warnings as errors and sanitizers in CI:

```bash
cc -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Werror \
   -fsanitize=address,undefined -g    # dev/CI
```

- **Sanitizers are the runtime test**: ASan/UBSan/TSan catch what reviewers miss — run tests under them.
- **Static analyzers**: `clang --analyze`/`scan-build`, `clang-tidy`; keep a clean run, not a checked-in suppression rash.
- **Once every declaration**: build and test on `-O2` versus `-O0 -DNDEBUG` — behavior must not fork on optimization.
- **Pin the toolchain** (`-Werror`, exact compiler/clang version in CI) so warnings aren't "works on my machine".
- **`const` correctness + `-Werror` convert "will warn" into "fails the build"** — the cheapest behavior guarantee.

---

## 10. Testing

- **Test the contract at the API boundary**, not the internals: valid inputs, invalid inputs, empty inputs, error returns, boundary sizes (0, 1, max).

```c
TEST(user_new_rejects_null_name) {
    user_t *u = NULL;
    ASSERT_EQ(user_new(&u, NULL), USER_EINVAL);
    ASSERT_NULL(u);
}
```

- **Property-style loop tests** over generated inputs (fuzz seeds) plus concrete corner cases.
- **Run the suite under ASan/UBSan** — a test that passes without sanitizers proves nothing about memory safety.
- **Keep tests deterministic** — no wall-clock sleeps, no ambient env dependence; seed everything.
- **Table-driven cases**: inputs × expected results in an array of structs, iterated, one failure names the row.

---

## General Rules of Thumb

- **Ownership is a property of the design, not the code** — write it down: who allocates, who frees, who borrows.
- **Bounds are always known** — length + pointer everywhere; bounded copy/compare/format is the only safe default.
- **Errors are return values** — contract per function, fail fast, unwind cleanly, never leak on error.
- **Const by default** — read-only pointers are the default until there's a reason to mutate.
- **Sanitizers + analyzers + `-Werror` are part of "done"** — like any other test suite.
- **Small functions, opaque types, static helpers** — modularity that survives review.

---

## Quick-Start Checklist

- [ ] Ownership/lifetime documented per allocation; free in the layer that allocates
- [ ] Pointer + size pairs everywhere; `NULL` checked on every allocation/parameter
- [ ] `const` on read-only pointers; explicit-width integers; `size_t` for sizes
- [ ] Bounded string ops (`snprintf`/`strncpy` with size, validate truncation); no `strcpy`/`sprintf`
- [ ] Single error contract per file; fail-fast validation; cleanup on every error path
- [ ] `static` for internal helpers; opaque structs at public boundaries
- [ ] `-std=c17 -Wall -Wextra -Wconversion -Werror` in the build
- [ ] ASan/UBSan enabled in CI/test runs; static analyzer clean
- [ ] Structs initialized completely; alignment/size intent explicit
- [ ] Contract tests (valid/invalid/boundary/empty/error) with deterministic fixtures
