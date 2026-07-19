# Implementation notes

Focused reference for **c-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
