# Workflow notes

Focused reference for **c-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`size_t` for sizes and indexes**; guard against size overflow before `malloc(a * b)`:

```c
if (a && b > SIZE_MAX / a) { errno = EOVERFLOW; return -1; }
```

- **Signed for error-and-value** (`int64_t` returning `-1`/`ENOMEM`), unsigned for bit patterns/indices — mix deliberately, never casually.
- **Enable and honor `-Wconversion`/`-Wsign-conversion`** — silent integer truncation is a class of real CVEs.
- **`bool` only for truth values**; use `_Bool`/`stdbool.h` rather than `int` 0/1 flags.
- **`enum` over `#define` constants** where the set is closed — compiler-checked names, though wrap switch statements to be exhaustive.

---

## 4. Error Handling

- **Pick one error contract and apply it everywhere** — resulting `0 == success`, pointer-with-`NULL`-on-error, or `errno`-style codes. Don't mix three styles in one file:

```c
typedef enum {
    USER_OK = 0,
    USER_EINVAL = -1,
    USER_ENOMEM = -2,
} user_rc;

user_rc user_init(user_t *u, const char *name);
```

- **Errors flow up, never down** — a function that can't succeed must not return a partially valid result; return the error.
- **Fail fast** — validate parameters and invariants at the top of the function before touching any state:

```c
int set_rate(rate_t *r, double v) {
    if (!r) return USER_EINVAL;
    if (!(v > 0.0)) return USER_EINVAL;
    r->value = v;
    return USER_OK;
}
```

- **Cleanup on error with a single exit** — `goto` cleanup labels (or early returns + RAII-less manual unwind); never leak on an early-failure branch.
- **`errno` is a process-global race** in multi-threaded code — prefer explicit error returns over global errno at thread boundaries.

---

## 5. Strings

- **There are no strings — only `char *` + length**; decide null-terminated vs `(buf, len)` per API and write it down:

```c
/* bounded copy: never strcpy/strcat/sprintf without size */
snprintf(dst, sizeof dst, "user=%s", name);
```

- **Prefer `snprintf`/`strlcpy`-style bounded operations**; never `strcpy`, `strcat`, `sprintf`, or `gets` — they are unbounded by design.
- **Validate `snprintf` return** — it reports how long the _full_ string would have been; truncation is an error when the buffer was too small.
- **Compare with `strncmp`/`memcmp` with explicit lengths**, or `strcmp` only for known-terminated both sides; never walk user input expecting termination.
- **Length from trusted sources only** — a length read from untrusted bytes may itself be hostile; bound everything.
- **`unsigned char` semantics when bytes matter** (UTF-8, binary) — `char` signedness is implementation-defined; use `uint8_t*` for byte buffers.

---
