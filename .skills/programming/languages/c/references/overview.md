# Overview

Focused reference for **c-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
