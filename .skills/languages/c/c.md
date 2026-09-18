---
name: c-best-practices
description: Best practices for writing C — the language conventions for C11/C17 systems and embedded code. Use when writing, structuring, or reviewing C — covers memory ownership, pointer discipline, error handling, strings, modularity, concurrency, and tooling.
---

# C Best Practices

C (C11/C17) is a small language with no safety net: manual memory management, no exceptions, no strings, no containers. Practical C leans on **explicit ownership, fail-fast error contracts, and discipline enforced by tooling** — sanitizers and analyzers are not optional extras, they are the code getting reviewed. Every function signature is a contract: parameters in, results out, errors up.

---

## 1. Memory Ownership & Lifetime

- **Name the owner and the lifetime for every allocation** — heap vs stack, borrowed vs owned, who frees:

```c
/* caller owns *out; callee documents it. */
int parse_user(const char *json, user_t **out);
```

- **Free in the same layer that allocates** (or transfer ownership explicitly at a named boundary); leak detection is easier when ownership doesn't zig-zag.
- **Prefer stack allocations** for small, short-lived values — `malloc` is not free.
- **Use `calloc` over `malloc` for structs you partially initialize** — zero-initialized fields prevent garbage-sensitivity bugs.
- **Free exactly once** — a `free` + later use is a use-after-free; track with ownership discipline, not hope.
- **`realloc` returns a new pointer** — always capture the return into a new variable, never `ptr = realloc(ptr, n)` straight away on the only copy.

---

## 2. Pointer & Array Discipline

- **Pointers point to one object or to an unbounded array — say which**:

```c
void fill_buf(uint8_t *dst, size_t n);   /* array of n */
void set_flag(uint32_t *v);               /* single object */
```

- **Every array/every pointer + size arrives as a pair** — an array without a length is a crash waiting to happen; `sized buffers or null-terminated, never assume`.
- **Prefer `const` on every pointer you don't write through** (`const char *s`) — it makes reader intent explicit and lets compilers optimize.
- **Check `NULL` for every allocation and every parameter that can legally be `NULL`**, then dereference.
- **Avoid pointer arithmetic gymnastics**; index with `ptrdiff_t`/`size_t`, not `int` (overflow, sign, and array index math).
- **`restrict` only when aliasing is provably excluded** — wrong use is a UB footgun, not an optimization hint.

---

## 3. Types, Qualifiers & Integers

- **Explicit-width integers** (`uint32_t`/`int64_t`/`size_t` from `<stdint.h>`) at every boundary and for anything serialized — plain `int` may be 16/32/64 bits across platforms:

```c
#include <stdint.h>
uint32_t crc32_tbl(size_t len, const uint8_t *data);
```

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

## 6. Functions & Modularity

- **One file = one responsibility; headers as pure interfaces**:

```c
/* user.h — declares only the contract, no implementation */
typedef struct user user_t;
user_rc  user_new(user_t **out, const char *name);
void     user_free(user_t *u);
```

- **Hide implementation with opaque types (`struct user;` in the header)** — callers can't reach in, and the layout can change without recompiling clients.
- **`static` everything not exported** — internal helpers that escape the translation unit become API debt.
- **Keep functions small and single-purpose** — one screen of code per function; extract the next-level detail into a named function.
- **Parameter order consistent** — (dest, src, len) or (out, in...); pick one convention per project and be consistent, so call sites read uniformly.
- **`inline`/`static inline` only in headers you control for hot small math**; otherwise let the compiler inline.

---

## 7. Structs & Data Design

- **Design structs by access pattern**, not as a bag of fields; group related state with clear names:

```c
typedef struct {
    uint8_t  *data;
    size_t    len;     /* bytes in use */
    size_t    cap;     /* capacity */
} bytes_t;

void bytes_init(bytes_t *b);
int  bytes_reserve(bytes_t *b, size_t want);
int  bytes_append(bytes_t *b, const void *p, size_t n);
void bytes_free(bytes_t *b);
```

- **Opaque handles for library boundaries** — callers operate on typed pointers, not raw field access.
- **Initialize structs completely** (`= {0}` / `memset`) before use; an initialized struct with seed defaults beats a half-set one.
- **Alignment and padding matter** — order fields largest-first when embedding for IO/serialization; `sizeof` is implementation-determined unless `_Alignas` used.
- **No flexible-array-member hacks for sizes you can bound with a length field + pointer** unless the layout is genuinely hot and fixed.

---

## 8. Concurrency & Threading

- **Default to no shared state** — communication over shared writable memory is the last resort, not the first:

```c
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_lock(&lock);
/* critical section: short, no I/O */
pthread_mutex_unlock(&lock);
```

- **Hold locks briefly, never across I/O or allocation** — long critical sections serialize the process and invite deadlock.
- **Order locks globally if you hold more than one**; document the order — a lock-order violation is the standard deadlock.
- **Prefer `C11 <stdatomic.h>` atomics** for single-word counters/flags; mutexes for compound state.
- **Threads created = threads joined** — every `pthread_create` has a documented `pthread_join`/detach path; threads that leak block shutdown.
- **`const` + immutable data is the cheapest thread-safety** — share only values that never mutate.

---

## 9. Build, Tooling & Portability

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
